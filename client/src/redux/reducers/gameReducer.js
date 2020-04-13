import types from '../types';

//GET TYPE FROM TYPE.js
const typeGame = types.gameData;



//SET DEFAULT VALUE
const defaultState = {
  gameData:{},
  isGame:false
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeGame: {

      return {
        gameData: action.payload.gameData,
        isGame:action.payload.isGame
      }

    }
    default:
      return state;
  }
}

export default reducer;
