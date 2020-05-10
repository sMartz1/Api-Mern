const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	gameId:{
		type:String,
		required:true
	},
	match:{
		type: Object,
		required: true
	},
	date:{
		type:Date,
		default:Date.now
	}
});



module.exports = mongoose.model('match', matchSchema);
