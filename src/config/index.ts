import "dotenv/config";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const config = {
  app: {
    port: Number(process.env.PORT),
  },
  db: {
    host: "localhost",
    port: 5432,
    name: "",
  },
};

export default config;
