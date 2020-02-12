const router = require('express').Router();
let Teams = require('../models/teams_model');
const auth = require('../middleware/auth');
let objectID = require('mongodb').ObjectID;

router.post('/add', (req, res) => {
	const { teamname } = req.body;
	const newTeam = new Teams({
		teamname
	});

	newTeam.save()
		.then(() => res.json('team added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getTeams', (req,res) => {
	Teams.find()
		.then(teams => res.json(teams))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;