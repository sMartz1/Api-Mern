import types from '../types';

//GET TYPE FROM TYPE.js
const allM = types.allMastery;
const topFourType = types.topMastery;

//SET DEFAULT VALUE
const defaultState = {
  allMastery: {},
  topFour:[]
  
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case allM: {

      return {
      	...state,
        allMastery: action.payload
      }

    }

    case topFourType: {

      return {
      	...state,
        topFour: action.payload
      }

    }
    default:
      return state;
  }
}

export default reducer;