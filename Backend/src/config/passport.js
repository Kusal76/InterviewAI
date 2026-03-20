const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user.model'); // Adjust this path to your actual User model!

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email'] // Requests email access from GitHub
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // 1. Check if this GitHub user already exists in your database
            let user = await User.findOne({ githubId: profile.id });

            if (!user) {
                // 2. If not, create a new user!
                // Note: Make sure your Mongoose User schema has 'githubId' and 'username' fields
                user = await User.create({
                    githubId: profile.id,
                    username: profile.username || profile.displayName,
                    email: profile.emails ? profile.emails[0].value : null,
                    // You can also save the accessToken here if you want to fetch their repos later!
                    githubAccessToken: accessToken
                });
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

// These tell Passport how to store the user in the session cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;