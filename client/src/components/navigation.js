import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App'

const Navigation = () => {
  const [isActive, setActive] = useState("home");
  const userInfo = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const makeActive = e => {
    setActive(e.target.name);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <div className="nav">
    <ul className="nav-list-left">
      <li>
        <Link
	        to='./'
	        onClick={makeActive}
	        className={isActive === "home" ? "active" : "notActive"}
	        name="home"
        >
          EPL Predictions
        </Link>
      </li>
      <li>
        <Link
	        to='./picks'
	        onClick={makeActive}
	        className={isActive === "picks" ? "active" : "notActive"}
	        name="picks"
        >
          Make Picks
        </Link>
      </li>
      <li>
        <Link
	    	to='./standings'
	      	onClick={makeActive}
	      	className={isActive === "standings" ? "active" : "notActive"}
	      	name="standings"
        >
          Standings
        </Link>
      </li>
      <li>
        <Link
	        to='./history'
	        onClick={makeActive}
	        className={isActive === "history" ? "active" : "notActive"}
	        name="history"
        >
          History
        </Link>
      </li>
      </ul>
      <ul className="nav-list-right">
      <li className="right">
        <a href="#">Welcome, {userInfo.state.teamName}</a>
      </li>
      <li className="logout">
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
    </div>
  );
};
export default Navigation;