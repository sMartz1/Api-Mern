import types from '../types';
const modalType = types.modal;

const defaultState = {
  modalData: {},
  isOpen:false
  
  
};

function reducer( state= defaultState,action){
	switch(action.type){
		case modalType:{
  			return {
  				modalData:action.payload.data,
  				isOpen:action.payload.isOpen  			}
		}
		default:{
			return state
		}
	}
}

export default reducer;