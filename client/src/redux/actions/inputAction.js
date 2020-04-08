import types from '../types';

const type = types.inputField;

const inputAction = (txt) => {

  return {
    type: type,
    payload: txt
  }

}

export default inputAction;
