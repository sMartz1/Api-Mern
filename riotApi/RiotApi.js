const RequestUrl = require('./RequestUrl');

const axios = require('axios');



const RiotApi = {
	sByName: name=>{
		
		return axios.get(RequestUrl.getByName(name))
	}

}

module.exports =  RiotApi;