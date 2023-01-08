const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        gameCount: Int
        savedGames: [Game]
    }

    type Game {
        gameId: String
        name: String
        image: String
        description: String
        link: String
    }

    input saveGameInput {
        gameId: String!
        name: String!
        image: String
        description: String!
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        searchGame(title: String!): [Game]
    }

    type Mutation {
        login (email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveGame(input: saveGameInput): User
        removeGame(gameId: String!): User
    }
`;

module.exports = typeDefs