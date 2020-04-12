import types from '../types';

//GET TYPE FROM TYPE.js
const typeProfile = types.summProfile;
const typeRanked = types.summProfileRanked;


//SET DEFAULT VALUE
const defaultState = {
  summonerData:{},
  rankedData:{}
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
    default:
      return state;
  }
}

export default reducer;
