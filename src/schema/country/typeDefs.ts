import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Get a specific country by id, iso2, iso3, or numeric_code."
    country(id: Int, iso2: ID, iso3: ID, numeric_code: ID): Country
      @complexity(value: 1)

    "Get a list of countries."
    countries(
      filter: CountryFilterInput
      page: PaginationInput
    ): CountryConnection!
      @complexity(value: 1, multipliers: ["page.first", "page.last"])
  }

  type Country {
    "The id of the country."
    id: Int!

    "The name of the country."
    name: String!

    """
    The two-letter code (ISO Alpha-2) designated to the country.
    Examples: US (for United States), and PH (for Philippines).
    """
    iso2: ID!

    """
    The three-letter code (ISO Alpha-2) designated to the country.
    Examples: USA (for United States), and PHL (for Philippines).
    """
    iso3: ID!

    """
    The three-digit code (ISO numeric) designated to the country.
    Examples: 236 (for United States), and 020 (for Andora).
    """
    numeric_code: ID!

    "The dialing code of the country."
    phone_code: String!

    """
    Get a list of states/provinces/regions within the country.
    """
    states(page: PaginationInput): StateConnection!
      @complexity(value: 1, multipliers: ["page.first", "page.last"])

    """
    Get a list of cities within the country.
    """
    cities(
      filter: CountryCitiesFilterInput
      page: PaginationInput
    ): CityConnection!
      @complexity(value: 1, multipliers: ["page.first", "page.last"])

    "The capital city of the country."
    capital: String!

    "The currency of the country."
    currency: String!

    "The currency symbol of the country."
    currency_symbol: String!

    "The top-level domain of the country."
    tld: String!

    "The native name of the country."
    native: String!

    "The region where the country is located."
    region: String!

    "The subregion where the country is located."
    subregion: String!

    "The timezones in the country."
    timezones: [Timezone!]!

    "The translation of the country's name in several languages."
    translations: JSONObject!

    "The latitude coordinate of the country."
    latitude: Float!

    "The longitude coordinate of the country."
    longitude: Float!

    "The emoji flag of the country."
    emoji: String!

    "The unicode of the country's emoji flag."
    emojiU: String!
  }

  enum Region {
    Africa
    Americas
    Antarctica
    Asia
    Europe
    Oceania
  }

  enum Subregion {
    Antarctica
    Australia_and_New_Zealand
    Caribbean
    Central_America
    Central_Asia
    Eastern_Africa
    Eastern_Asia
    Eastern_Europe
    Indian_Ocean
    Melanesia
    Micronesia
    Middle_Africa
    Northern_Africa
    Northern_America
    Northern_Europe
    Polynesia
    South_America
    South_Atlantic_Ocean
    South_Eastern_Asia
    Southern_Africa
    Southern_Europe
    Western_Africa
    Western_Asia
    Western_Europe
    Southern_Asia
  }

  type CountryEdge {
    "A cursor for use in the pagination."
    cursor: String!

    "The item at the end of the edge."
    node: Country!
  }

  type CountryConnection {
    totalCount: Int!
    edges: [CountryEdge!]!
    pageInfo: PageInfo!
  }

  input CountryFilterInput {
    "Filter by region."
    region: Region

    "Filter by subregion."
    subregion: Subregion
  }

  input CountryCitiesFilterInput {
    "Filter by state id."
    sid: Int

    "Filter by state code."
    siso: String
  }
`;

export default typeDefs;
