import { GeneratePolicy } from "types";

export const generatePolicy: GeneratePolicy = (
  event,
  Effect,
  principalId = "",
) => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect,
          Resource: event.methodArn,
        },
      ],
    },
  };
};
