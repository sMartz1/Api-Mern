import types from '../types';

//GET TYPE FROM TYPE.js
const loading = types.summonerLoading;
const loaded = types.summLoaded;

//SET DEFAULT VALUE
const defaultState = {
  isLoading: false,
  loaded:false,
  

};

function reducer( state = defaultState, action ) {

  switch (action.type) {
  case loading: {

      return {
        ...state,
        isLoading: action.payload
      }

    }
   case loaded: {

      return {
        ...state,
        loaded: action.payload
      }

    }
  
    default:
      return state;
  }
}

export default reducer;