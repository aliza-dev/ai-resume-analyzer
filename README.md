<div align="center">

# 🧠 AI Resume Analyzer & Job Matcher

### *Your Personal AI Recruiter — Land Your Dream Job Faster*

<br/>

### 🚀 **[▶ View Live Demo](https://aliza-resume-analyzer.vercel.app/)**

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![Gemini](https://img.shields.io/badge/Gemini_AI-2.5-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aliza-resume-analyzer.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

![AI Resume Analyzer](./assets/landing-page.jpg)

<br/>

[Live Demo](https://aliza-resume-analyzer.vercel.app/) · [Get Started](#-getting-started) · [Features](#-core-features) · [Architecture](#-system-architecture)

</div>

---

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [The Problem & Solution](#-the-problem--solution)
- [App Showcase](#-app-showcase)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Let's Connect](#-lets-connect)

---

## 🚀 Live Demo

<div align="center">

**🚀 [View Live Demo Here](https://aliza-resume-analyzer.vercel.app/)**

Try the full app — upload a resume, get an AI-powered ATS score, generate cover letters, and explore career growth insights. No installation required.

| | URL |
| :--- | :--- |
| 🌐 **Frontend** | [aliza-resume-analyzer.vercel.app](https://aliza-resume-analyzer.vercel.app/) |
| ⚙️ **Backend API** | [ai-resume-backend-sable.vercel.app](https://ai-resume-backend-sable.vercel.app/) |

</div>

---

## 💡 The Problem & Solution

> **78% of resumes are rejected by ATS systems before a human ever reads them.**

Job seekers spend hours crafting resumes — only to be silently filtered out. They never know *why* they're rejected, which keywords are missing, or how to tailor their resume for each role. The feedback loop is completely broken.

**AI Resume Analyzer** fixes this. It's a full-stack SaaS platform that acts as your **personal AI recruiter**. Upload your resume once and instantly get a multi-dimensional ATS score, the exact keywords you're missing, AI-generated cover letters, mock interview questions with answer strategies, and a complete career growth roadmap. All powered by Google Gemini AI. No guesswork. No more rejections.

---

## 🖼 App Showcase

### 🏠 1. Landing Page & Value Proposition
<img src="./assets/landing-page.jpg" width="100%" />

### 💳 2. Seamless Monetization & Pricing
<img src="./assets/pricing.jpg" width="100%" />

### 🔐 3. Frictionless Authentication (Sign In & Register)
<p align="center">
  <img src="./assets/auth1.jpg" width="49%" alt="Sign In Page" />
  <img src="./assets/auth2.jpg" width="49%" alt="Create Account Page" />
</p>

### 📊 4. User Dashboard & History
<img src="./assets/dashboard.jpg" width="100%" />

### 🧠 5. Multi-Dimensional ATS Scoring
<img src="./assets/analysis.jpg" width="100%" />

### 🎯 6. Job Match & Skill Gap Analysis
<img src="./assets/job-match.jpg" width="100%" />

### ✍️ 7. AI Content Generator (Cover Letters & Bios)
<img src="./assets/content-generator.jpg" width="100%" />

### 🚀 8. Career Growth Hub & Projects
<img src="./assets/career-hub.jpg" width="100%" />

### 💬 9. Interactive AI Resume Assistant
<img src="./assets/ai-chat.jpg" width="100%" />

### 📋 10. AI-Generated Interview Preparation
<img src="./assets/interview-prep.jpg" width="100%" />

### 🎙️ 11. Live Mock Interview Simulator
<img src="./assets/mock-interview.jpg" width="100%" />

### 👤 12. User Profile & Preferences
<img src="./assets/profile.jpg" width="100%" />

---

## 🚀 Core Features

| Feature | Description |
| :------ | :---------- |
| **📊 Multi-Dimensional ATS Scoring** | Scored across Grammar, Impact & Action Verbs, Formatting, and Keyword Density — each with animated progress cards |
| **🧠 Dynamic Domain Classification** | Auto-detects Corporate vs. Academic CVs — academic CVs aren't penalized for length or publications |
| **🎯 Semantic Job Matching** | Paste a JD or URL — semantic matching catches synonyms (Azure = Microsoft Azure, Collaborated = Collaboration) |
| **✍️ AI Content Generation** | Cover letters, LinkedIn summaries, professional bios — with proper sign-off, no markdown artifacts, clean PDF export |
| **🎙️ Mock Interview Prep** | 12 personalized questions from your resume + JD-targeted interview predictor with ideal answer strategies |
| **🚀 Career Growth Hub** | AI career roadmaps (Current → Next Role) + complexity-aware project suggestions |
| **🔍 Resume Visualizations** | Skills word cloud, top technologies chart, highlighted resume preview with toggleable categories |
| **📄 PDF Reports** | Branded A4 exports with sanitized text, smart page breaks, and multi-page support |
| **🛡️ Google OAuth + JWT** | Frictionless sign-in with Google or email/password with stateless JWT architecture |
| **💳 Stripe Monetization** | Credit-based system with Stripe Elements, Hosted Checkout, PaymentIntents, and Webhooks |
| **🔄 PLG Onboarding** | Interactive landing page dropzone → fake scan → blurred teaser → signup conversion funnel |
| **⭐ In-App Feedback** | Floating 5-star feedback widget on every dashboard page |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
| :--------- | :------ | :------ |
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 8 | Build tool & dev server |
| TailwindCSS | 4 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| Recharts | 3 | Data visualization (charts) |
| Zustand | 5 | Lightweight state management |
| React Router | 7 | Client-side routing |
| @stripe/stripe-js | Latest | Stripe payment UI |
| @react-oauth/google | Latest | Google sign-in button |

### Backend & AI

| Technology | Version | Purpose |
| :--------- | :------ | :------ |
| Node.js | 22 | JavaScript runtime |
| Express | 4 | HTTP server framework |
| Prisma | 6 | ORM for MongoDB |
| MongoDB Atlas | — | Cloud database |
| Gemini 2.5 Flash | Latest | AI analysis & generation |
| Natural.js | 8 | NLP: TF-IDF, Porter Stemmer |
| Stripe | Latest | Payments & subscriptions |
| google-auth-library | Latest | OAuth token verification |
| Cheerio | Latest | Web scraping (job URLs) |
| jsPDF + autoTable | Latest | Server-quality PDF generation |

---

## 🏗 System Architecture

```mermaid
flowchart TB
    subgraph Client["Frontend - React + Vite"]
        UI["Pages & Components"]
        Store["Zustand Auth Store"]
        Axios["Axios Client"]
    end

    subgraph Server["Backend - Express.js"]
        Routes["API Routes"]
        MW["Middlewares"]
        Ctrl["Controllers"]
        Svc["Service Layer"]
    end

    subgraph AI["AI Layer"]
        Gemini["Gemini 2.5 Flash"]
        NLP["NLP Engine"]
        OCR["Gemini Vision OCR"]
    end

    subgraph DB["Data Layer"]
        Prisma["Prisma ORM"]
        Mongo[("MongoDB Atlas")]
    end

    subgraph Ext["External Services"]
        StripeAPI["Stripe API"]
        GoogleAPI["Google OAuth"]
    end

    UI --> Axios
    Axios -->|"REST + JWT"| Routes
    Routes --> MW
    MW -->|"Auth + Credits"| Ctrl
    Ctrl --> Svc
    Svc --> Gemini
    Svc --> NLP
    Svc --> OCR
    Svc --> Prisma
    Prisma --> Mongo
    Routes -.-> StripeAPI
    Store -.-> GoogleAPI
```

### Request Lifecycle

```
User clicks "Analyze Resume"
  → React component → Axios (JWT header attached)
  → Express Route → authenticate() middleware
  → requireCredits() middleware (checks aiCredits > 0)
  → Controller → Service → Gemini AI + NLP Engine
  → Response built → deductCredit() called
  → X-AI-Credits-Remaining header set
  → Frontend receives data + updates UI + shows toast
```

---

## 🗃 Database Schema

```mermaid
erDiagram
    USER ||--o{ RESUME : uploads
    RESUME ||--o| ANALYSIS : has

    USER {
        string id PK
        string name
        string email UK
        string password
        string role
        boolean isPro
        int aiCredits
        string stripeCustomerId
        datetime createdAt
    }

    RESUME {
        string id PK
        string userId FK
        string fileUrl
        string fileName
        int atsScore
        datetime createdAt
    }

    ANALYSIS {
        string id PK
        string resumeId FK
        int skillsScore
        int experienceScore
        int educationScore
        int projectsScore
        int jobMatchScore
        string_array keywords
        string_array missingKeywords
        string_array suggestions
    }

    FEEDBACK {
        string id PK
        string userId FK
        int rating
        string comment
        datetime createdAt
    }
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- [MongoDB Atlas](https://mongodb.com/atlas) account (free tier works)
- [Gemini API Key](https://ai.google.dev) from Google AI Studio
- [Stripe Account](https://stripe.com) (optional — for payments)

### 1. Clone the Repository

```bash
git clone https://github.com/aliza-dev/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Generate Prisma Client

```bash
cd ../backend
npx prisma generate
```

### 5. Start Development Servers

**Terminal 1 — Backend (port 5000):**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (port 3000):**

```bash
cd frontend
npm run dev
```

🎉 Open **http://localhost:3000** and start analyzing resumes!

---

## 🔐 Environment Variables

### Backend — `backend/.env`

```bash
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=mongodb+srv://your-user:your-pass@cluster.mongodb.net/ai_resume_analyzer

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com

# File Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# CORS
CORS_ORIGIN=http://localhost:3000

# AI
GEMINI_API_KEY=your-gemini-api-key

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_PRICE_ID=
FRONTEND_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=your-admin-email@gmail.com
```

### Frontend — `frontend/.env`

```bash
VITE_APP_NAME=AI Resume Analyzer
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

---

## 🗂 Folder Structure

```
ai-resume-analyzer/
├── frontend/                 # React 19 + TypeScript + Vite + TailwindCSS
│   ├── src/
│   │   ├── api/              # Axios client & API wrappers
│   │   ├── components/       # Reusable UI (charts, layout, gates)
│   │   ├── pages/            # 15+ pages (dashboard, auth, landing)
│   │   ├── hooks/            # Zustand auth store, theme
│   │   ├── utils/            # PDF generation, sanitization
│   │   └── routes/           # Protected routes & router config
│   └── index.html
│
├── backend/                  # Node.js + Express + Prisma + Gemini AI
│   ├── prisma/               # MongoDB schema (User, Resume, Analysis)
│   ├── src/
│   │   ├── controllers/      # Auth & Analysis endpoints
│   │   ├── services/         # AI engine (2500+ LOC), LLM prompts, NLP
│   │   ├── middlewares/      # JWT auth, credit gating, error handler
│   │   ├── routes/           # 20+ REST API routes
│   │   ├── validators/       # Zod request schemas
│   │   └── server.ts         # Express entry point
│   └── uploads/              # Resume file storage
│
├── assets/                   # README screenshots
└── README.md
```

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand full tree</strong></summary>

```
ai-resume-analyzer/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma              # User, Resume, Analysis, Feedback
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts            # Prisma client singleton
│   │   │   ├── env.ts                 # Environment variables
│   │   │   └── multer.ts              # File upload config
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts     # Login, Register, Google OAuth
│   │   │   └── analysis.controller.ts # 30+ AI analysis endpoints
│   │   ├── helpers/
│   │   │   ├── jwt.ts                 # Token generation & verification
│   │   │   ├── password.ts            # Bcrypt hashing
│   │   │   └── response.ts            # Standardized API responses
│   │   ├── middlewares/
│   │   │   ├── auth.ts                # JWT authentication guard
│   │   │   ├── credits.ts             # AI credit check & deduction
│   │   │   └── errorHandler.ts        # Global error + 429 handling
│   │   ├── routes/
│   │   │   ├── auth.routes.ts         # /api/auth/*
│   │   │   ├── analysis.routes.ts     # /api/analysis/* (20+ routes)
│   │   │   ├── stripe.routes.ts       # /api/stripe/* (checkout, webhook)
│   │   │   └── feedback.routes.ts     # /api/feedback
│   │   ├── services/
│   │   │   ├── analysis.service.ts    # Core engine (2500+ lines)
│   │   │   ├── auth.service.ts        # User authentication logic
│   │   │   ├── llm.service.ts         # Gemini AI prompts (750+ lines)
│   │   │   └── nlp.engine.ts          # TF-IDF, stemming, classification
│   │   ├── validators/                # Zod request schemas
│   │   └── server.ts                  # Express app entry point
│   └── uploads/                       # Resume file storage
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts              # Axios + interceptors (401/403/429)
│   │   │   ├── auth.ts                # Auth API calls
│   │   │   └── resume.ts              # 25+ analysis API methods
│   │   ├── components/
│   │   │   ├── layout/                # Sidebar, Navbar, DashboardLayout
│   │   │   ├── charts/                # AtsScore, SkillsRadar, JobMatchBar
│   │   │   ├── ui/                    # Button, Card, Badge, Skeleton
│   │   │   ├── ProGate.tsx            # Credit-based feature gating
│   │   │   ├── FeedbackModal.tsx      # Floating feedback widget
│   │   │   └── SocialAuthButtons.tsx  # Google OAuth button
│   │   ├── pages/
│   │   │   ├── Home.tsx               # Landing page (PLG dropzone)
│   │   │   ├── Pricing.tsx            # Free vs Pro plans
│   │   │   ├── Purchase.tsx           # 3-step Stripe checkout
│   │   │   ├── NotFound.tsx           # Custom 404
│   │   │   ├── auth/                  # Login, Register
│   │   │   └── dashboard/             # 15+ dashboard pages
│   │   ├── hooks/                     # useAuth (Zustand), useTheme
│   │   ├── data/                      # Sample resume mock data
│   │   ├── utils/                     # PDF gen, sanitization, constants
│   │   └── routes/                    # Router config + ProtectedRoute
│   └── index.html
│
├── assets/                            # README screenshots
│   ├── landing-page.jpg
│   ├── pricing.jpg
│   ├── auth.jpg
│   ├── dashboard.jpg
│   ├── analysis.jpg
│   ├── job-match.jpg
│   ├── career-hub.jpg
│   └── mock-interview.jpg
│
└── README.md
```

</details>

---

## 🤝 Contributing

Contributions are what make the open-source community such an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork** the project
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

> **Note:** Please ensure TypeScript compiles cleanly before submitting:
> ```bash
> cd frontend && npx tsc --noEmit
> cd ../backend && npx tsc --noEmit
> ```

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">

<br/>

### ⭐ If this project helped you land a job, give it a star on GitHub!

**Built with 💜 by Aliza Tariq**

<br/>

[Report Bug](https://github.com/aliza-dev/ai-resume-analyzer/issues) · [Request Feature](https://github.com/aliza-dev/ai-resume-analyzer/issues)

</div>

---

## 🤝 Let's Connect

<div align="center">

I'm always open to collaborations, freelance opportunities, and connecting with fellow developers!

| | Link |
| :--- | :--- |
| 💼 **LinkedIn** | [linkedin.com/in/aliza-tariq-dev](https://www.linkedin.com/in/aliza-tariq-dev/) |
| 🐙 **GitHub** | [github.com/aliza-dev](https://github.com/aliza-dev) |
| 📧 **Email** | [alizait1192@gmail.com](mailto:alizait1192@gmail.com) |

<br/>

> *"The best way to predict the future is to build it."*

<br/>

Made with ❤️ and ☕ — If you found this useful, a ⭐ on the repo means the world!

</div>
