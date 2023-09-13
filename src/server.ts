import config from "./config/index.js";
import Fastify, { FastifyInstance } from "fastify";
import logger from "./utils/logger.js";
import pingRoutes from "./app/ping/ping.routes.js";
import initSequelize from "./database/index.js";

const fastify: FastifyInstance = Fastify({});
fastify.register(pingRoutes);

const start = async () => {
  try {
    await initSequelize();
    await fastify.listen({ port: config.app.port, host: config.app.host });
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
