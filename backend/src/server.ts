import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { env } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Security middleware
app.use(helmet());

// CORS: support comma-separated origins (e.g. "https://prod.vercel.app,http://localhost:3000")
const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (server-to-server, curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

// Stripe webhook needs raw body (must be before express.json)
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }), (req, _res, next) => {
  (req as unknown as { rawBody: Buffer }).rawBody = req.body;
  next();
});

// Parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Static files (uploaded resumes)
// Use /tmp/uploads on Vercel, local UPLOAD_DIR in development
const uploadDir = process.env.VERCEL ? "/tmp/uploads" : path.resolve(env.UPLOAD_DIR);
app.use("/uploads", express.static(uploadDir));

// Health check — root route
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI Resume Analyzer API is running",
    version: "1.0.0",
    docs: "/api",
  });
});

// API Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// Start server only in non-serverless environments
// Vercel manages the server lifecycle itself via the exported app
if (!process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`
  ╔══════════════════════════════════════════════╗
  ║     AI Resume Analyzer - Backend API         ║
  ╠══════════════════════════════════════════════╣
  ║  Environment: ${env.NODE_ENV.padEnd(30)}║
  ║  Port:        ${String(env.PORT).padEnd(30)}║
  ║  API URL:     http://localhost:${String(env.PORT).padEnd(17)}║
  ╚══════════════════════════════════════════════╝
    `);
  });
}

export default app;
