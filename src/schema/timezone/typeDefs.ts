import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Timezone {
    "The zone name."
    zone_name: String!

    "The Greenwich Mean Time offset in seconds"
    gmt_offset: Int!

    "Greenwich Mean Time offset name."
    gmt_offset_name: String!

    "The abbreviation of the timezone name."
    abbreviation: String!

    "The name of the timezone."
    timezone_name: String!

    "The id of the country under the timezone."
    country_id: Int!
  }
`;

export default typeDefs;
