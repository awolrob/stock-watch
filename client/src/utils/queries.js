import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedStocks {
        title
        stockId
        authors
        description
        image
        link
      }
    }
  }
`;
