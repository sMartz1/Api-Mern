import types from '../types';

//GET TYPE FROM TYPE.js
const inputF = types.inputField;

//SET DEFAULT VALUE
const defaultState = {
  inputHeader: ''
};

function reducer( state = defaultState, action ) {

  switch (action.type) {

    case inputF: {

      return {
        inputHeader: action.payload
      }

    }
    default:
      return state;
  }
}

export default reducer;
