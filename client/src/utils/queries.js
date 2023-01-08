import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
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
// Insert query for searching games by calling API????
export const SEARCH_GAME = gql`
    query searchGame($title: String!) {
        searchGame(title: $title) {
            gameId
            name
            image
            description
            link
        }
    }
`;