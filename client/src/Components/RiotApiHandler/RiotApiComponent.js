const axios = require('axios');

const RiotApiComponent = {

	getName: (name)=>{
		 return axios.get( '/summName?name=' + name )

	}
}

export default RiotApiComponent;