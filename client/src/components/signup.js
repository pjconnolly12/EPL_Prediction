import React, { useState } from "react";
import { Button, FormGroup, Form, Label, Input } from "reactstrap";
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && teamName.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/user/add', {email, password, teamName})
      .then((result) => {

        console.log(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="modal-Container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input className="loginInput" onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" name="email" />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input className="loginInput" onChange={e => setTeamName(e.target.value)} placeholder="Team Name" type="text" name="teamname" />
        </FormGroup>
        <br/>
        <FormGroup>
          <Input className="loginInput" onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />
        </FormGroup>
        <Button disabled={!validateForm()} type="submit" className="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default Signup;
