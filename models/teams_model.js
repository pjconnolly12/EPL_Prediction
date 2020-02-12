const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
	teamname: {type: String}
}
);

const Teams = mongoose.model('Teams', teamSchema);

module.exports = Teams;