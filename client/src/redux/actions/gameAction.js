import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';
const typeGame = types.gameData;
const gameAction = (id) => async (dispatch, getState) =>{
	let dataReturn = {
		gameData:{},
		participantes:{},
		isGame:false
	}
	let participantes = {}
	await RiotApiComponent.getGame(id)
		.then(dGame=>{
			console.log("ISGAME ACTION",dGame.data.isGame)
			 dataReturn.gameData = dGame.data.gameData
			 dataReturn.isGame = dGame.data.isGame
				
		}).catch(e=>console.log(e));

	
	
	if(dataReturn.isGame){
		participantes = await arrangeTeams(dataReturn.gameData);
		dataReturn.participantes = participantes;
	
			dispatch({
		type:typeGame,
		payload:dataReturn
	})
	}else{
		dispatch({
		type:typeGame,
		payload:dataReturn
	})

	}


	dispatch(summonerLoading(true,"loaded"));
	dispatch(summonerLoading(false,"loading"));

}


const arrangeTeams = async data=>{
  let ordenado = {};
  let t1 = [];
  let t2 = [];


   await Promise.all(data.participants.map(async x=>{
     
     let rankedData = await RiotApiComponent.getRanked(x.summonerId).then(dataRanked=>{
     	let d = dataRanked.data;
     	
     	;
     	if(x.teamId === 100){
         
         t1.push({
                 summoner:x,
                 ranked:d})
       
       

     }else{
      
               t2.push({
                 summoner:x,
                 ranked: d})
       
       
     }
     });
    

    
      
  }));
  
  ordenado = {
    t100:t1,
    t200:t2
  }
  
  return ordenado;
}


export default gameAction;