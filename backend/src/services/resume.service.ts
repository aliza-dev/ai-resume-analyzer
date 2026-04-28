import prisma from "../config/database";
import fs from "fs";
import path from "path";
import { extractTextFromFile } from "./analysis.service";

export class ResumeService {
  async upload(userId: string, file: Express.Multer.File) {
    const resume = await prisma.resume.create({
      data: {
        userId,
        fileUrl: file.path,
        fileName: file.originalname,
      },
      include: {
        analysis: true,
      },
    });

    // Persist extracted text immediately so analyze/preview work when the file path
    // points to ephemeral storage (e.g. Vercel `/tmp` — a different invocation often has no file).
    try {
      const extracted = await extractTextFromFile(file.path);
      if (extracted.trim()) {
        await prisma.resume.update({
          where: { id: resume.id },
          data: { storedResumeText: extracted.slice(0, 500_000) },
        });
        const refreshed = await prisma.resume.findFirst({
          where: { id: resume.id, userId },
          include: { analysis: true },
        });
        if (refreshed) return refreshed;
      }
    } catch (err) {
      console.error("[Resume upload] Text extraction failed (non-fatal):", err);
    }

    return resume;
  }

  async getHistory(userId: string) {
    const resumes = await prisma.resume.findMany({
      where: { userId },
      include: { analysis: true },
      orderBy: { createdAt: "desc" },
    });

    return resumes;
  }

  async getById(id: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id, userId },
      include: { analysis: true },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    return resume;
  }

  async delete(id: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id, userId },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    // Delete file from disk
    try {
      const filePath = path.resolve(resume.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch {
      // File might already be deleted
    }

    await prisma.resume.delete({
      where: { id },
    });

    return { message: "Resume deleted successfully" };
  }
}

export const resumeService = new ResumeService();
