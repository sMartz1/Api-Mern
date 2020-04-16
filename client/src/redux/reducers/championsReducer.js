import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
//GET TYPE FROM TYPE.js
const typeChampion = types.champion;



//SET DEFAULT VALUE
const defaultState = {
  champions:{}
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeChampion: {
      
      return {
        champions:action.payload.data
      }

    }
    default:
      return state;
  }
}



export default reducer;