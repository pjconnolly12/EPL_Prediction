// Welcome.js

import React, { useContext } from 'react';
import { AuthContext } from '../App'
import { Link } from 'react-router-dom';
import { DashContext } from './dashboard';


const Welcome = (props) => {

  const userInfo = useContext(AuthContext);
  const { dispatchDash } = useContext(DashContext);

  const handleClick = () => {
      dispatchDash({
        type: "ACTIVE",
        payload: "picks"
    })
  }

	return (
    <div className="welcome-container">
      <div className="welcome">
      <h1>EPL Predictions</h1>
      	<h2>Welcome to the league {userInfo.state.teamName}</h2>
        <p>EPL Predictions is a site for you to test your skills guessing premier league scores</p>
        <p>Compete with others to prove your Premier League knowledge</p>
        <p>Get started now by clicking <Link
          to='./picks'
          onClick={handleClick}
          name="picks"
        ><strong>
          here
          </strong>
        </Link></p>
      </div>
    </div>
	)
}

export default Welcome;