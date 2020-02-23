import React, { useState, useEffect} from 'react'
import axios from 'axios';

const Standings = () => {

	useEffect(() => {
		createTable()
	}, [])

	const createTable = async () => {
		let res = await axios.get('/picks/getTable/', {
			params: {
				status: 'FT'
			}
		})
		let userPicks = res.data
    	const groups = userPicks.reduce(function(total, obj) {
      		let key = obj["teamName"];
      		if (!total[key]) {
        		total[key] = [];
      		}
      		total[key].push(obj);
      		return total;
    	}, {});
    	const newArray = [];
    	for (const match in groups) {
      		let initialValue = 0;
      		let sum = groups[match].reduce(function(accumulator, currentValue) {
        		return accumulator + currentValue.points;
      		}, initialValue);
      	newArray.push({ team: match, points: sum });
    	}
    	newArray.sort(function(a, b) {
      		return b.points - a.points;
    	});
    	updateTable(newArray)
	}

	const [table, updateTable] = useState([])

	const mapTable = table.map((el, index) => {
		return (
			<tr className="standings-row" key={index}>
				<td>{el.team}</td>
				<td>{el.points}</td>
			</tr>
		)
	})

		return (
			<div className="standings">
				<h1>Standings</h1>
				<table>
					<thead>
					<tr className="headers">
						<th>Team Name</th>
						<th>Points</th>
					</tr>
					</thead>
					<tbody>
					{mapTable}
					</tbody>
				</table>
			</div>
		)
	}

export default Standings;