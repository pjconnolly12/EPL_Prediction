import React, { useState, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Navigation from './navigation';
import Welcome from './welcome';
import Picks from './form';
import History from './history';
import Standings from './standings';
import { AuthContext } from '../App';
import axios from 'axios';

export const DashContext = React.createContext();

const reducer = (state, action) => {
	if (action.type === "ACTIVE") {
		console.log(action.payload)
		return {
			...state,
			isActive: action.payload
		}
	} else {
		return state;
	}	
}


function Dashboard() {

	const initialState = {
		isActive: "home"
	}

	const userInfo = useContext(AuthContext)

	const [state, dispatchDash ] = React.useReducer(reducer, initialState);

	useEffect(() => {
		compare()
	}, [])
	const compare = async () => {
		let res = await axios.get('/picks/getPicks/', {
			params: {
				teamName: userInfo.state.teamName
			}
		})
		let userPicks = res.data
    	userInfo.state.matches.map((match, index) => {
      	if (match.statusShort === "FT") {
        	var realResult;
        	let userIndex =  userPicks.map(item => {return item.gameID}).indexOf(match.fixture_id);
        	if (userIndex >= 0) {
        		if (userPicks[userIndex].status === 'NS') {
        			// get result from API game
	        		if (match.goalsAwayTeam > match.goalsHomeTeam) {
	          			realResult = "Away";
		        	} else if (match.goalsAwayTeam === match.goalsHomeTeam) {
		          		realResult = "Draw";
		        	} else {
		          		realResult = "Home";
		    		}
		    		// calculate points by comparing API matches to user picks
	          		let getPoints = 0;
	          		if (
	            		match.goalsHomeTeam ===
	              		parseInt(userPicks[userIndex].homeScore, 10) &&
	            		match.goalsAwayTeam ===
	              		parseInt(userPicks[userIndex].awayScore, 10)
	          		) {
	            		getPoints = 7;
	          		} else if (realResult === userPicks[userIndex].result) {
	            		getPoints = 3;
	          		}
	          		if (
	            		match.goalsHomeTeam ===
	              		parseInt(userPicks[userIndex].homeScore, 10) ||
	            		match.goalsAwayTeam ===
	              		parseInt(userPicks[userIndex].awayScore, 10)
	          		) {
	       				if (getPoints < 7){
	            			getPoints += 1;
	          			}}
	          	const points = getPoints
	          	const status = "FT"
	          	const {goalsHomeTeam, goalsAwayTeam} = match
	          	const id = userPicks[userIndex]._id
	          	console.log(points, status, goalsHomeTeam, goalsAwayTeam, id)
				axios.post('picks/update/results', {id, points, status, goalsHomeTeam, goalsAwayTeam })
					.then((result) => {
			            console.log(result.data)
	        		})
		        	.catch((error) => {
		            	console.log(error.response)
		        	})
	            }
	       }
      	} else {
        	let userIndex =  userPicks.map(item => {return item.gameID}).indexOf(match.fixture_id);
        	if (userIndex < 0) {
        		console.log(userPicks)
	        	const home = match.homeTeam.team_name
	        	const homeScore = null
	        	const away = match.awayTeam.team_name
	        	const awayScore = null
	        	const gameID = match.fixture_id
	        	const result = ""
	        	const points = null
	        	const teamName = userInfo.state.teamName
	        	const date = match.event_date
	        	const status = match.statusShort
	        	const realHomeScore = null
	        	const realAwayScore = null
	        	const homeLogo = match.homeTeam.logo
	        	const awayLogo = match.awayTeam.logo
          		axios.post('/picks/add/', { home, homeScore, away, awayScore, gameID, result, points, teamName, date, status, realHomeScore, realAwayScore, homeLogo, awayLogo })
          			.then((result) => {
            			console.log(result.data);
        			})
          			.catch((error) => {
            			console.log(error.response);
        			})
        		} else {
          		if (match.event_date.slice(0,10) !== userPicks[userIndex].date.slice(0,10)) {
          			console.log(match.event_date)
          			console.log(userPicks[userIndex].date)
			        const id = match._id
			        const date = match.event_date
			        axios.post('picks/update/date', {id, date})
			          .then((result) => {
			            console.log(result.data)
			          })
			          .catch((error) => {
			            console.log(error.response)
			          })
          		}
        	}
      	}
    });
    console.log(userPicks)
  };

	return (
		<DashContext.Provider value={{ state, dispatchDash }}>
			<Router>
				<div className="container">
					<Navigation />
					<Route exact path="/" component={Welcome} />
					<Route path="/picks" exact component={Picks} />
					<Route path="/history" exact component={History} />
					<Route path="/standings" exact component={Standings} />
				</div>
			</Router>
		</DashContext.Provider>
	)
}

export default Dashboard;