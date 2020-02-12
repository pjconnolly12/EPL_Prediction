const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const picksSchema = new Schema({
	home: {type: String, required: true},
	homeScore: {type: Number},
	away: {type: String, required: true},
	awayScore: {type: Number},
	gameID: {type: Number, required: true},
	result: {type: String},
	points: {type: Number},
	teamName: {type: String, required: true},
	date: {type: Date, required: true},
	status: {type: String},
	realHomeScore: {type: Number},
	realAwayScore: {type: Number},
	homeLogo: {type: String},
	awayLogo: {type: String},
});

const Picks = mongoose.model('Picks', picksSchema);

module.exports = Picks;