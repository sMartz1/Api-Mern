const dtenv = require('dotenv').config();


const RequestUrl ={
	getByName:(name)=>{
		const urlByName = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+ process.env.API
				return urlByName

	},


}

module.exports = RequestUrl;