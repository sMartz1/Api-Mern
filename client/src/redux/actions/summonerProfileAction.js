import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';
const profileType = types.summProfile;
const profileRankedType = types.summProfileRanked;


const summonerProfileAction = () => async (dispatch, getState) =>{
	//Se recoge nombre
	let name = getState().inputHeaderReducer.inputHeader;
	//isLoading true
	dispatch(summonerLoading(false,"loaded"));
	dispatch(summonerLoading(true,"loading"));


	
	//GET SUMMONER PROFILE
	await RiotApiComponent.getName(name)
			.then(d=>{
				d.data.find(dfind=>{
					dispatch({
						type:profileType,
						payload:dfind
					})


			})

	}).catch(e=>console.log(e));
	let idSummoner = getState().summonerProfileReducer.summonerData.id;
	await RiotApiComponent.getRanked(idSummoner)
		.then(dRanked=>{
			dispatch({
				type:profileRankedType,
				payload:dRanked.data
			})
		}).catch(e=>console.log(e));

	await RiotApiComponent.getGame(idSummoner)
		.then(dGame=>{
			
				
		}).catch(
		e=>console.log("ERROR GAME MACHINE")
		);
	
	console.log("Valor State",getState());		
	dispatch(summonerLoading(true,"loaded"));
	dispatch(summonerLoading(false,"loading"));
		}

export default summonerProfileAction;

