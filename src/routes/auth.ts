import express from 'express';
import passport from 'passport';
import passportGithub from 'passport-github2';

const GitHubStrategy = passportGithub.Strategy;

const authRouter = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auth/github/callback',
    },
    (
      accessToken: string,
      refreshToken: string | undefined,
      profile: any,
      done: any
    ) => {
      console.log({ accessToken, refreshToken, profile });
      return done(null, { hello: 1 });
    }
  )
);

authRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  () => {}
);

authRouter.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (_, res) => {
    return res.redirect('/');
  }
);

export { authRouter };
