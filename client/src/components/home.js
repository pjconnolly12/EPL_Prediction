import React, {useEffect, useState, useContext} from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import ForgotPassword from "./forgotpassword"
import ResetPassword from "./resetpassword"
import { AuthContext } from "../App"

const Home = () => {

	const [logOrSign, setLogorSign] = useState(true);
  const [signedUp, justSignedUp] = useState(false);
  const [forgot, updateForgot] = useState(false);

  const resetStatus = useContext(AuthContext)

	const handleButton = () => {
		logOrSign ? setLogorSign(false) : setLogorSign(true);
	};

    if (forgot) {
      return (
      <ForgotPassword forgot={forgot} updateForgot={updateForgot}/>
    )} else {
  	return (
        <div className="comp-Container">
          <h1>Welcome to EPL Predictions</h1>
          {logOrSign ? <Login updateForgot={updateForgot} /> : <Signup setLogorSign={setLogorSign} justSignedUp={justSignedUp}  />}
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
}

export default Home;