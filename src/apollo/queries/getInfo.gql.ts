import gql from 'graphql-tag';

export const GET_INFO = gql`
  query {
    characters {
      results {
        id
        status
      }
    }
    locations {
      results {
        id
        name
      }
    }
    episodes {
      results {
        id
        name
      }
    }
  }
`;
