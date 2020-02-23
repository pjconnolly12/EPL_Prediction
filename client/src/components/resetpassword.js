import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import history from '../history';
import axios from 'axios'

const ResetPassword = (props) => {

  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    updated: false,
    error: false,
  }

  const [data, updateData] = useState(initialState)

  useEffect(() => {
    reset()
  }, [])

  const reset = async () => {
    await axios.get('http://localhost:3000/reset/reset/', {
      params: {
        resetPasswordToken: props.match.params.token,
      },
    })
    .then(response => {
      console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        updateData({
          ...data,
          email: response.data.email,
          error: false,
          updated: false,
        });
      } else {
        updateData({
          ...data,
          error: true,
          updated: false, 
        })
      }
    })
    .catch(error => {
      console.log(error.response)
    })
  }

  const handleChange = (e) => {
    updateData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const updatePassword = (e) => {
    e.preventDefault();
    const password = data.password;
    axios.post('http://localhost:3000/updatepassword/updatePasswordViaEmail/', {password}, {
      params: {
        email: data.email
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.data.message === 'password updated'){
        updateData({
          ...data,
          updated: true,
          error: false,
        });
        dispatch({
            type: "RESET",
        })
        history.replace('http://localhost:3000/')
      } else {
        updateData({
          updated: false,
          error: true, 
        })
      }
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  if (data.error) {
    return (
      <div className="reset-container">
        <h4>Problem resetting password. Please send another reset link.</h4>
        <Link to='./' name="home">
          Go Home
        </Link>
      </div>
    )
  } else {
    return (
      <div className="reset-container">
        <div className="reset-form">
        <span> Please enter new password </span>
        <Form onSubmit={updatePassword}>
          <Input 
            type='password' 
            onChange={handleChange}
            name="password">
          </Input>
          <Button
            type="submit">
            Submit
          </Button>
        </Form>
        </div>
      </div>
    )
  }
}

export default ResetPassword;