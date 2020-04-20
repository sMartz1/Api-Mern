const express = require('express');
const SummonerProfile = require('./../mongoDb/models/SummonerProfile');
const RiotApi = require('./../riotApi/RiotApi');
const axios = require('axios');
const router = express.Router();
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
const { getPaletteFromURL } = require('color-thief-node');

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
                  }
            res.send(game);
           console.log("GAME",d.data)
       })
       .catch(e=>{
           
           console.log("Seguramente no este en partida.")
           res.send({isGame:false})
         
         

       });
       
});

router.get('/colors/',async(req, res) => {
       const imageId = req.query.id;
       const imgProfile = ddEndpoint+imageId+".png";
       
       colorPallete = await getPaletteFromURL(imgProfile);
       console.log("PALETA        ",colorPallete)
       res.send(colorPallete)
   
       
});

router.get('/matchList/',async(req, res) => {
       const accountId = req.query.id;
       const type = req.query.typeQ;
       console.log("ID :     "+accountId);
       console.log("TYPE:       "+ type)
       await RiotApi.getMatchQueue(accountId,type)
      .then(d=>{
        console.log("MATCH DATA",d.data)
        res.send(d.data);
      })


   
       
});




 module.exports = router;