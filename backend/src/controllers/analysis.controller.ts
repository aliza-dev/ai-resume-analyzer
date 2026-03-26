import type { Response, NextFunction } from "express";
import { analysisService } from "../services/analysis.service";
import { analyzeSchema, jobMatchSchema } from "../validators/analysis";
import { sendSuccess, sendError } from "../helpers/response";
import { deductCredit } from "../middlewares/credits";
import type { AuthenticatedRequest } from "../types";

/** Send result + deduct 1 AI credit, include remaining balance in response header */
async function sendWithCredit(res: Response, userId: string, data: unknown) {
  const remaining = await deductCredit(userId);
  res.setHeader("X-AI-Credits-Remaining", remaining);
  sendSuccess(res, data);
}

export class AnalysisController {
  async analyzeResume(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId } = analyzeSchema.parse(req.body);
      const analysis = await analysisService.analyzeResume(
        resumeId,
        req.user.userId
      );
      await sendWithCredit(res, req.user.userId, analysis);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async matchJob(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId, jobDescription } = jobMatchSchema.parse(req.body);
      const result = await analysisService.matchJob(
        resumeId,
        jobDescription,
        req.user.userId
      );
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async generateInterviewQuestions(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId } = analyzeSchema.parse(req.body);
      const questions = await analysisService.generateInterviewQuestions(
        resumeId,
        req.user.userId
      );
      await sendWithCredit(res, req.user.userId, questions);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async generateSmartFeedback(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId } = analyzeSchema.parse(req.body);
      const feedback = await analysisService.generateSmartFeedback(
        resumeId,
        req.user.userId
      );
      await sendWithCredit(res, req.user.userId, feedback);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async rewriteBulletPoint(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { text } = req.body;
      if (!text || typeof text !== "string" || text.trim().length < 5) {
        sendError(res, "Please provide text to rewrite (min 5 characters)", 400);
        return;
      }
      const result = await analysisService.rewriteBulletPoint(text.trim());
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) {
      next(error);
    }
  }

  async analyzeSections(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.analyzeSections(
        resumeId,
        req.user.userId
      );
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async generateContent(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { resumeId } = analyzeSchema.parse(req.body);
      const { jobDescription, type } = req.body;
      if (!jobDescription || !type) {
        sendError(res, "jobDescription and type are required", 400);
        return;
      }
      const result = await analysisService.generateContent(
        resumeId,
        req.user.userId,
        jobDescription,
        type
      );
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async getResumePreview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.getResumePreview(resumeId, req.user.userId);
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; }
      next(error);
    }
  }

  async getHiringProbability(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      sendSuccess(res, await analysisService.getHiringProbability(resumeId, req.user.userId));
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async getGlobalBenchmark(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      sendSuccess(res, await analysisService.getGlobalBenchmark(resumeId, req.user.userId));
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async getBadges(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      sendSuccess(res, await analysisService.getBadges(resumeId, req.user.userId));
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async detectIndustry(
    req: AuthenticatedRequest, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.detectIndustry(resumeId, req.user.userId);
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; }
      next(error);
    }
  }

  async analyzeReadability(
    req: AuthenticatedRequest, res: Response, next: NextFunction
  ) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.analyzeReadability(resumeId, req.user.userId);
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; }
      next(error);
    }
  }

  async getCareerGrowth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.getCareerGrowth(resumeId, req.user.userId);
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async suggestProjects(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId } = analyzeSchema.parse(req.body);
      const result = await analysisService.suggestProjects(resumeId, req.user.userId);
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async evaluateAnswer(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId, question, answer } = req.body;
      if (!resumeId || !question || !answer) { sendError(res, "resumeId, question, and answer required", 400); return; }
      const result = await analysisService.evaluateAnswer(resumeId, req.user.userId, question, answer);
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async chat(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId, question } = req.body;
      if (!resumeId || !question) { sendError(res, "resumeId and question required", 400); return; }
      const result = await analysisService.chat(resumeId, req.user.userId, question);
      await sendWithCredit(res, req.user.userId, result);
    } catch (error) { if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; } next(error); }
  }

  async compareResumes(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        sendError(res, "Unauthorized", 401);
        return;
      }
      const { oldResumeId, newResumeId } = req.body;
      if (!oldResumeId || !newResumeId) {
        sendError(res, "oldResumeId and newResumeId are required", 400);
        return;
      }
      const result = await analysisService.compareResumes(
        oldResumeId,
        newResumeId,
        req.user.userId
      );
      sendSuccess(res, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }
  async matchUrl(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }

      const { jobUrl, resumeId } = req.body;
      if (!jobUrl || typeof jobUrl !== "string" || !resumeId) {
        sendError(res, "jobUrl and resumeId are required", 400);
        return;
      }

      // Validate URL
      try { new URL(jobUrl); } catch {
        sendError(res, "Please provide a valid URL", 400);
        return;
      }

      // 1. Scrape the job page
      // @ts-expect-error dynamic import
      const axios = (await import("axios")).default;
      const cheerio = await import("cheerio");

      let jobText: string;
      try {
        const { data: html } = await axios.get(jobUrl, {
          timeout: 10000,
          headers: { "User-Agent": "Mozilla/5.0 (compatible; ResumeAI/1.0)" },
        });
        const $ = cheerio.load(html);
        // Remove non-content elements
        $("script, style, nav, header, footer, iframe, noscript, svg, img").remove();
        jobText = $("body").text().replace(/\s+/g, " ").trim();
      } catch {
        sendError(res, "Could not fetch the job URL. The page may be private or blocking scrapers. Try pasting the job description manually.", 400);
        return;
      }

      if (jobText.length < 50) {
        sendError(res, "Could not extract enough text from that URL. The page may require login. Try pasting the job description manually.", 400);
        return;
      }

      // 2. Get resume text
      const resumeText = await analysisService.getResumeText(resumeId, req.user.userId);

      // 3. LLM match
      const { llmMatchUrl } = await import("../services/llm.service");
      const result = await llmMatchUrl(resumeText, jobText.slice(0, 5000));

      if (!result) {
        sendError(res, "AI analysis failed. Please try again.", 500);
        return;
      }

      await sendWithCredit(res, req.user.userId, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") {
        sendError(res, error.message, 404);
        return;
      }
      next(error);
    }
  }

  async interviewPredictor(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) { sendError(res, "Unauthorized", 401); return; }
      const { resumeId, jobDescription } = req.body;
      if (!resumeId || !jobDescription) { sendError(res, "resumeId and jobDescription are required", 400); return; }

      const resumeText = await analysisService.getResumeText(resumeId, req.user.userId);

      const { llmInterviewPredictor } = await import("../services/llm.service");
      const result = await llmInterviewPredictor(resumeText, jobDescription);

      if (!result?.questions?.length) {
        sendError(res, "AI failed to generate questions. Please try again.", 500);
        return;
      }

      await sendWithCredit(res, req.user.userId, result);
    } catch (error) {
      if (error instanceof Error && error.message === "Resume not found") { sendError(res, error.message, 404); return; }
      next(error);
    }
  }
}

export const analysisController = new AnalysisController();
