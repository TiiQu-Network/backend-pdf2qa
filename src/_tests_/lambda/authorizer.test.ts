import { handler } from "../../lambda/authorizer";
import { ApiGatewayTokenAuthorizerEvent } from "serverless-plugin-test-helper";
import { generatePolicy } from "../../utils/policy";
import { generateToken, payload } from "../helpers/authToken";

const invalidToken = "thisIsAnInvalidToken";
const unknownToken = "unknownToken=a1234567890";
const testNextAuthSecret = "thisIsATestSecret";

describe("authorizer", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("returns Unauthorized if authorizationToken is empty", async () => {
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: "",
    });
    const unauthorized = generatePolicy(event, "Unauthorized");
    const response = await handler(event);
    expect(response).toEqual(unauthorized);
  });

  it("returns Unauthorized if authorizationToken is invalid", async () => {
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: invalidToken,
    });
    const unauthorized = generatePolicy(event, "Unauthorized");
    const response = await handler(event);
    expect(response).toEqual(unauthorized);
  });

  it("returns Unauthorized if sessionToken does no exist", async () => {
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: unknownToken,
    });
    const unauthorized = generatePolicy(event, "Unauthorized");
    const response = await handler(event);
    expect(response).toEqual(unauthorized);
  });

  it("returns Unauthorized if NEXT_AUTH_SECRET does no exist", async () => {
    const testToken = (await generateToken(testNextAuthSecret)) || "";
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: testToken,
    });
    const unauthorized = generatePolicy(event, "Unauthorized");
    const response = await handler(event);
    expect(response).toEqual(unauthorized);
  });

  it("returns Unauthorized if NEXT_AUTH_SECRET does not match", async () => {
    process.env.NEXT_AUTH_SECRET = "incorrectSecret";
    const testToken = (await generateToken(testNextAuthSecret)) || "";
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: testToken,
    });
    const unauthorized = generatePolicy(event, "Unauthorized");
    const response = await handler(event);
    expect(response).toEqual(unauthorized);
  });

  it("returns Allow if authorization is successful", async () => {
    process.env.NEXT_AUTH_SECRET = testNextAuthSecret;
    const testToken = (await generateToken(testNextAuthSecret)) || "";
    const event = new ApiGatewayTokenAuthorizerEvent({
      authorizationToken: testToken,
    });
    const allow = generatePolicy(event, "Allow", payload?.uuid);
    const response = await handler(event);
    expect(response).toEqual(allow);
  });
});
