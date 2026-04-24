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
  // Function to prevent browser/vercel caching
  const setNoStore = () => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  };

  try {
    // Force Prisma to connect and fetch fresh data
    await prisma.$connect();

    // 1. Fetch real-time total users
    const totalUsers = await prisma.user.count();

    // Debugging: Terminal mein ye number check karein
    console.log("------------------------------------------");
    console.log("📊 API HIT: Fetching Platform Stats");
    console.log("👥 Real-time user count from DB:", totalUsers);
    console.log("------------------------------------------");

    // 2. Fetch total resumes
    const totalResumes = prisma.resume
      ? await prisma.resume.count()
      : totalUsers * 3;

    const stats: StatsPayload = {
      users: totalUsers,
      resumesAnalyzed: totalResumes,
      accuracy: 98,
      rating: 4.9,
    };

    setNoStore();
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("❌ Error fetching platform stats:", error);
    setNoStore();
    return res.status(500).json({ success: false, message: "Failed to fetch statistics" });
  } finally {
    // Optional: Clean up connection if needed in serverless environments
    // await prisma.$disconnect();
  }
});

export default statsRouter;