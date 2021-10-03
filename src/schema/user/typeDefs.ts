import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Get your profile."
    me: User @complexity(value: 1)
  }

  type Mutation {
    "End your session."
    logout: Boolean!

    "Refresh your api key."
    refreshAPIKey: String @complexity(value: 10)
  }

  type User {
    "User id."
    id: String!

    "Strategy used for authentication."
    strategy: String!

    "User Id from strategy."
    profile_id: String!

    "User email address."
    email: String!

    "Max GraphQL query points."
    max_points: Int!

    "User api key."
    api_key: String!
  }
`;

export default typeDefs;
