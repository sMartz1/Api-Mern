const dtenv = require('dotenv').config();
const base = "https://euw1.api.riotgames.com/lol/"


const RequestUrl ={
	getByName:name=>{
		const urlByName = base + "summoner/v4/summoners/by-name/"+name+ process.env.API;
				return urlByName;
	},
	getRanked:id=>{
		const urlRanked = base +"league/v4/entries/by-summoner/"+id+ process.env.API;
		return urlRanked;
	},
	getGame:id=>{
		const urlGame = base + "spectator/v4/active-games/by-summoner/"+id+process.env.API;
		return urlGame;
	}


}

module.exports = RequestUrl;