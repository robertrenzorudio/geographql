import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Get a specific state by id or by state_code, country_code pair."
    state(id: Int, locationCode: StateCountryCodeInput): State

    """
    Get a list of states by page number and size.
    Page is zero indexed.
    """
    states(page: Int!, size: Int!): [State!]!
  }

  input StateCountryCodeInput {
    state_code: String!
    country_code: String!
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
    The ISO Alpha-2 code designated to the
    country where the state is located.
    """
    country_code: String!

    """
    The id of the country where the
    the state is located.
    """
    country_id: Int!

    "The latitude of the state."
    latitude: Float

    "The longitude of the state."
    longitude: Float
  }
`;

export default typeDefs;
