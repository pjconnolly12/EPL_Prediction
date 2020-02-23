import React, { useState } from "react";
import { Button, FormGroup, Form, Input } from "reactstrap";
import axios from 'axios';

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && teamName.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post('/user/add', {email, password, teamName})
      .then((result) => {
        const teamname = teamName
        axios.post('/teams/add', {teamname})
        .then((result) => {
          console.log(result.data)
        })
        .catch((error) => {
          console.log(error.response)
        })
        props.setLogorSign(true)
        props.justSignedUp(true)
        console.log(result.data)
      })
      .catch((error) => {
        console.log(error.response)
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
