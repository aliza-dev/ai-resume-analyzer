import type { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { authService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth";
import { sendSuccess, sendError } from "../helpers/response";
import { env } from "../config/env";
import type { AuthenticatedRequest } from "../types";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await authService.register(data);
      sendSuccess(res, result, 201);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already registered") {
        sendError(res, error.message, 409);
        return;
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid email or password") {
        sendError(res, error.message, 401);
        return;
      }
      next(error);
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const user = await authService.getProfile(req.user.userId);
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential, profile } = req.body;
      if (!credential || typeof credential !== "string") {
        sendError(res, "Google credential token is required", 400);
        return;
      }

      let email: string | undefined;
      let name: string | undefined;
      let picture: string | undefined;

      // Try ID token verification first (One Tap flow)
      if (env.GOOGLE_CLIENT_ID && !profile) {
        try {
          const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
          const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: env.GOOGLE_CLIENT_ID,
          });
          const payload = ticket.getPayload();
          if (payload?.email) {
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
          }
        } catch {
          // ID token verification failed — fall through to profile-based flow
        }
      }

      // Fallback: use profile data from access token flow
      if (!email && profile && typeof profile === "object") {
        const p = profile as { email?: string; name?: string; picture?: string };
        email = p.email;
        name = p.name;
        picture = p.picture;
      }

      if (!email) {
        sendError(res, "Could not verify Google account. Please try again.", 401);
        return;
      }

      // Login or register via the auth service
      const result = await authService.googleAuth({
        email,
        name: name || email.split("@")[0],
        picture: picture || "",
      });

      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Token used too late")) {
        sendError(res, "Google token expired. Please try again.", 401);
        return;
      }
      next(error);
    }
  }
}

export const authController = new AuthController();
