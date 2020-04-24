import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';

const allMastery = types.allMastery;

const masteryAction = (summonerId) => async(dispatch, getState) => {

	await RiotApiComponent.getAllMastery(summonerId)
		.then(d=>{
			dispatch({
				type: allMastery,
				payload: d.data
			})
		}).catch(e=>console.log("Error en get all mastery"))
}

export default masteryAction;