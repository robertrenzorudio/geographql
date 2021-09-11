import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Get a specific city by id."
    city(id: Int!): City

    """
    Get a list of cities.
    """
    cities(filter: CityFilterInput, page: PaginationInput): [City!]!
  }

  type City {
    "The id of the city."
    id: Int!

    "The name of the city."
    name: String!

    "The id of the state where the city is located."
    state_id: Int!

    """
    The code designated to the state where
    the city is located.
    """
    state_code: String!

    "The id of the country where the city is located."
    country_id: Int!

    """
    The ISO Alpha-2 code designated to the
    country where the city is located.
    """
    country_code: String!

    "The latitude coordinate of the city."
    latitude: Float!

    "The longitude coordinate of the city."
    longitude: Float!
  }

  input CityFilterInput {
    "Filter by country ISO Alpha-2 code."
    ciso2: ID!

    "Filter by state id withrin supplied csio2."
    sid: Int

    "Filter by state code within supplied csio2."
    siso: String
  }
`;

export default typeDefs;
