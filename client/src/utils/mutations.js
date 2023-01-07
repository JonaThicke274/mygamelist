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

export const SAVE_BOOK = gql`
    mutation saveBook($input: saveBookInput!) {
        saveBook(input: $input) {
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

export const REMOVE_BOOK = gql`
    mutation removeBook($gameId: String!) {
        removeBook(gameId: $gameId) {
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