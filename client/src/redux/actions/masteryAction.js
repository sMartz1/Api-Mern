import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';


const allMastery = types.allMastery;
const topFourType = types.topMastery;

const masteryAction = (summonerId) => async(dispatch, getState) => {

    await RiotApiComponent.getAllMastery(summonerId)
        .then(d => {
            dispatch({
                type: allMastery,
                payload: d.data
            })
            return d.data
        }).catch(e => console.log("Error en get all mastery",e));
    let masteryData = getState().masteryReducer.allMastery;
    let topFour = renderMastery(masteryData);

    
    let accountId = getState().summonerProfileReducer.summonerData.accountId;
    topFour.map(async champ =>{

    	await RiotApiComponent.getChampionMatches(accountId,champ.championId)
    		.then(matches=>{
    			console.log("MATCHES",matches.data)
    			champ.totalGames = matches.data.totalGames
    		})
	    })
    dispatch({
    	type:topFourType,
    	payload: topFour
    })
    // NECESARIO : Recoger 4 primeros campeones del reducer / hacer map en array y por cada uno sacar matchList
}





const renderMastery = mastery => {
    let temp = []
    for (let i = 0; i < mastery.length; i++) {
        console.log(mastery[i]);
        temp.push(mastery[i]);
        if (i > 2) {
            break;
        }
    }
    return temp;
}

export default masteryAction;