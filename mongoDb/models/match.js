const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
	match:{
		type: Object,
		required: true
	},
	date:{
		type:Date,
		default:Date.now
	}
});



module.exports = mongoose.model('Match', matchSchema);
