const dtenv = require('dotenv').config();
const base = "https://euw1.api.riotgames.com/lol/"

const queueTypes = id=>{
	switch(id){
		case "solo":{
			return 420;
		}

		case "flex":{
			return 440;
		}

		case "clash":{
			return 700;
		}

		default:{return 0};
	}
}
const RequestUrl ={
	getByName:name=>{
		const urlByName = base + "summoner/v4/summoners/by-name/"+name+ process.env.API;
		const final = encodeURI(urlByName);
				return final;
	},
	getRanked:id=>{
		const urlRanked = base +"league/v4/entries/by-summoner/"+id+ process.env.API;
		return urlRanked;
	},
	getGame:id=>{
		const urlGame = base + "spectator/v4/active-games/by-summoner/"+id+process.env.API;
		return urlGame;
	},
	getQueueMatchs:(id,qType)=>{
		const urlMatch = base + "match/v4/matchlists/by-account/"+id+process.env.API+"&queue="+queueTypes(qType)+"&endIndex=10";
		
		return urlMatch;
	},
	getMatchById:id=>{
		const urlMatchId = base + "match/v4/matches/" + id + process.env.API;
		return urlMatchId;
	},
	getAllMastery:id=>{
		const urlAllMastery = base + "champion-mastery/v4/champion-masteries/by-summoner/" + id+process.env.API;
		return urlAllMastery;
	},
	getMatchWithChampion:(id,champId)=>{
		const urlMatch = base + "match/v4/matchlists/by-account/"+id+process.env.API+"&champion="+champId;
		return urlMatch;
		
	}


}



module.exports = RequestUrl;