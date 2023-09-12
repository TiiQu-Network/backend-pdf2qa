import { FastifyError, FastifyInstance, RouteShorthandOptions } from "fastify";
import handler from "./ping.handler.js";

const options: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

function articleRoutes(
  fastify: FastifyInstance,
  _: RouteShorthandOptions,
  done: (err?: FastifyError) => void
) {
  fastify.get(`/ping`, options, handler.ping);
  done();
}

export default articleRoutes;
