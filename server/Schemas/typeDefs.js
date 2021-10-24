const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        stockCount: Int
        savedStocks: [Stock]
    }
    type Stock {
        stockId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String   
    }
    type Query {
        me: User
    }
    type Auth {
        token: ID!
        user: User
    }
    input SavedStockInput {
        authors: [String]
        description: String
        stockId: String
        image: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveStock(stock: SavedStockInput!): User
        removeStock(stockId: String!): User
    }
`;

module.exports = typeDefs;
