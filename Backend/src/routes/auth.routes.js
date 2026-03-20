const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);

// ─── GITHUB OAUTH ROUTES ──────────────────────────────────────────────────

/**
 * @route GET /api/auth/github
 * @description Start GitHub OAuth login process
 * @access Public
 */
authRouter.get('/github',
    passport.authenticate('github', { scope: ['user:email', 'repo'] })
);

/**
 * @route GET /api/auth/github/callback
 */
authRouter.get('/github/callback',
    passport.authenticate('github', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {

        // 1. Generate the JWT token
        const token = jwt.sign(
            { id: req.user._id, username: req.user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 2. Set the cookie (Fixing the secure issue for local dev)
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction, // False on localhost, True on Vercel/Render
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // This tells the code: "Use the live URL if it exists, otherwise use localhost"
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

        res.redirect(`${frontendUrl}/login?token=${token}`);
    }
);

module.exports = authRouter;