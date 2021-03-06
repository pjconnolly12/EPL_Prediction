import React, { useContext, useEffect } from 'react';
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


function Dashboard(props) {

	const initialState = {
		isActive: "home"
	}

	const userInfo = useContext(AuthContext)
	const fixtures = props.games

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
		console.log(userPicks)
    	fixtures.map((match, index) => {
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
	       // if game is currently happening remove it from picks
      	} else if (match.statusShort === '1H' || match.statusShort === '2H') {
      		let userIndex =  userPicks.map(item => {return item.gameID}).indexOf(match.fixture_id);
  			const id = userPicks[userIndex]._id
		    const status = match.statusShort
		    axios.post('picks/update/status', {id, status})
	          .then((result) => {
	          })
	          .catch((error) => {
	            console.log(error.response)
	          })
      	} else {
      		// check that NS game exists in user picks, if not, add the game to the teams picks
        	let userIndex =  userPicks.map(item => {return item.gameID}).indexOf(match.fixture_id);
        	if (userIndex < 0) {
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
        			// check that dates match, if not update to the API date
          		if (match.event_date.slice(0,10) !== userPicks[userIndex].date.slice(0,10)) {
          			console.log(match.event_date.slice(0,10), match.fixture_id)
          			console.log(userPicks[userIndex].date.slice(0,10), userPicks[userIndex].gameID)
			        const id = userPicks[userIndex]._id
			        const date = match.event_date
			        axios.post('picks/update/date', {id, date})
			          .then((result) => {
			          })
			          .catch((error) => {
			            console.log(error.response)
			          })
          		}
        	}
      	}
    });
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