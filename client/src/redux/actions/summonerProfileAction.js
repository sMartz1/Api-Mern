import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';
import gameAction from './gameAction';
const profileType = types.summProfile;
const profileRankedType = types.summProfileRanked;
const gameType = types.gameData;
const colorType = types.colorPallete;


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
					return true;



			})

	}).catch(e=>console.log(e));

	let idSummoner = getState().summonerProfileReducer.summonerData.id;
	let idProfile = getState().summonerProfileReducer.summonerData.profileIconId;

	await RiotApiComponent.getColors(idProfile)
		.then(colors=>{
			dispatch({
				type:colorType,
				payload:colors.data
			});
		}).catch(e=>console.log(e));


	await RiotApiComponent.getRanked(idSummoner)
		.then(dRanked=>{
			
			dispatch({
				type:profileRankedType,
				payload:dRanked.data
			})

		}).catch(e=>console.log(e));

	
	
	dispatch(gameAction(idSummoner));

		}



export default summonerProfileAction;

