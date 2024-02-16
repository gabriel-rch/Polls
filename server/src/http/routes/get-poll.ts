import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import z from "zod";
import { redis } from "../../lib/redis";
import { title } from "process";

export const getPoll = async (app: FastifyInstance) => {
  app.get(
    "/polls/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const getPollParams = z.object({
        id: z.string().uuid(),
      });

      const { id } = getPollParams.parse(request.params);

      const poll = await prisma.poll.findUnique({
        where: {
          id,
        },
        include: {
          options: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!poll) {
        return reply.status(400).send({ message: "Poll not found" });
      }

      const result = await redis.zrange(id, 0, -1, "WITHSCORES");

      const votes = result.reduce((obj, element, index) => {
        if (index % 2 == 0) obj[element] = parseInt(result[index + 1]);
        return obj;
      }, {} as Record<string, number>);

      console.log(votes);
      return reply.status(200).send({
        poll: {
          id: poll.id,
          title: poll.title,
          options: poll.options.map((pollOption) => {
            return {
              id: pollOption.id,
              title: pollOption.title,
              votes: pollOption.id in votes ? votes[pollOption.id] : 0,
            };
          }),
        },
      });
    }
  );
};
