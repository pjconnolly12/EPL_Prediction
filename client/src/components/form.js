import React, {useState, useLayoutEffect, useContext} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import { AuthContext } from '../App'


function Picks(props) {

  useLayoutEffect(() =>  {
    result()
  }, [])

  const result = async () => {
    let res = await axios.get('/picks/getUserPicks/', {
      params: {
        teamName: userInfo.state.teamName,
        status: "NS"
        }
      })
    updateResults(res.data)
  }

  const userInfo = useContext(AuthContext);

  const [results, updateResults] = useState([])


  const handleHomeChange = event => {
    event.persist();
    if (!isNaN(event.target.value)) {
      let index = results.findIndex(
        x => x.gameID === parseInt(event.target.name, 10)
      );
      let result;
      if (event.target.value > results[index].awayScore) {
        result = "Home";
      } else if (event.target.value === results[index].awayScore) {
        result = "Draw";
      } else {
        result = "Away";
      }
      let newResults = [...results];
      newResults[index] = {
        ...newResults[index],
        homeScore: event.target.value,
        result: result
      };
      updateResults(newResults);
    }
  };

  const handleAwayChange = event => {
    event.persist();
    if (!isNaN(event.target.value)) {
      let index = results.findIndex(
        x => x.gameID === parseInt(event.target.name, 10)
      );
      let result;
      if (event.target.value > results[index].homeScore) {
        result = "Away";
      } else if (event.target.value === results[index].homeScore) {
        result = "Draw";
      } else {
        result = "Home";
      }
      let newResults = [...results];
      newResults[index] = {
        ...newResults[index],
        awayScore: event.target.value,
        result: result
      };
      updateResults(newResults);
    }
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      results.map(game => {
        const id = game._id
        const {homeScore, awayScore, result} = game
        axios.post('picks/update', {homeScore, awayScore, id, result})
          .then((result) => {
            console.log(result.data)
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
    }
  };

  const gameList = results.map(game => {
      let day = game.date.slice(8, 10);
      let month = game.date.slice(5, 7);
      let year = game.date.slice(0, 4);
      const newDate = month + "/" + day + "/" + year;
        return (
      <FormGroup id="games" key={game.gameID}>
        <Label className="date">{newDate}</Label>
        <Label className="home">
          {game.home}
          <Input
            className="pickInput"
            onChange={handleHomeChange}
            value={game.homeScore}
            name={game.gameID}
            type="text"
          />
        </Label>
        <Label className="home">
          {game.away}
          <Input
            className="pickInput"
            onChange={handleAwayChange}
            value={game.awayScore}
            name={game.gameID}
            type="text"
          />
        </Label>
      </FormGroup>
    );
  });

  return (
    <Form className="picksForm" onSubmit={handleSubmit}>
    {gameList}
      <Button className="pickSubmit" type="submit">Submit</Button>
    </Form>
  );
};

export default Picks;