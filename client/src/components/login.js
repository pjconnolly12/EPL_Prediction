import React, { useState, useContext } from "react";
import { Button, FormGroup, Form, Input } from "reactstrap";
import { AuthContext } from '../App'
import axios from 'axios'

const Login = (props) => {
  const { dispatch } = useContext(AuthContext);
  const resetStatus = useContext(AuthContext)
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

  function validateForm() {
    return data.email.length > 0 && data.password.length > 0;
  }

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
          errorMessage: error.response.data.msg || error.statusText
        });
      });
  };

  const handleForgot = () => {
    props.updateForgot(true)
  }

  let resetMessage;
  if (resetStatus.state.reset) {
    resetMessage = <span>You have succesfully reset your password, please login using your new password</span>
  } else {
    resetMessage = <div className="forgot">
        <span>Forget your password?</span>
        <button onClick={handleForgot}>Click Here!</button>
      </div>
  } 

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
        <Button disabled={data.isSubmitting || !validateForm()} className="submit">{data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}</Button>
      </Form>
      <div className="errorMsg">
        <p>{data.errorMessage}</p>
      </div>
        {resetMessage}
    </div>
  );
};

export default Login;
