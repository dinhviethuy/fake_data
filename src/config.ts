import { config } from "dotenv";
import fs from "fs";
import { z } from "zod";

config({
  path: ".env",
});

if (!fs.existsSync(".env")) {
  console.log("Environment file not found");
  process.exit(1);
}

const configSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  URL_CV_FAKE: z.string().optional(),
  PASSWORD_DEFAULT: z.string().min(6).default("123456"),
  MIN_DATA: z.coerce.number().default(10),
  MAX_DATA: z.coerce.number().default(100),
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.log(configServer.error);
  process.exit(1);
}
const envConfig = configServer.data;

export default envConfig;
