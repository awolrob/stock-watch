import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedStocks {
        stockId: String
        coName: String
        type: String
        description: String
        startWatchDt: String
        url: String 
        logo: String  
        hq_address: String
        hq_state: String
        hq_country: String
        closePrices: [String]
      }
    }
  }
`;
