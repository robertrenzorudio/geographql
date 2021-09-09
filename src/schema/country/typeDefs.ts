import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    country(iso2: ID, iso3: ID, numeric_code: ID): Country
    countries(count: Int!): [Country!]!
  }

  type Country {
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

    "The latitude of the country."
    latitude: Float!

    "The longitude of the country."
    longitude: Float!

    "The emoji flag of the country."
    emoji: String!

    "The unicode of the country's emoji flag."
    emojiU: String!
  }
`;

export default typeDefs;
