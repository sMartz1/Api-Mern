const express = require('express');
const SummonerProfile = require('./../mongoDb/models/SummonerProfile');
const RiotApi = require('./../riotApi/RiotApi');
const axios = require('axios');
const router = express.Router();
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
const {
    getPaletteFromURL
} = require('color-thief-node');

router.get('/summName/', async(req, res) => {
    let time = Date.now();
    const nameSummoner = req.query.name;
    const sevenDaysMs = 604800000;
    
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
                            SummonerProfile.find({
                                    id: result.id
                                })
                                .then(finalSend => {
                                    res.send(finalSend);
                                });

                        })
                        .catch(error => {
                            console.log(error);
                        });



                })
            } else {
                
               
                   let diferencia = time-fo.revisionDate;
                   console.log("Revision",diferencia>sevenDaysMs);

                  if(diferencia>sevenDaysMs){
                    console.log("Se debe buscar de nuevo");
                  console.log("Se añade nuevo USER! ", nameSummoner);
                  RiotApi.sByName(nameSummoner).then(d => {
                    fo = {
                        accountId: d.data.accountId,
                        profileIconId: d.data.profileIconId,
                        name: d.data.name,
                        id: d.data.id,
                        summonerLevel: d.data.summonerLevel,
                        revisionDate: d.data.revisionDate,
                        puuid: d.data.puuid
                    };

                    fo.save()
                        .then(result => {
                            SummonerProfile.find({
                                    id: result.id
                                })
                                .then(finalSend => {
                                    res.send(finalSend);
                                });

                        })
                        .catch(error => {
                            console.log(error);
                        });



                })

                  }else{
                    console.log("Se envia de BD")
                    res.send(fo);
                  }
                
                
            }
        });
});
router.get('/rankedStats/', async(req, res) => {
    const id = req.query.id;

    let ligas = {
        soloq: {},
        flexq: {},
        unranked: {
            solo: true,
            flex: true
        }
    }
    const leagues = await RiotApi.getRanked(id)
        .then(d => {
            d.data.map(a => {
                if (a.queueType === "RANKED_SOLO_5x5") {
                    ligas.soloq = a;
                    ligas.unranked.solo = false;

                }
                if (a.queueType === "RANKED_FLEX_SR") {
                    ligas.flexq = a;
                    ligas.unranked.flex = false;
                }
                

            })

            res.send(ligas);
        })
        .catch(e => {
            console.log(e)
        });

});

router.get('/game/', async(req, res) => {
    const id = req.query.id;

    let game = {}
    const gameRetrive = await RiotApi.getGame(id)
        .then(d => {
            game = {
                gameData: d.data,
                isGame: true,
            }
            res.send(game);
            
        })
        .catch(e => {

            console.log("Seguramente no este en partida.")
            res.send({
                isGame: false
            })



        });

});

router.get('/colors/', async(req, res) => {
    const imageId = req.query.id;
    const imgProfile = ddEndpoint + imageId + ".png";

    colorPallete = await getPaletteFromURL(imgProfile);
    
    res.send(colorPallete)


});


router.get('/matchList/', async(req, res) => {
    const accountId = req.query.id;
    const type = req.query.typeQ;
    console.log("ID :     " + accountId);
    console.log("TYPE:       " + type);
    let dataToSend = {};
    let i = 0
    let partidasSend = 10
    matchQueue = await RiotApi.getMatchQueue(accountId, type)
        .then(async d => {
            
            await d.data.matches.map(async d => {
                
                await RiotApi.getMatchId(d.gameId)
                .then(match => {
                    let resultado;
                    
                    match.data.participants.map(f => {

                        if (f.championId === d.champion) {
                          
                            resultado = f.stats.win
                        }
                    })
                    dataToSend[d.gameId] = {
                        champion: d.champion,
                        queue: d.queue,
                        role: d.role,
                        lane: d.lane,
                        win: resultado

                    }
                   
                 
                }).catch(e=>console.log("error en match id"))

             
               i++;
              console.log("Index",i)
              if(i===partidasSend){
                console.log("FINAL",dataToSend)
                res.send(dataToSend)
              }

            })
              
        
        })
        .catch(e => console.log("ERROR MATCH List"))
    
 

   




});




module.exports = router;