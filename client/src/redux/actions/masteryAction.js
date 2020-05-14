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
    //Se realiza bucle para pasar por los 4 primeros
    for(let i = 0; i < mastery.length; i++) {
        console.log("1")
        
        //Se recoge partidas con championId
        await RiotApiComponent.getChampionMatches(id,mastery[i].championId)
            .then(async matches=>{
                
                console.log("2",matches.data.matches.length)
                //Se loop por cada game
               let games = await fetchDataWithChampion(matches.data.matches);
               console.log("DUPLICATES",getDuplicateArrayElements(games))
               console.log("3")
               let winRate = 0;
               console.log("llega ", games)
               console.log("largo",games.length)
               games.map((m,iMatch)=>{

                            m.participants.map((statF,iStats)=>{
                         if (statF.championId === mastery[i].championId) {
                             statF.stats.win?winRate++:console.log("lost")
                            
                         }
                         return m; 
                    })
                           return m; 
                })
                
               
               console.log("WINR : "+(winRate/games.length*100).toFixed(0)+"%" )
                 temp.push({
                    championId:mastery[i].championId,
                    championPoints:mastery[i].championPoints,
                    winRate:(winRate/games.length*100).toFixed(0),
                    partidasAnalizadas:games.length,
                    totalGames: matches.data.matches.length,
                            });
                
                
               return true;     
            }).catch(e=>console.log("Error render MAstery",e))
       
        if (i > 2) {
            console.log("fin")
            break;
        }
    }

    



        
    console.log("FinTEMP",temp)
    return temp;
}

const fetchDataWithChampion = async (matchList)=>{
    let contador = 0;
   
    let cap = 20;
    let temp = [];
    for await (let g of matchList) {
        if (contador < cap) {
        try {
            const { data } = await RiotApiComponent.getGameData(g.gameId);
            const { count, match } = data;
            if (count) {
                contador++;
            }

            temp.push(match);
        } catch (e) {
            console.error(`Error en fetch Game data`, e);
        }
        } else {
        console.log("cap");
        break;
    }
}


    console.log("Se devuelve",temp)
    return temp;
}

function getDuplicateArrayElements(arr){
    var sorted_arr = arr.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    return results;
}

export default masteryAction;