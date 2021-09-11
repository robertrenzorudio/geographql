import { gql } from 'graphql-tag';

const typeDefs = gql`
  input PaginationInput {
    page: Int!
    size: Int!
  }
`;

export default typeDefs;
