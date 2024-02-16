import fastify from "fastify";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./websockets/poll-results";

const app = fastify();

app.register(cookie, {
  secret:
    "c49093f11ba48ed0c65a979d779063bbe76cf8b1b5c0947d4475a8649c9de023050763cfd085a2620f8098b30ab188d34041c7a477af608cd42b295e201671ac",
  hook: "onRequest",
  parseOptions: {},
});

app.register(cors);

app.register(websocket, {});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running!");
});
