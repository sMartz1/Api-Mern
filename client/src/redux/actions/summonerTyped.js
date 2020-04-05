import types from '../types';

const type = types.summonerTyped;
const summonerTyped = (x) => {

  return {
    type: type,
    payload: x
  }

}

export default summonerTyped;
