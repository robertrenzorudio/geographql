import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Get a specific state by id or by state_code and country_code pair."
    state(id: Int, locationCode: StateCountryCodeInput): State

    "Get a list of states by page number and size."
    states(filter: StateFilterInput, page: PaginationInput): [State!]!
  }

  type State {
    "The id of the state."
    id: Int!

    "The name of the state."
    name: String!

    """
    The code designated to the state.
    Code is unique within the country.
    """
    state_code: String!

    """
    The id of the country where the
    the state is located.
    """
    country_id: Int!

    """
    The ISO Alpha-2 code designated to the
    country where the state is located.
    """
    country_code: String!

    "Get a list of cities within the state."
    cities(page: PaginationInput): [City!]!

    "The latitude of the state."
    latitude: Float

    "The longitude of the state."
    longitude: Float
  }

  input StateCountryCodeInput {
    state_code: String!
    country_code: String!
  }

  input StateFilterInput {
    "Filter by country id"
    cid: Int

    "Filter by country code"
    ciso2: String
  }
`;

export default typeDefs;
