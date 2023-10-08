import { handler } from "../../lambda/uploadPdf"
import { ApiGatewayEvent } from "serverless-plugin-test-helper";

describe("uploadPdf", () => {
  it("Should return 200 success", async () => {
    const event = new ApiGatewayEvent();
    const response = await handler(event);
    const { statusCode } = response;
    expect(statusCode).toEqual(200);
  });
});
