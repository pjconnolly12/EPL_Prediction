import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Home from './components/home';

export const AuthContext = React.createContext();

// useEffect(() => {
// 	// API Call = matches

// })

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  teamName: null,
  matches:[
  	{
	  	fixture_id: 239076,
	  	event_date: "2020-02-06T00:00:00+00:00",
	  	statusShort: "FT",
	  	goalsHomeTeam: 2,
	  	goalsAwayTeam: 1,
	  	homeTeam: {
	    	team_name: "Liverpool",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Crystal Palace",
	    	logo: ""
	  	}
  	},
  	 	{
	  	fixture_id: 239077,
	  	event_date: "2020-02-06T00:00:00+00:00",
	  	statusShort: "FT",
	  	goalsHomeTeam: 1,
	  	goalsAwayTeam: 1,
	  	homeTeam: {
	    	team_name: "Arsenal",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Burnley",
	    	logo: ""
	  	}
  	},
  	 	{
	  	fixture_id: 239078,
	  	event_date: "2020-02-06T00:00:00+00:00",
	  	statusShort: "FT",
	  	goalsHomeTeam: 0,
	  	goalsAwayTeam: 3,
	  	homeTeam: {
	    	team_name: "Norwich",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Tottenham",
	    	logo: ""
	  	}
  	},
  	 	{
	  	fixture_id: 239084,
	  	event_date: "2020-02-21T00:00:00+00:00",
	  	statusShort: "NS",
	  	goalsHomeTeam: null,
	  	goalsAwayTeam: null,
	  	homeTeam: {
	    	team_name: "Manchester City",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Sheffield United",
	    	logo: ""
	  	}
  	},
  	 {
	  	fixture_id: 239085,
	  	event_date: "2020-02-21T00:00:00+00:00",
	  	statusShort: "NS",
	  	goalsHomeTeam: null,
	  	goalsAwayTeam: null,
	  	homeTeam: {
	    	team_name: "West Ham",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Bouremouth",
	    	logo: ""
	  	}
  	},
  	{
	  	fixture_id: 239086,
	  	event_date: "2020-02-21T00:00:00+00:00",
	  	statusShort: "NS",
	  	goalsHomeTeam: null,
	  	goalsAwayTeam: null,
	  	homeTeam: {
	    	team_name: "Leicester",
	    	logo: ""
	  	},
	  	awayTeam: {
	    	team_name: "Brighton",
	    	logo: ""
	  	}
  	},
  ]
};
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
				token: action.payload.data.token
	      	};
	    case "LOGOUT":
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null
	      };
	    default:
	      return state;
	}
}

function App() {
  	const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
  	<AuthContext.Provider
  		value={{ state, dispatch }}>
	    <div className="App">
	      {!state.isAuthenticated ? <Home /> : <Dashboard />}
	    </div>
	</AuthContext.Provider>
  );
}

export default App;
