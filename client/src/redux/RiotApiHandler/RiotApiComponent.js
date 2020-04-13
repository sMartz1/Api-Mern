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
	}
}

export default RiotApiComponent;