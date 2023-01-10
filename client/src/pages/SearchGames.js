import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button,  } from 'react-bootstrap';

import Auth from '../utils/auth';
// import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import searchGame from '../utils/searchGameAPI';
import { SAVE_GAME } from '../utils/mutations';

const SearchGames = () => {
	// State for holding returned video game api data
	const [searchedGames , setsearchedGames] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	// const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

	const [saveGame] = useMutation(SAVE_GAME);

	// Method for seraching games and set state on form submit
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}

		try {
			const response = await searchGame(searchInput);

			if (!response.ok) {
				throw new Error ('Something went wrong!');
			}

			const { items }  = await response.json();

			const gameData = items

			console.log(gameData);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
		<Jumbotron fluid className='text-light bg-dark'>
			<Container>
				<h1>Search for Games!</h1>
			<Form onSubmit={handleFormSubmit}>
				<Form.Row>
				<Col xs={12} md={8}>
					<Form.Control
					name='searchInput'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					type='text'
					size='lg'
					placeholder='Search for a game'
					/>
				</Col>
				<Col xs={12} md={4}>
					<Button type='submit' variant='success' size='lg'>
					Submit Search
					</Button>
				</Col>
				</Form.Row>
			</Form>
			</Container>
		</Jumbotron>

		{/* <Container>
			<h2>
			{searchedGames.length
				? `Viewing ${searchedGames.length} results:`
				: 'Search for a game to begin'}
			</h2>
			<CardColumns>
			{searchedGames.map((game) => {
				return (
				<Card key={game.gameId} border='dark'>
					{game.image ? (
					<Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
					) : null}
					<Card.Body>
					<Card.Title>{game.title}</Card.Title>
					<p className='small'>Authors: {game.authors}</p>
					<Card.Text>{game.description}</Card.Text>
					{Auth.loggedIn() && (
						<Button
						disabled={savedBookIds?.some((savedBookId) => savedBookId === game.gameId)}
						className='btn-block btn-info'
						onClick={() => handleSaveBook(game.gameId)}>
						{savedBookIds?.some((savedBookId) => savedBookId === game.gameId)
							? 'This game has been saved!'
							: 'Save this Book!'}
						</Button>
					)}
					</Card.Body>
				</Card>
				);
			})}
			</CardColumns>
		</Container> */}
		</>
	);


};

export default SearchGames;
