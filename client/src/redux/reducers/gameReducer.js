import types from '../types';

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
        participantes:arrangeTeams(action.payload.gameData),
        isGame:action.payload.isGame
      }

    }
    default:
      return state;
  }
}

//Se separan jugadores por equipo en dos array
const arrangeTeams = data=>{
  let ordenado = {};
  let t1 = [];
  let t2 = [];
  data.participants.map(d=>{
     if(d.teamId === 100){
       t1.push(d);
     }else{
       t2.push(d);
     }
      return true;
  });

  ordenado = {
    t100:t1,
    t200:t2
  }
  return ordenado;
}

export default reducer;
