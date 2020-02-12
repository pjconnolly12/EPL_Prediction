import React, {useEffect, useState} from 'react';
import Login from "./login";
import Signup from "./signup";
import { AuthContext } from "../App"

const Home = () => {

	const [logOrSign, setLogorSign] = useState(true);
  const [signedUp, justSignedUp] = useState(false);

	const handleButton = () => {
		logOrSign ? setLogorSign(false) : setLogorSign(true);
	};

	return (
    <div className="comp-Container">
      <h1>Welcome to EPL Predictions</h1>
      {logOrSign ? <Login /> : <Signup setLogorSign={setLogorSign} justSignedUp={justSignedUp}  />}
      {signedUp ?
        <div> 
        <span>
        Thanks for signing up! Please sign in to begin!
        </span>
        </div>
        :
        <div>
        <span>
            {logOrSign ? `Don't have an account yet?`
              : `Already have an account?`}
        </span>
        <button className="logOrSign" onClick={handleButton}>
          {logOrSign ? `Signup` : `Login`}
        </button>
        </div>
      }
    </div>
	)
}

export default Home;