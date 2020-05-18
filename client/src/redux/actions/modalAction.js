import types from '../types';

const modalType = types.modal;

const masteryAction = (data,modalState) => async(dispatch, getState) => {
	dispatch({
		type:modalType,
		payload:{
			data:data,
			isOpen:modalState
		}
	})
}

export default masteryAction;