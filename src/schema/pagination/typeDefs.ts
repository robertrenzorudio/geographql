import { gql } from 'graphql-tag';

const typeDefs = gql`
  input PaginationInput {
    "Returns the first n elements."
    first: Int

    "Returns the elements that come after the specified cursor."
    after: String

    "Returns the last n elements."
    last: Int

    "Returns the elements that come before the specified cursor."
    before: String
  }

  type PageInfo {
    """
    Indicates whether more edges exist,
    when paginating forward.
    """
    hasNextPage: Boolean!

    "The cursor to continue when paginating forward."
    endCursor: String
    """
    Indicates whether more edges exist,
    when paginating backwards.
    """
    hasPreviousPage: Boolean!

    "The cursor to continue when paginating backward."
    startCursor: String
  }
`;

export default typeDefs;
