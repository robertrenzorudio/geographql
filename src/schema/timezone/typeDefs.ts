import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Timezone {
    zone_name: String!
    gmt_offset: Int!
    gmt_offset_name: String!
    abbreviation: String!
    timezone_name: String!
    country_id: Int!
  }
`;

export default typeDefs;
