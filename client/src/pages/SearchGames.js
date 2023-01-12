import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_GAME } from '../utils/queries';
import { SAVE_GAME } from '../utils/mutations';

import '../index.css'

const SearchGames = () => {
	// State for holding returned video game api data
	// const [searchedGames , setsearchedGames] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

	// const [searchGame] = useQuery(SEARCH_GAME);
	const { loading, error, data, refetch } = useQuery(SEARCH_GAME, { variables: { title: searchInput } });
	const searchedGames = data?.searchGame || [];
	const [saveGame] = useMutation(SAVE_GAME);

	const handleSaveGame = async(gameId) => {
		const gameToSave = searchedGames.find((game) => game.gameId === gameId);

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await saveGame({
				variables: { input: {...gameToSave} }
			})

			console.log(data);

			setSavedGameIds([...savedGameIds, gameToSave.gameId]);
		} catch (err) {
			console.log(err);
		}
	}

	// if (loading) {
	// 	return (
	// 		<>
	// 		<Jumbotron fluid className='text-light bg-dark'>
	// 			<Container>
	// 				<h1>Search for Games!</h1>
	// 			<Form>
	// 				<Form.Row>
	// 				<Col xs={12} md={8}>
	// 					<Form.Control
	// 					name='searchInput'
	// 					value={searchInput}
	// 					onChange={(e) => setSearchInput(e.target.value)}
	// 					type='text'
	// 					size='lg'
	// 					placeholder='Search for a game'
	// 					/>
	// 				</Col>
	// 				<Col xs={12} md={4}>
	// 					<Button type='submit' variant='success' size='lg'>
	// 					Submit Search
	// 					</Button>
	// 				</Col>
	// 				</Form.Row>
	// 			</Form>
	// 			</Container>
	// 		</Jumbotron>
	
	// 		<Container>
	// 			<h2>Loading...</h2>
	// 		</Container>
	// 		</>
	// 	); 
	// }

	// if (error) {
	// 	console.log(`Error! ${error}`);

	// 	return (
	// 		<>
	// 		<Jumbotron fluid className='text-light bg-dark'>
	// 			<Container>
	// 				<h1>Search for Games!</h1>
	// 			<Form>
	// 				<Form.Row>
	// 				<Col xs={12} md={8}>
	// 					<Form.Control
	// 					name='searchInput'
	// 					value={searchInput}
	// 					onChange={(e) => setSearchInput(e.target.value)}
	// 					type='text'
	// 					size='lg'
	// 					placeholder='Search for a game'
	// 					/>
	// 				</Col>
	// 				<Col xs={12} md={4}>
	// 					<Button type='submit' variant='success' size='lg'>
	// 					Submit Search
	// 					</Button>
	// 				</Col>
	// 				</Form.Row>
	// 			</Form>
	// 			</Container>
	// 		</Jumbotron>
	
	// 		{/* <Container>
	// 			<h2>Error! Please refresh and try again! </h2>
	// 		</Container> */}
	// 		</>
	// 	); 
	// }

	console.log(data);
	console.log(searchedGames);	
	return (
		<>
		<div className="App">
      		<div className="container-fluid">
					<Jumbotron fluid className='text-light bg-transparent'>
						<Container>
							<h1></h1>
						<Form onSubmit={(e) => { e.preventDefault(); refetch({ searchInput }) }}>
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
								<Button type='submit' variant='warning' size='lg'>
								Submit Search
								</Button>
							</Col>
							</Form.Row>
						</Form>
						</Container>
					</Jumbotron>
			</div>
		</div>
		<Container className = "hiddenScroll" style = {{ overflow: 'auto', height: '60vh', width: '70vw',}}>
			<h1 className='text-light textColor'>
			{searchedGames.length
				? `Viewing ${searchedGames.length} results:`
				: 'Search for a game to begin!'}
			</h1>
			<CardColumns>
			{(searchedGames || []).map((game) => {
				return (
				<Card key={game.gameId} border='dark'>
					{game.image ? (
					<Card.Img href={`${game.link}`} src={game.image} alt={`The cover for ${game.name}`} variant='top' style = {{ objectFit: 'contain'}} />
					) : null}
					<Card.Body>
					<Card.Title>{game.name}</Card.Title>
					<Card.Text>{game.description}</Card.Text>
					{Auth.loggedIn() && (
						<Button
						disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
						className='btn-block btn-info'
						onClick={() => handleSaveGame(game.gameId)}>
						{savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
							? 'This game has been saved!'
							: 'Save this Game!'}
						</Button>
					)}
					</Card.Body>
				</Card>
				);
			})}
			</CardColumns>
		</Container>
		</>
	);


};

export default SearchGames;
