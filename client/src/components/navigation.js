import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { DashContext } from './dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SmallNav from './verticalNav';
import Welcome from './welcome';

const Navigation = () => {
  const navInfo = useContext(DashContext);
  const [isActive, setActive] = useState(navInfo.state.isActive)
  const userInfo = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [hamburger, hamburgerToggle] = useState(true)

  useEffect(() => {
    setActive(navInfo.state.isActive)
  }, [navInfo])

  const makeActive = e => {
    setActive(e.target.name);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT"
    })
  }

  const toggleMenu = () => {
    hamburger ? hamburgerToggle(false) : hamburgerToggle(true)
  }

  return (
    <div className="nav">
    <div className="menu-btn">
          {hamburger ? 
          <div className="btn">
            <FontAwesomeIcon onClick={toggleMenu} icon={faBars} />
          </div> : 
          <div className="btn">
            <FontAwesomeIcon onClick={toggleMenu} icon={faTimes} />
          </div>}
    </div>
    {hamburger ? <div></div> : <SmallNav hamburger={hamburger} hamburgerToggle={hamburgerToggle} />}
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