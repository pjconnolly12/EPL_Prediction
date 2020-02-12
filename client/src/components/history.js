import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../App'

const History = () => {

  	const userInfo = useContext(AuthContext);

	useEffect(() => {
		// Add User ID param
		axios.get('/picks/picks/', {
			params: {
				teamName: userInfo.state.teamName
			}
		})
			.then((result) => {
				console.log(result.data);
				updateGames(result.data)
			})
			.catch((error) => {
				console.log(error);
			})
	}, [])

	const [games, updateGames] = useState()

		return (
			<div>
				<h1>History</h1>
			</div>
		)
	}

export default History;