import jwt from "jsonwebtoken";

const sevenDays = 604800000;
export const payload = {
  uuid: "d4349f46-38b4-4a7f-9e59-9db958f6f091",
  name: "Iain Collins",
  email: "me@iaincollins.com",
  picture: "https://example.com/image.jpg",
};

export const generateToken = async (nextAuthSecret: string) => {
  try {
    const now = new Date().getTime();
    // example JWT from NextAuth: https://next-auth.js.org/configuration/options#jwt
    // NOTE: The 'uuid' prop was added by us
    const options = { expiresIn: now + sevenDays };
    const token = jwt.sign(payload, nextAuthSecret, options);
    return `sessionToken=${token}`;
  } catch (e) {
    console.error(e);
    return false;
  }
};
