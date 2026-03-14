# 🚀 InterviewAI — The Ultimate AI-Powered Interview Suite

![Live Deployment](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini_2.5_Flash-blue?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**InterviewAI** is a comprehensive full-stack career platform designed to bridge the gap between job seekers and their dream roles. By leveraging **Google Gemini 2.5 Flash**, the platform analyzes job descriptions against user profiles to generate deep preparation strategies, real-time match scores, and professionally tailored resumes.

---

## ✨ Core Features

### 🎯 1. Personalized Interview Strategy
- **Context-Aware Prep:** Generates tailored technical and behavioral questions by cross-referencing your profile with a specific job description.
- **Model Answers:** Provides AI-generated "Model Answers" and the "Intention" behind every question so you know exactly what recruiters are looking for.

### 📊 2. Adaptive Match Score & Skill Gap Analysis
- **Dynamic Fit Assessment:** Receive an instant match percentage for any role.
- **Gap Identification:** Automatically highlights missing skills or experience gaps, categorizing them by severity (Low, Medium, High).

### 📅 3. Adaptive Preparation Roadmap
- **Smart Scheduling:** Generates a 3-day, 5-day, or 7-day intensive day-by-day task list depending on your specific Match Score and required skill gaps.

### 📄 4. Fault-Tolerant Profile Handling & Tailored Resumes
- **Flexible Inputs:** Generate strategies using a PDF Resume, a quick text-based Self-Description, or both. Missing inputs are handled gracefully without server crashes.
- **Anti-Hallucination AI:** Strict prompt engineering ensures zero hallucination of fake contact info or placeholder names during PDF generation.
- **PDF Export:** Generates an ATS-friendly, professionally formatted A4 resume tailored specifically to the target job description.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Deployed via Vercel)
- **Framework:** React.js (Vite)
- **Styling:** SCSS (Modular) / Tailwind CSS
- **State Management:** React Hooks & Context API
- **Routing & Security:** React Router v6 with `ProtectedRoute` wrappers to prevent unauthorized access.

### Backend (Deployed via Render)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **AI Engine:** Google Gemini 2.5 Flash API
- **File Parsing & PDF Engine:** `pdf-parse` for text extraction and Puppeteer for headless cloud PDF generation.
- **Security:** JWT Authentication, Bcrypt password hashing, Cross-Origin `httpOnly` secure cookies, and strict CORS policies.

---

## ☁️ Cloud Deployment Notes
This application is fully optimized for production environments:
* **Secure Cross-Origin Authentication:** Implements `sameSite: 'none'` and `secure: true` cookie configurations, alongside a strict Vercel-to-Render CORS policy to allow seamless, secure authentication.
* **Resilient Data Handling:** Implements conditional parsing logic to extract strict text strings from PDF objects, preventing MongoDB `CastError` crashes.
* **Serverless PDF Rendering:** Custom `.puppeteerrc.cjs` caching and `--no-sandbox` launch arguments enable heavy DOM-to-PDF generation within strict Linux cloud environments.

---

## 🚦 Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Database:** MongoDB Atlas account (or local MongoDB)
- **AI Key:** Google AI Studio (Gemini) API Key

## 📂 Project Structure

```text
InterviewAI/
├── Backend/
│   ├── src/
│   │   ├── config/       # Database & AI configurations
│   │   ├── controllers/  # Main business & AI logic (Flexible input handling)
│   │   ├── models/       # Mongoose schemas (User, Report)
│   │   ├── routes/       # API endpoint definitions
│   │   ├── middlewares/  # Auth & Error handling
│   │   └── services/     # Third-party integrations (pdf-parse, Gemini)
│   ├── .env              # Backend secrets (ignored)
│   └── server.js         # Entry point (CORS Config)
├── Frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI (ProtectedRoutes)
│   │   ├── pages/        # Main view components (Landing, Home, Interview)
│   │   ├── hooks/        # Custom logic & API services
│   │   ├── style/        # SCSS (Global, Pages, Components)
│   │   └── context/      # Global state management
│   ├── .env              # Frontend URL config (ignored)
│   └── main.jsx          # Entry point (React Router Config)
└── README.md             # Documentation

---

## 🛡️ License & Copyright
- © 2026 Kusal Dey. All rights reserved.

- This project is built and maintained by Kusal Dey. All code and design assets are the intellectual property of the author. Redistribution or commercial use of this platform without explicit permission is strictly prohibited.
