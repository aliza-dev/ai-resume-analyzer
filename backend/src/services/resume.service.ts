import prisma from "../config/database";
import fs from "fs";
import path from "path";

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
