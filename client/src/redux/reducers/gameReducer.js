import types from '../types';

//GET TYPE FROM TYPE.js
const typeGame = types.gameData;



//SET DEFAULT VALUE
const defaultState = {
  gameData:{}
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeGame: {

      return {
        gameData: action.payload
      }

    }
    default:
      return state;
  }
}

export default reducer;
