const RequestUrl = require('./RequestUrl');

const axios = require('axios');



const RiotApi = {
	sByName: name=>{
		
		return axios.get(RequestUrl.getByName(name))
	},
	getRanked: id=>{
		return axios.get(RequestUrl.getRanked(id))
	},
	getGame: id =>{
		return axios.get(RequestUrl.getGame(id))
	},
	getMatchQueue:(id,queueType)=>{
		return axios.get(RequestUrl.getQueueMatchs(id,queueType))
	},
	getMatchId:id=>{
		return axios.get(RequestUrl.getMatchById(id))
	}


}

module.exports =  RiotApi;