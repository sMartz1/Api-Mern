const mongoose = require('mongoose');

const summonerSchema = mongoose.Schema({
	accountId: {
		type: String,
		required: true
	},
	profileIconId:{
		type: Number,
		required: true
	},
	name:{
		type:String,
		required:true
	},
	id:{
		type: String,
		required: true
	},
	summonerLevel:{
		type: Number,
		required: true
	},
	revisionDate: {
		type: Number,
		required: true
		},
	puuid:{
		type:String,
		required:true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('SummonerProfile', summonerSchema);

