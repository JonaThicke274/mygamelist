import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { removeGameId } from '../utils/localStorage';

import AuthService from '../utils/auth'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

const SavedGames = () => {
	const { loading, data } = useQuery(QUERY_ME, { pollInterval: 500});
	const [removeGame] = useMutation(REMOVE_GAME);

	const userData = data?.me || {};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!userData) {
		return <div>You must be logged in to view saved games!</div>
	}
	
	const handleDeleteGame = async ( gameId ) => {
		const token = AuthService.loggedIn() ? AuthService.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			console.log(gameId)
			// Remove game from user info
			const { data } = await removeGame({
				variables: { gameId } 
			});
			
			// Removes game from localstorage upon success of removal from user info
			console.log(data);
			removeGameId(gameId);

			return data
		} catch (err) {
			console.error(err);
		}	
	};

	console.log(userData);
	return (
		<>
		<Jumbotron fluid className='text-light bg-transparent'>
			<Container>
			<h1 className='text-light textColor'
				>Viewing saved games!</h1>
			</Container>
		</Jumbotron>
		<Container>
			<h1 className='text-light textColor'>
			{userData.savedGames.length
				? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
				: 'You have no saved games!'}
			</h1>
			<CardColumns>
			{userData.savedGames.map((game) => {
				return (
				<Card key={game.gameId} border='dark'>
					{game.image ? <Card.Img src={game.image} alt={`The cover for ${game.name}`} variant='top' /> : null}
					<Card.Body>
					<Card.Title>{game.title}</Card.Title>
					<Card.Text>{game.description}</Card.Text>
					<Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
						Delete this Game!
					</Button>
					</Card.Body>
				</Card>
				);
			})}
			</CardColumns>
		</Container>
		</>
	);
};

export default SavedGames;