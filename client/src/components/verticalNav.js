import React from 'react';
import { Link } from 'react-router-dom';

const SmallNav = (props) => {

  const toggleMenu = () => {
    props.hamburger ? props.hamburgerToggle(false) : props.hamburgerToggle(true)
  }

  return (
    <div className="small-nav-list">
    <ul className="small-menu-list">
      <li>
        <Link
	        to='./'
	        onClick={toggleMenu}
	        name="home"
        >
          EPL Predictions
        </Link>
      </li>
      <li>
        <Link
	        to='./picks'
	        onClick={toggleMenu}
	        name="picks"
        >
          Make Picks
        </Link>
      </li>
      <li>
        <Link
	    	to='./standings'
	      	onClick={toggleMenu}
	      	name="standings"
        >
          Standings
        </Link>
      </li>
      <li>
        <Link
	        to='./history'
	        onClick={toggleMenu}
	        name="history"
        >
          History
        </Link>
      </li>
      </ul>
    </div>
  );
};
export default SmallNav;