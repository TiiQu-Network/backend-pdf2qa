import "dotenv/config";

const config = {
  app: {
    port: Number(process.env.PORT) || 8080,
    host: process.env.HOST || "localhost",
  },
  db: {
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
};

export default config;
