import { Resolvers } from '../../types/graphql';
import { AuthenticationError } from 'apollo-server-errors';
import { v4 as uuidv4 } from 'uuid';

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { req, db }) => {
      if (!req.session.userId) {
        throw new AuthenticationError(
          'You are not logged in. Please log in and try again.'
        );
      }
      const me = await db.user.findUnique({
        where: { id: req.session.userId },
      });
      return me;
    },
  },

  Mutation: {
    logout: (_, __, { req, res }) => {
      return new Promise((resolve) => {
        if (!req.session.userId) {
          throw new AuthenticationError('You are not logged in!');
        }
        req.session.destroy((err) => {
          res.clearCookie(process.env.SESSION_NAME!);
          if (err) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },

    refreshAPIKey: async (_, __, { req, db }) => {
      if (!req.session.userId) {
        throw new AuthenticationError(
          'You are not logged in. Please log in and try again.'
        );
      }

      const { api_key } = await db.user.update({
        where: { id: req.session.userId },
        data: {
          api_key: uuidv4(),
        },
      });
      return api_key;
    },
  },
};

export default resolvers;
