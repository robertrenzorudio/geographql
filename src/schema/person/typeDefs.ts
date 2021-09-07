import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    person(id: Int!): Person
    persons(count: Int!): [Person!]!
  }

  type Person {
    id: Int!
    name: String!
  }
`;

export default typeDefs;
