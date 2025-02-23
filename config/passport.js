import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exist
        const email = profile.emails[0].value;
        const userResult = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        let user;
        if (userResult.rows.length > 0) {
          user = userResult.rows[0];
        } else {
          const username = profile.displayName;
          const role = "customer";
          const result = await pool.query(
            "INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, "oauth", role]
          );
          user = result.rows[0];
        }
        done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
