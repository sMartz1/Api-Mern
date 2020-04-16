import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';

const typeChamp = types.champion;
const championAction = ()=> async (dispatch, getState) =>{
	await RiotApiComponent.getChampions()
		.then(d=>{
			dispatch({
				type:typeChamp,
				payload:d.data
			})
		}).catch(e=>console.log(e));

}

export default championAction;