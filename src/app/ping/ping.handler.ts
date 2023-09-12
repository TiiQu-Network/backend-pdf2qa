import { FastifyReply, FastifyRequest } from "fastify";

const ping = async (_: FastifyRequest, res: FastifyReply) => {
  try {
    res.status(200).send({ message: "pong" });
  } catch (err) {
    res.status(404).send({
      error: "An error occured",
      message: JSON.stringify(err),
    });
  }
};

export default { ping };
