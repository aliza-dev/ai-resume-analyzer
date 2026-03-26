import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "default-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
  STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "alizait1192@gmail.com",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
} as const;
