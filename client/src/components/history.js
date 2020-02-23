import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../App'

const History = () => {

  	const userInfo = useContext(AuthContext);

  	const [games, updateGames] = useState([])
  	const [teams, updateTeams] = useState([])
  	const [selectedTeam, changeSelection] = useState(userInfo.state.teamName)

	useEffect(() => {
		getData()		
	}, [selectedTeam])

	const getData = async () => {
		await axios.get('/picks/getHistory/', {
			params: {
				teamName: selectedTeam,
				status: 'FT'
			}
		})
			.then((result) => {
				console.log(result.data);
				updateGames(result.data)
			})
			.catch((error) => {
				console.log(error);
			})
		axios.get('teams/getTeams')
			.then((result) => {
				console.log(result.data);
				updateTeams(result.data)
			})
			.catch((error) => {
				console.log(error);
			})			
	}

	const handleTeamChange = (e) => {
		changeSelection(e.target.value)
	}

	const mapGames = games.map(match => {
      let day = match.date.slice(8, 10);
      let month = match.date.slice(5, 7);
      let year = match.date.slice(0, 4);
      const newDate = month + "/" + day + "/" + year;
		return (
			<tr className="row" key={match._id}>
				<td>{newDate}</td>
				<td>{match.home} vs {match.away}</td>
				<td>{match.homeScore} : {match.awayScore}</td>
				<td>{match.realHomeScore} : {match.realAwayScore}</td>
				<td>{match.points}</td>
			</tr>
		)}
	)

	const createTeamList = teams.map(team => {
    	return (
    		<option key={team._id}>{team.teamname}</option>
    	)
    })


		return (
			<div className="history">
				<h1>History</h1>
				<div className="teamSelect">
					<select onChange={handleTeamChange}>
						<option>Select a Team</option>
						{createTeamList}
					</select>
				</div>
				<table>
					<thead>
					<tr>
						<th>Date</th>
						<th>Fixture</th>
						<th>Prediction</th>
						<th>Score</th>
						<th>Points</th>
					</tr>
					</thead>
					<tbody>
					{mapGames}
					</tbody>
				</table>
			</div>
		)
	}

export default History;