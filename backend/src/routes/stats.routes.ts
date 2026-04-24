import { Router, type Request, type Response } from "express";
import prisma from "../config/database";

const statsRouter = Router();

type StatsPayload = {
  users: number;
  resumesAnalyzed: number;
  accuracy: number;
  rating: number;
};

statsRouter.get("/platform-stats", async (_req: Request, res: Response) => {
  const setNoCache = () => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  };

  try {
    const [users, resumesAnalyzed] = await Promise.all([
      prisma.user.count(),
      prisma.resume.count(),
    ]);

    const stats: StatsPayload = {
      users,
      resumesAnalyzed,
      accuracy: 98,
      rating: 4.9,
    };

    setNoCache();
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    setNoCache();
    return res.status(500).json({ success: false, message: "Failed to fetch statistics" });
  }
});

export default statsRouter;
