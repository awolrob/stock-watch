import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      savedStocks {
        stockId
        coName
        type
        description
        startWatchDt
        url
        logo
        hq_address
        hq_state
        hq_country
        closePrices 
      }
    }
  }
`;
