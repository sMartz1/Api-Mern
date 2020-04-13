const express = require('express');
const SummonerProfile = require('./../mongoDb/models/SummonerProfile');
const RiotApi = require('./../riotApi/RiotApi');
const axios = require('axios');
const router = express.Router();

router.get('/summName/', async(req, res) => {
            const nameSummoner = req.query.name;
            console.log("LLega a SERVER user :",nameSummoner)
            const isSumm = await SummonerProfile.find({
                    "name": new RegExp('\\b' + nameSummoner + '\\b', 'i')
                })
                .then(fo => {
                    console.log("LEnght", fo.length)
                    if (fo.length === 0) {
                        console.log("Se añade nuevo USER! ", nameSummoner);
                        RiotApi.sByName(nameSummoner).then(d => {
                            const model = new SummonerProfile({
                                accountId: d.data.accountId,
                                profileIconId: d.data.profileIconId,
                                name: d.data.name,
                                id: d.data.id,
                                summonerLevel: d.data.summonerLevel,
                                revisionDate: d.data.revisionDate,
                                puuid: d.data.puuid
                            });

                            model.save()
                                .then(result => {
                                    SummonerProfile.find({id:result.id})
                                    .then(finalSend=>{
                                         res.send(finalSend);
                                    });
                                    
                                })
                                .catch(error => {
                                    console.log(error);
                                });



                        })
                    } else {
                        console.log("Ya existe",fo);
                        res.send(fo);
                    }
                });
            });
router.get('/rankedStats/',async(req, res) => {
       const id = req.query.id;
       
       let ligas = {
           soloq:{},
           flexq:{},
           unranked:{solo:true,flex:true}
       }
       const leagues = await RiotApi.getRanked(id)
       .then(d=>{
           d.data.map(a=>{
               if(a.queueType==="RANKED_SOLO_5x5"){
                   ligas.soloq=a;
                   ligas.unranked.solo = false;
                             
               }
               if(a.queueType==="RANKED_FLEX_SR"){
                   ligas.flexq=a;
                   ligas.unranked.flex = false;
               }
               console.log(a);

           })

           res.send(ligas);
       })
       .catch(e=>{console.log(e)});
       
});

router.get('/game/',async(req, res) => {
       const id = req.query.id;

       let game = {      
       }
       const gameRetrive = await RiotApi.getGame(id)
       .then(d=>{  
            game = {
              gameData:d.data,
              isGame:true,
              participantes:arrangeTeams(d.data)
            }
            res.send(game);
           console.log("GAME",d.data)
       })
       .catch(e=>{
         
           console.log(e)
           res.send({isGame:false})
         
         

       });
       
});

const arrangeTeams = data=>{
  let ordenado = {};
  let t1 = [];
  let t2 = [];

  data.participants.map(d=>{
     if(d.teamId === 100){

         t1.push({
                 summoner:d,
                 ranked:getRankedsGame(d.summonerId)});
       
       

     }else{
      
                t2.push({
                 summoner:d,
                 ranked:getRankedsGame(d.summonerId)})
       
       
     }
      return true;
  });

  ordenado = {
    t100:t1,
    t200:t2
  }
  return ordenado;
}

const getRankedsGame = async data=>{

   const id = data;
       
       let ligas = {
           soloq:{},
           flexq:{},
           unranked:{solo:true,flex:true}
       }

       const leagues = await RiotApi.getRanked(id)
       .then(d=>{
            d.data.map(a=>{
               if(a.queueType==="RANKED_SOLO_5x5"){
                   ligas.soloq=a;
                   ligas.unranked.solo = false;
                             
               }
               if(a.queueType==="RANKED_FLEX_SR"){
                   ligas.flexq=a;
                   ligas.unranked.flex = false;
               }
               console.log(a);

           })

           return ligas
       })
       .catch(e=>{console.log(e)});
}

 module.exports = router;