import types from '../types';

//GET TYPE FROM TYPE.js
const typeProfile = types.summProfile;
const typeRanked = types.summProfileRanked;
const typeColor = types.colorPallete;


//SET DEFAULT VALUE
const defaultState = {
  summonerData:{},
  rankedData:{},
  colors:[]
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeProfile: {

      return {
        ...state,
        summonerData: action.payload
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
    default:
      return state;
  }
}

export default reducer;
