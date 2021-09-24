import { gql } from 'graphql-tag';

const typeDefs = gql`
  directive @complexity(
    # The complexity value for the field
    value: Int!

    # Optional multipliers
    multipliers: [String!]
  ) on FIELD_DEFINITION
`;

export default typeDefs;
