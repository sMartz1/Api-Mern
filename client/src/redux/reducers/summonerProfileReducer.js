import types from '../types';

//GET TYPE FROM TYPE.js
const typeProfile = types.summProfile;
const typeRanked = types.summProfileRanked;
const typeColor = types.colorPallete;
const matchType = types.matchRanked;


//SET DEFAULT VALUE
const defaultState = {
  summonerData:{},
  summonerFound:false,
  rankedData:{},
  colors:[],
  matchData:[]
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeProfile: {
      
      return {
        ...state,
        summonerData: action.payload.data,
        summonerFound:action.payload.isSummoner
      }

    }
    case typeRanked: {

      return {
        ...state,
        rankedData: action.payload
      }

    }
    case typeColor:{
      return{
        ...state,
        colors:action.payload
      }
    }
    case matchType:{
      return{
        ...state,
        matchData:action.payload
      }
    }
    default:
      return state;
  }
}

export default reducer;
