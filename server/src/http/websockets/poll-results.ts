import { SocketStream } from "@fastify/websocket";
import { FastifyInstance, FastifyRequest } from "fastify";
import z from "zod";
import { voting } from "../../interfaces/publisher-subscriber";

export const pollResults = async (app: FastifyInstance) => {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection: SocketStream, request: FastifyRequest) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollParams.parse(request.params);

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
};
