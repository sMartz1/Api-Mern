import types from '../types';

//GET TYPE FROM TYPE.js
const allM = types.allMastery;

//SET DEFAULT VALUE
const defaultState = {
  allMastery: {}
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case allM: {

      return {
        allMastery: action.payload
      }

    }
    default:
      return state;
  }
}

export default reducer;