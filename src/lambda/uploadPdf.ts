import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { error } from "../utils/response";
import logger from "../utils/logger";
import { isBinary, isValidPdf } from "../utils/pdfValidation";

export interface UploadPdf {
  (event: APIGatewayEvent): Promise<APIGatewayProxyResult>;
}

export const handler: UploadPdf = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { pdfFile } = body;

  if (!pdfFile) return error(400);

  const isBinaryData = isBinary(pdfFile);
  if (!isBinaryData) return error(400);

  const isPdf = await isValidPdf(pdfFile);
  if (!isPdf) return error(400);

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (e: unknown) {
    logger.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    };
  }
};
