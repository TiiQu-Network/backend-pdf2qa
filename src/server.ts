import config from "./config/index.js";
import Fastify, { FastifyInstance } from "fastify";
import logger from "./utils/logger.js";
import pingRoutes from "./app/ping/ping.routes.js";

const fastify: FastifyInstance = Fastify({});
fastify.register(pingRoutes);

const start = async () => {
  try {
    console.log(config);
    await fastify.listen({ port: config.app.port });
    logger.log({
      level: "info",
      message: `App listening on port ${config.app.port}`,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
