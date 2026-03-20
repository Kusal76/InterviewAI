# 🚀 InterviewAI — The Ultimate AI-Powered Interview Suite

![Live Deployment](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![GitHub OAuth](https://img.shields.io/badge/Auth-GitHub_OAuth_2.0-181717?style=for-the-badge&logo=github&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini_2.5_Flash-blue?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**InterviewAI** is a comprehensive full-stack career platform designed to bridge the gap between job seekers and their dream roles. By leveraging **Google Gemini 2.5 Flash** and **Live GitHub Sync**, the platform analyzes job descriptions against a user's real-world coding activity to generate deep preparation strategies, real-time match scores, and professionally tailored resumes.

---

## ✨ Core Features

### 🔗 1. Live GitHub Profile Synchronization
- **Real-Time Tech Stack Analysis:** Securely connects to your GitHub profile via **OAuth 2.0** to analyze your most recently updated repositories.
- **Personalized Technical Questions:** Automatically identifies your dominant programming languages (e.g., Python, JavaScript, Java) and injects this context into the AI prompt to ensure technical questions reflect your actual coding experience.

### 🎯 2. Personalized Interview Strategy
- **Context-Aware Prep:** Generates tailored technical and behavioral questions by cross-referencing your profile and live GitHub data with a specific job description.
- **Model Answers:** Provides AI-generated "Model Answers" and the "Intention" behind every question so you know exactly what recruiters are looking for.

### 📊 3. Adaptive Match Score & Skill Gap Analysis
- **Dynamic Fit Assessment:** Receive an instant match percentage for any role.
- **Gap Identification:** Automatically highlights missing skills or experience gaps, categorizing them by severity (Low, Medium, High).

### 📅 4. Adaptive Preparation Roadmap
- **Smart Scheduling:** Generates a 3-day, 5-day, or 7-day intensive day-by-day task list depending on your specific Match Score and required skill gaps.

### 📄 5. Tailored Resumes & PDF Export
- **Anti-Hallucination AI:** Strict prompt engineering ensures zero hallucination of fake contact info or placeholder names during PDF generation.
- **Professional Formatting:** Generates an ATS-friendly, A4 resume tailored specifically to the target job description using Puppeteer.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Deployed via Vercel)
- **Framework:** React.js (Vite)
- **Authentication Handling:** Custom `useAuth` hook with **Axios Interceptors** to handle both standard JWT and OAuth-based sessions.
- **Security:** Implements URL-based token capture logic for seamless redirection from OAuth providers to the SPA dashboard.

### Backend (Deployed via Render)
- **Runtime:** Node.js / Express.js
- **Auth Engine:** **Passport.js** (GitHub Strategy) & JWT.
- **Database:** MongoDB Atlas (Mongoose)
- **AI Engine:** Google Gemini 2.5 Flash API.
- **External APIs:** **GitHub REST API** for repository language extraction.
- **PDF Engine:** Puppeteer for headless cloud PDF generation.

---

## ☁️ Cloud Deployment & Security Notes
This application is fully optimized for production environments:
* **Hybrid Authentication Flow:** Implements a dual-layer auth system. While standard login uses secure cookies, the GitHub OAuth flow utilizes a **Secure JWT-URL Redirect** mechanism to ensure tokens are safely captured by the React frontend on cross-origin redirects.
* **Intelligent Language Parsing:** The `github.service` filters repository data to extract primary languages, ensuring the AI context remains clean and relevant.
* **Production-Ready Cookies:** Implements environment-aware cookie settings (`secure: true`) and strict CORS policies to allow seamless, secure communication between Vercel and Render.

---

## 📂 Project Structure

```text
InterviewAI/
├── Backend/
│   ├── src/
│   │   ├── config/       # Passport.js & MongoDB configurations
│   │   ├── controllers/  # Auth & Interview logic (OAuth handling)
│   │   ├── models/       # Mongoose schemas (User, Report)
│   │   ├── routes/       # OAuth Callback & API endpoints
│   │   ├── middlewares/  # Auth & Error handling
│   │   └── services/     # GitHub Sync, Gemini AI, & Puppeteer
│   ├── .env              # Backend secrets (JWT, GitHub Client Secret)
│   └── server.js         # Entry point
├── Frontend/
│   ├── src/
│   │   ├── features/     # API services (Axios Interceptors)
│   │   ├── pages/        # Login (OAuth catch logic) & Dashboard
│   │   ├── context/      # Global Auth state management
│   │   ├── hooks/        # Custom logic (useAuth)
│   │   └── style/        # Modular SCSS & Tailwind
└── README.md

---

## 🛡️ License & Copyright
- © 2026 Kusal Dey. All rights reserved.

- This project is built and maintained by Kusal Dey. All code and design assets are the intellectual property of the author. Redistribution or commercial use of this platform without explicit permission is strictly prohibited.
