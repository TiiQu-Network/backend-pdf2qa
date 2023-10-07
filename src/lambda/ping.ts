import type {
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

export const handler: Handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "pong" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
