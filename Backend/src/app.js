const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport"); 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173', // For local development
        'https://interview-ai-lac-six.vercel.app' // YOUR EXACT VERCEL URL
    ],
    credentials: true, // Crucial for sending cookies (JWT)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'interview_ai_super_secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/* require all the routes here */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;