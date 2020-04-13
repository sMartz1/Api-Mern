import types from '../types';

const typeLoading = types.summonerLoading;
const typeLoaded = types.summLoaded;

const summonerLoading = (x,t) => {
switch (t){
	case"loaded":{
		 return {
   		type: typeLoaded,
  		payload: x
  }
	}
	case"loading":{
		 return {
         type: typeLoading,
         payload: x
  }
	}
    default:{
    	return true;
    }
}
 

}

export default summonerLoading;
