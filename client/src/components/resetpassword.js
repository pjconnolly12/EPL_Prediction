import React, { useState, useContext, useEffect } from "react";
import { Button, FormGroup, Form, Label, Input } from "reactstrap";
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import Home from './home';
import axios from 'axios'

const ResetPassword = (props) => {

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
    await axios.get('http://localhost:3000/reset', {
      params: {
        resetPasswordToken: props.match.params.token,
      },
    })
    .then(response => {
      console.log(response);
      if (response.data.message === 'password reset link  a-ok') {
        updateData({
          ...data,
          email: response.data.email,
          error: false,
          update: false,
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
      console.log(error.data)
    })
  }

  const handleChange = (e) => {
    updateData({
      [e.target.name]: e.target.value
    })
  }

  const updatePassword = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/updatePasswordViaEmail', {
      username: data.email,
      password: data.pasword,
    })
    .then(response => {
      console.log(response.data);
      if (response.data.message === 'password updated'){
        updateData({
          ...data,
          updated: true,
          error: false,
        });
      } else {
        updateData({
          updated: false,
          error: true, 
        })
      }
    })
    .catch(error => {
      console.log(error.data);
    })
  }

  if (data.error) {
    return (
      <div>
        <h4>Problem resetting password. Please send another reset link.</h4>
        <Link to='./' name="home">
          Go Home
        </Link>
      </div>
    )
  } else {
    return (
      <div>
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
    )
  }
}

export default ResetPassword;