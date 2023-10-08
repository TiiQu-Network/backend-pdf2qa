import { generatePolicy } from "../utils/policy";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Authorizer } from "types";

export const handler: Authorizer = async (event) => {
  try {
    // verfiy authorizationToken exists
    const authorizationToken = event?.authorizationToken;
    if (!authorizationToken || authorizationToken === "") {
      return generatePolicy(event, "Unauthorized");
    }

    // verfiy the next-auth sessionToken exists
    const sessionToken = authorizationToken.split("=");
    if (sessionToken.length < 2) return generatePolicy(event, "Unauthorized");

    const [key, value] = sessionToken;
    if (key !== "sessionToken") return generatePolicy(event, "Unauthorized");
    if (value === "") return generatePolicy(event, "Unauthorized");

    // verfiy next-auth sessionToken against NEXT_AUTH_SECRET
    const nextAuthSecret = process?.env?.NEXT_AUTH_SECRET || "";
    const jwtPayload = jwt.verify(value, nextAuthSecret) as JwtPayload;

    return generatePolicy(event, "Allow", jwtPayload?.uuid);
  } catch (e: unknown) {
    console.error(e);
    return generatePolicy(event, "Unauthorized");
  }
};
