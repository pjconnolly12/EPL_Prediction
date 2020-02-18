// Welcome.js

import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../App'

const Welcome = () => {

  const userInfo = useContext(AuthContext);

	return (
    <div className="welcome">
      <h1>Welcome to EPL Predictions</h1>
      <div>
      	<h2>Welcome {userInfo.state.teamName}</h2>
      	<p>Start making picks now by clicking here</p>
      	<p>You may also check your past results as well as where you stand in the table</p>
      </div>
    </div>
	)
}

export default Welcome;