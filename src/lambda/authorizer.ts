import { APIGatewayTokenAuthorizerEvent, AuthResponse } from "aws-lambda";
import { generatePolicy } from "../utils/policy";
import jwt from "jsonwebtoken";
export interface Authorizer {
  (event: APIGatewayTokenAuthorizerEvent): Promise<AuthResponse>;
}

export const handler: Authorizer = async (event) => {
  const arn = event.methodArn;
  try {
    // Replace with your Auth0 domain and API identifier.
    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
    const API_IDENTIFIER = process.env.API_IDENTIFIER;

    // Replace with your Auth0 API secret.
    const API_SECRET = process.env.API_SECRET;

    // verfiy authorizationToken exists
    const authorizationToken = event.authorizationToken;
    if (!authorizationToken || !API_SECRET) {
      return generatePolicy(event, "Unauthorized", arn);
    }

    // verify the token exists and has the right format
    const token = authorizationToken.split(" ");
    if (token.length < 2) return generatePolicy(event, "Deny", arn);

    const [, value] = token;
    if (value === "") return generatePolicy(event, "Unauthorized", arn);

    // verify token against API_SECRET
    const jwtPayload = jwt.verify(token[1], API_SECRET, {
      algorithms: ['HS256', 'HS384', 'HS512'],
      audience: API_IDENTIFIER,
      issuer: `https://${AUTH0_DOMAIN}/`
    });

    if (jwtPayload.sub) {
      return generatePolicy(event, "Allow", arn);
    }
    else {
        return generatePolicy(event, "Unauthorized", arn);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return generatePolicy(event, "Unauthorized", arn);
  }
};
