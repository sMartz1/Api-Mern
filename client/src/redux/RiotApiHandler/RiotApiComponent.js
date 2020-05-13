const axios = require('axios');

const RiotApiComponent = {

	getName: (name)=>{
		 return axios.get( '/summName?name=' + name )

	},
	getRanked:id=>{
		return axios.get('/rankedStats?id='+id);
	},
	getGame:id=>{
		return axios.get('/game?id='+id);
	},
	getChampions:()=>{
		return axios.get('http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion.json');
	},
	getColors:id=>{
		return axios.get('/colors?id='+id);
	},
	getMatch:(id,qType)=>{
		return axios.get('/matchList?id='+id+"&typeQ="+qType)
	},
	getAllMastery:id=>{
		return axios.get('/allM?id='+id)
	},
	getChampionMatches:(id,champion)=>{
		return axios.get('/championGames?id='+id+'&champion='+champion);
	},
	getGameData:gameId=>{
		return axios.get('/gameId?id='+gameId);
	}
}

export default RiotApiComponent;