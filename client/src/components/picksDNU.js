// import React, { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../App'


// const Picks = (callback) => {

//   const userInfo = useContext(AuthContext);

//   const [results, updateResults] = useState()


//   const handleHomeChange = event => {
//     event.persist();
//     if (!isNaN(event.target.value)) {
//       let index = results.findIndex(
//         x => x.GameID === parseInt(event.target.name, 10)
//       );
//       let result;
//       if (event.target.value > results[index].UserAwayScore) {
//         result = "Home";
//       } else if (event.target.value === results[index].UserAwayScore) {
//         result = "Draw";
//       } else {
//         result = "Away";
//       }
//       let newResults = [...results];
//       newResults[index] = {
//         ...newResults[index],
//         UserHomeScore: event.target.value,
//         UserResult: result
//       };
//       updateResults(newResults);
//     }
//   };

//   const handleAwayChange = event => {
//     event.persist();
//     if (!isNaN(event.target.value)) {
//       let index = results.findIndex(
//         x => x.GameID === parseInt(event.target.name, 10)
//       );
//       let result;
//       if (event.target.value > results[index].UserHomeScore) {
//         result = "Away";
//       } else if (event.target.value === results[index].UserHomeScore) {
//         result = "Draw";
//       } else {
//         result = "Home";
//       }
//       let newResults = [...results];
//       newResults[index] = {
//         ...newResults[index],
//         UserAwayScore: event.target.value,
//         UserResult: result
//       };
//       updateResults(newResults);
//     }
//   };

//   const handleSubmit = event => {
//     if (event) {
//       event.preventDefault();
//       results.map(item => {
//         const gameID = item.GameID
//         const userHomeScore = item.UserHomeScore
//         const userAwayScore = item.UserAwayScore
//         const result = item.UserResult
//         const teamName = userInfo.state.teamName
//         axios.post('/picks/add', { gameID, userHomeScore, userAwayScore, result, teamName })
//           .then((result) => {
//             console.log(result.data);
//         })
//           .catch((error) => {
//             console.log(error);
//         })
//       })
//     }
//     callback();
//   };

//   return {
//     handleSubmit,
//     handleHomeChange,
//     handleAwayChange,
//     results,
//     updateResults
//   };
// };

// export default Picks;