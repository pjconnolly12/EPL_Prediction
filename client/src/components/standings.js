import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../App'

const Standings = () => {

	const userInfo = useContext(AuthContext);

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

	const mapTable = table.map(el => {
		return (
			<tr>
				<td>el.team</td>
				<td>el.points</td>
			</tr>
		)
	})

		return (
			<div>
				<h1>Standings</h1>
				<table>
					<tbody>
					<tr>
						<th>Team Name</th>
						<th>Points</th>
					</tr>
					{mapTable}
					</tbody>
				</table>
			</div>
		)
	}

export default Standings;