import z from "zod";
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  DATABASE_URL: z.string().url(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_PUBLIC_URL: z.string().url(),
  BREEDER_DOMAIN: z.string().url().default("http://localhost:3000"),
  ADMIN_DOMAIN: z.string().url().default("http://localhost:3000"),
  PAYPAL_CLIENT_ID: z.string(),
  PAYPAL_SECRET: z.string(),
  PAYPAL_API_BASE: z.string().url().default("https://api-m.sandbox.paypal.com"),
  FIREBIRD_PATH: z
    .string()
    .default("/home/tushar/Work/AGN/server/src/hayloftdb/HAYLOFT.FDB"),
  JWT_SECRET: z.string().default("your_jwt_secret_key"),
});
function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    process.exit(1);
  }
  return result.data;
}

export const env = validateEnv();
