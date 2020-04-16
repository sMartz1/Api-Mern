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
	}
}

export default RiotApiComponent;