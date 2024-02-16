import { randomUUID } from "crypto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";
import { voting } from "../../interfaces/publisher-subscriber";

export const voteOnPoll = async (app: FastifyInstance) => {
  app.post(
    "/polls/:pollId/votes",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const voteOnPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const voteOnPollBody = z.object({
        pollOptionId: z.string().uuid(),
      });

      const { pollId } = voteOnPollParams.parse(request.params);
      const { pollOptionId } = voteOnPollBody.parse(request.body);

      let { sessionId } = request.cookies;

      if (sessionId) {
        const alreadyVotedOnPoll = await prisma.vote.findUnique({
          where: {
            sessionId_pollId: {
              sessionId,
              pollId,
            },
          },
        });

        if (alreadyVotedOnPoll) {
          if (alreadyVotedOnPoll.pollOptionId !== pollOptionId) {
            await prisma.vote.delete({
              where: {
                id: alreadyVotedOnPoll.id,
              },
            });
            await redis.zincrby(
              alreadyVotedOnPoll.pollId,
              -1,
              alreadyVotedOnPoll.pollOptionId
            );
          } else {
            return reply.status(400).send("You already voted on this poll");
          }
        }
      }

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/",
          maxAge: Number.MAX_VALUE,
          signed: true,
          httpOnly: true,
        });
      }

      await prisma.vote.create({
        data: {
          sessionId,
          pollOptionId,
          pollId,
        },
      });

      const votes = await redis.zincrby(pollId, 1, pollOptionId);

      voting.publish(pollId, {
        pollOptionId: pollOptionId,
        votes: Number(votes),
      });

      return reply.status(201).send({ sessionId });
    }
  );
};
