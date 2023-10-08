import { Ping } from "types";

export const handler: Ping = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "pong" }),
    };
  } catch (e: unknown) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
