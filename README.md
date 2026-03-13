# 🚀 InterviewAI — The Ultimate AI-Powered Interview Suite

**InterviewAI** is a comprehensive full-stack career platform designed to bridge the gap between job seekers and their dream roles. By leveraging **Google Gemini 2.5 Flash**, the platform analyzes job descriptions and resumes to generate deep preparation strategies, real-time match scores, and professionally tailored resumes.

---

## ✨ Core Features

### 🎯 1. Personalized Interview Strategy
- **Context-Aware Prep:** Generates tailored technical and behavioral questions by cross-referencing your resume with a specific job description.
- **Model Answers:** Provides AI-generated "Model Answers" and the "Intention" behind every question so you know exactly what recruiters are looking for.

### 📊 2. Match Score & Skill Gap Analysis
- **Fit Assessment:** Receive an instant match percentage (0-100%) for any role.
- **Gap Identification:** Automatically highlights missing skills or experience gaps, categorizing them by severity (Low, Medium, High).

### 📅 3. 7-Day Preparation Roadmap
- **Structured Plan:** A day-by-day task list to ensure you are fully prepared by the time you step into the interview.

### 📄 4. Tailored AI Resume Builder
- **PDF Export:** Generates an ATS-friendly, professionally formatted A4 resume using **Puppeteer**.
- **Role-Specific:** Automatically adjusts the content of your resume to highlight the most relevant skills for the target job.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** SCSS (Modular)
- **State Management:** React Hooks & Context API
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **AI Engine:** Google Gemini 2.5 Flash API
- **PDF Engine:** Puppeteer (Chromium)
- **Security:** JWT Authentication & Bcrypt password hashing

---

## 🚦 Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **Database:** MongoDB Atlas account
- **AI Key:** Google AI Studio (Gemini) API Key

---

## 📂 Project Structure

```
InterviewAI/
├── Backend/
│   ├── src/
│   │   ├── config/       # Database & AI configurations
│   │   ├── controllers/  # Main business & AI logic
│   │   ├── models/       # Mongoose schemas (User, Report)
│   │   ├── routes/       # API endpoint definitions
│   │   ├── middlewares/  # Auth & Error handling
│   │   └── services/     # Third-party integrations
│   ├── .env              # Backend secrets (ignored)
│   └── server.js         # Entry point
├── Frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main view components (Landing, Home, Interview)
│   │   ├── hooks/        # Custom logic & API services
│   │   ├── style/        # SCSS (Global, Pages, Components)
│   │   └── context/      # Global state management
│   ├── .env              # Frontend URL config (ignored)
│   └── main.jsx          # Entry point
└── README.md             # Documentation
```

---

## 🛡️ License & Copyright
- © 2026 Kusal Dey. All rights reserved.

- This project is built and maintained by Kusal Dey. All code and design assets are the intellectual property of the author. Redistribution or commercial use of this platform without explicit permission is strictly prohibited.
