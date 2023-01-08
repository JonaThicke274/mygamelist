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
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_GAME = gql`
    mutation saveGame($input: saveGameInput!) {
        saveGame(input: $input) {
            _id
            username
            gameCount
            savedGames {
                gameId
                name
                image
                description
                link
            }
        }
    }
`;

export const REMOVE_GAME = gql`
    mutation removeGame($gameId: String!) {
        removeGame(gameId: $gameId) {
            _id
            username
            gameCount
            savedGames {
                gameId
                name
                image
                description
                link
            }
        }
    }
`;