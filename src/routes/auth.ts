import express from 'express';
import passport from 'passport';
import { Strategy } from '@prisma/client';
import passportGithub from 'passport-github2';
import passportGoogle from 'passport-google-oauth20';
import { User } from '@prisma/client';
import prisma from '../prisma';
import { v4 as uuidv4 } from 'uuid';

const GitHubStrategy = passportGithub.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const authRouter = express.Router();

const findOrCreateUser = async (
  strategy: Strategy,
  profile_id: string,
  email: string
) => {
  const user = await prisma.user.upsert({
    where: {
      strategy_profile_id: {
        strategy,
        profile_id,
      },
    },
    update: {},
    create: {
      strategy,
      profile_id,
      email,
      request_left: 5000,
      api_key: uuidv4(),
    },
  });
  return user;
};

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auth/github/callback',
      scope: ['user:email'],
    },
    async (
      accessToken: string,
      refreshToken: string | undefined,
      profile: passportGithub.Profile,
      done: any
    ) => {
      try {
        const user = await findOrCreateUser(
          'GITHUB',
          profile.id,
          profile.emails![0].value
        );
        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        return done(null, undefined);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(
          'GOOGLE',
          profile.id,
          profile.emails![0].value
        );
        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        return done(null, undefined);
      }
    }
  )
);

authRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'], session: false })
);

authRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/error',
    session: false,
  }),
  (req, res) => {
    const {
      user: { profile_id, api_key },
    } = req.user as { user: User };
    req.session.userId = profile_id;
    res.json({ api_key });
  }
);

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email'], session: false })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error',
    session: false,
  }),
  (req, res) => {
    const {
      user: { profile_id, api_key },
    } = req.user as { user: User };
    req.session.userId = profile_id;
    res.json({ api_key });
  }
);

export { authRouter };
