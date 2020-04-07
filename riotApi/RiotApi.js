const RequestUrl = require('./RequestUrl');

const axios = require('axios');



const RiotApi = {
	sByName: name=>{
		
		return axios.get(RequestUrl.getByName(name))
	},
	getRanked: id=>{
		return axios.get(RequestUrl.getRanked(id))
	}


}

module.exports =  RiotApi;