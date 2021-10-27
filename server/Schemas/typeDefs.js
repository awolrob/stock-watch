const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        stockCount: Int
        savedStocks: [Stock]
    }
    type Stock {
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
        closePrices: [Prices2]
    }
    type Query {
        user: User
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedStockInput {
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
        closePrices: [Prices]
    }

    input Prices {
        date: String
        close: Float
    }

    type Prices2 {
        date: String
        close: Float
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveStock(stock: SavedStockInput!): User
        removeStock(stockId: String!): User
    }
`;

module.exports = typeDefs;
