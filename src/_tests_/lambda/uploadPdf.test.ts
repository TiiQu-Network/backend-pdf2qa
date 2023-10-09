import { handler } from "../../lambda/uploadPdf";
import { ApiGatewayEvent } from "serverless-plugin-test-helper";
import fs from 'fs';
import path from 'path';

describe("uploadPdf", () => {
  it("Should return 400 Invalid parameters if pdfFile property is missing", async () => {
    const event = new ApiGatewayEvent({ body: JSON.stringify({}) });
    const response = await handler(event);
    const { statusCode, body } = response;
    const resBody = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(resBody?.message).toEqual("Invalid parameters");
  });

  it("Should return 400 Invalid parameters if pdfFile is not binary data", async () => {
    const event = new ApiGatewayEvent({
      body: JSON.stringify({
        pdfFile: "",
      }),
    });
    const response = await handler(event);
    const { statusCode, body } = response;
    const resBody = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(resBody?.message).toEqual("Invalid parameters");
  });

  it("Should return 400 Invalid parameters if pdfFile binary is not a valid PDF", async () => {
    const validPngPath = '../assets/validPng.png' 
    const buffer = fs.readFileSync(path.resolve(__dirname, validPngPath));
    
    const event = new ApiGatewayEvent({
      body: JSON.stringify({
        pdfFile: buffer,
      }),
    });
    const response = await handler(event);
    const { statusCode, body } = response;
    const resBody = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(resBody?.message).toEqual("Invalid parameters");
  });
  
  
  it("Should return 400 Invalid parameters if pdfFile is encrypted", async () => {
    // prep
    const encryptedPdfPath = '../assets/encryptedPdf.pdf' 
    const buffer = fs.readFileSync(path.resolve(__dirname, encryptedPdfPath));
    const event = new ApiGatewayEvent({
      body: JSON.stringify({
        pdfFile: buffer,
      }),
    });

    // test
    const response = await handler(event);
    const { statusCode, body } = response;
    const resBody = JSON.parse(body);
    expect(statusCode).toEqual(400);
    expect(resBody?.message).toEqual("Invalid parameters");
  });
});
