const router = require('express').Router();
let Picks = require('../models/picks_model');
const auth = require('../middleware/auth');
let objectID = require('mongodb').ObjectID;

router.get('/getPicks/:teamName?', (req,res) => {
	Picks.find({teamName: req.query.teamName})
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getUserPicks/:teamName?/:status?', (req,res) => {
	Picks.find({teamName: req.query.teamName, status: req.query.status}).sort({'date': +1}).limit(10)
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getTable/:status?', (req,res) => {
	Picks.find({status: req.query.status})
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getHistory/:teamName?/:status?', (req,res) => {
	Picks.find({teamName: req.query.teamName, status: req.query.status})
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.get('/picks', (req,res) => {
	Picks.find()
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update', (req, res) => {
	const item = {
		homeScore: req.body.homeScore,
		awayScore: req.body.awayScore,
		result: req.body.result
	}
	let id = req.body.id
	Picks.updateOne({"_id": objectID(id)}, {$set: item })
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/results', (req, res) => {
	const item = {
		points: req.body.points,
		status: req.body.status,
    	realHomeScore: req.body.goalsHomeTeam,
    	realAwayScore: req.body.goalsAwayTeam
	}
	let id = req.body.id
	Picks.updateOne({"_id": objectID(id)}, {$set: item })
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.post('/update/date', (req, res) => {
	const item = {
		date: req.body.date
	}
	let id = req.body.id
	Picks.updateOne({"_id": objectID(id)}, {$set: item })
		.then(picks => res.json(picks))
		.catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add/', (req, res) => {
	const { home, homeScore, away, awayScore, gameID, result, points, teamName, date, status, realHomeScore, realAwayScore, homeLogo, awayLogo} = req.body;
	const newPicks = new Picks({
		home,
		homeScore,
		away,
		awayScore,
		gameID,
		result,
		points,
		teamName,
		date,
		status,
		realHomeScore,
		realAwayScore,
		homeLogo,
		awayLogo
	});

	newPicks.save()
		.then(() => res.json('picks added!'))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;