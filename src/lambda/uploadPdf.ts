import { UploadPdf } from "types";

export const handler: UploadPdf = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
    };
  } catch (e: unknown) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error' }),
    };
  }
}
