import React, { useEffect, useState } from 'react';
import { Route, Router} from "react-router-dom";
import history from './history';
import "./sass/main.scss";
import Dashboard from './components/dashboard';
import Home from './components/home';
import ResetPassword from './components/resetpassword';
import axios from 'axios'

export const AuthContext = React.createContext();

const reducer = (state, action) => {
	switch(action.type) {
		case "LOGIN":
			console.log(action.payload)
			localStorage.setItem("user", JSON.stringify(action.payload.user));
	      	localStorage.setItem("token", JSON.stringify(action.payload.token));
	      	localStorage.setItem("teamName", JSON.stringify(action.payload.teamName));
	    	return {
				...state,
				isAuthenticated: true,
				user: action.payload.data.user.email,
				teamName: action.payload.data.user.teamName,
				token: action.payload.data.token,
				reset: false,
	      	};
	    case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null
	      };
	   	case "RESET":
	   		return {
	   			...state,
	   			reset: true,
	   		}
	    default:
	      return state;
	}
}

function App() {

	const [games, updateFixtures] = useState()

	const api_key = `${process.env.REACT_APP_API_KEY}`

	useEffect(() => {
	axios({
	    "method":"GET",
	    "url":"https://api-football-v1.p.rapidapi.com/v2/fixtures/league/524",
	    "headers":{
	    "content-type":"application/octet-stream",
	    "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
	    "x-rapidapi-key": api_key
	    },
	    })
	    .then((response)=>{
	      console.log(response)
	      updateFixtures(response.data.api.fixtures)
	    })
	    .catch((error)=>{
	      console.log(error)
		})
	}, [])

	const initialState = {
  		isAuthenticated: false,
  		user: null,
  		token: null,
  		teamName: null,
  		reset: false,
  	}

  	const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
  	<AuthContext.Provider
  		value={{ state, dispatch }}>
  		<Router history={history}>
  			<Route path="/reset/:token" component={ResetPassword} />
		    <div className="App">
		      {!state.isAuthenticated ? <Home /> : <Dashboard games={games} />}
		    </div>
	    </Router>
	</AuthContext.Provider>
  );
}

export default App;
