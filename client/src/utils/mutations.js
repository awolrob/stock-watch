import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_STOCK = gql `
mutation saveStock($stock: SavedStockInput!) {
    saveStock(stock: $stock) {
        username
        email
        stockCount
        savedStocks {
            stockId
            authors
            description
            image
            link
            title
        }
    }
}
`;


export const REMOVE_STOCK = gql `
  mutation removeStock($stockId: String!) {
      removeStock(stockId: $stockId) {
          username
          email
          stockCount
          savedStocks {
              stockId
              authors
              description
              image
              link
              title
          }
      }
  }
`;
