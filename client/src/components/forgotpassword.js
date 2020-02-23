import React, { useState } from "react";
import { Button, FormGroup, Form, Input } from "reactstrap";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = (props) => {

  const initialState = {
    email: "",
    errorMessage: "",
    successMessage: ""
  }

  const [data, updateData] = useState(initialState)

  const handleChange = (e) => {
    updateData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!data.email){
      updateData({
        ...data,
        errorMessage: "Please enter email"
      })
    } else {
      const email = data.email;
      axios.post('forgotpassword/forgot', {email})
        .then((response) => {
          console.log(response.data)
          if (response.data === 'email not in db') {
            updateData({
              ...data,
              errorMessage: "This email does not exist in our system"
            })
          } else if (response.data === 'recovery email sent') {
            console.log("success")
            updateData({
                ...data,
                errorMessage: "",
                successMessage: "Recovery email sent!"
              })
            props.updateForgot(false)
            // dispatch({
            //   type: "RESET"
            // })
            }
          }
        )
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  const handleClick = () => {
    props.updateForgot(false)
  }

  return (
    <div className="forgot-container">
      <Form onSubmit={handleFormSubmit}>
        <FontAwesomeIcon className="closeForgot" onClick={handleClick} icon={faTimes} />
        <span>Please enter your email address to recieve a reset link</span>
        <FormGroup>
          <Input value={data.email} onChange={handleChange} placeholder="Email" type="email" name="email" />
        </FormGroup>
        <br/>
        <Button className="submit" type="submit">Submit</Button>
      </Form>
      <div className={data.errorMessage ? "errorMsg" : "msgHide"}>
        <p>{data.errorMessage}</p>
      </div>
      <div className={data.successMessage ? "success" : "msgHide"}>
        <p>{data.successMessage}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;