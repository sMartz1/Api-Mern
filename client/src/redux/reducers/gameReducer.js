import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
//GET TYPE FROM TYPE.js
const typeGame = types.gameData;



//SET DEFAULT VALUE
const defaultState = {
  gameData:{},
  participantes:[],
  isGame:false
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case typeGame: {

      return {
        gameData: action.payload.gameData,
        participantes:action.payload.participantes,
        isGame:action.payload.isGame
      }

    }
    default:
      return state;
  }
}

//Se separan jugadores por equipo en dos array


export default reducer;
