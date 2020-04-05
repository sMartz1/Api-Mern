import types from '../types';

//GET TYPE FROM TYPE.js
const SUMMTYPE = types.summonerTyped;

//SET DEFAULT VALUE
const defaultState = {
  summonerTyped: false,
  summonerProfile:false,

};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case SUMMTYPE: {

      return {
        ...state,
        summonerTyped: action.payload
      }

    }
    default:
      return state;
  }
}

export default reducer;