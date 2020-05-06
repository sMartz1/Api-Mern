import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';

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
    let accountId = getState().summonerProfileReducer.summonerData.accountId;
    let topFour = await renderMastery(masteryData,accountId);

    

    console.log("Se manda top4",topFour)
    
    dispatch({
    	type:topFourType,
    	payload: topFour
    })

    // NECESARIO : Recoger 4 primeros campeones del reducer / hacer map en array y por cada uno sacar matchList
}






const renderMastery = async (mastery,id) => {
    let temp = []
    for (let i = 0; i < mastery.length; i++) {
        console.log(mastery[i]);
        await RiotApiComponent.getChampionMatches(id,mastery[i].championId)
            .then(matches=>{
                 temp.push({
                    championId:mastery[i].championId,
                    championPoints:mastery[i].championPoints,
                    totalGames: matches.data.totalGames,
                            });
                
               
            }).catch(e=>console.log("Error render MAstery",e))
       
        if (i > 2) {
            break;
        }
    }

    



        
    console.log("FinTEMP")
    return temp;
}



export default masteryAction;