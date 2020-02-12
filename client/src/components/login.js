import React, { useState, useContext } from "react";
import { Button, FormGroup, Form, Label, Input } from "reactstrap";
import { AuthContext } from '../App'
import axios from 'axios'

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    axios.post("./auth/", {
      email: data.email,
      password: data.password
    })
      .then(res => {
        dispatch({
            type: "LOGIN",
            payload: res
        })
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  return (
    <div className="modal-Container">
      <Form onSubmit={handleFormSubmit}>
        <FormGroup>
          <Input className="loginInput" value={data.email} onChange={handleInputChange} placeholder="Email" type="email" name="email" />
        </FormGroup>
        <br />
        <FormGroup>
          <Input className="loginInput" value={data.password} onChange={handleInputChange} placeholder="Password" type="password" name="password" />
        </FormGroup>
        <Button disabled={data.isSubmitting} className="submit">{data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}</Button>
      </Form>
      <div className="forgot">
        <span>Forget your password?</span>
        <button>Click Here!</button>
      </div>
    </div>
  );
};

export default Login;
