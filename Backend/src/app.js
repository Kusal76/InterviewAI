const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// 🔥 THE FIX: Update your CORS configuration
app.use(cors({
    origin: [
        'http://localhost:5173', // For local development
        'https://interview-ai-lac-six.vercel.app' // YOUR EXACT VERCEL URL (No trailing slash!)
    ],
    credentials: true, // Crucial for sending cookies (JWT)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly allow these headers
}));

/* require all the routes here */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;