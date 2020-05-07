const express = require('express');
const SummonerProfile = require('./../mongoDb/models/SummonerProfile');
const Match = require('./../mongoDb/models/match');
const RiotApi = require('./../riotApi/RiotApi');
const checkDb = require('../mongoDb/utils/checkDb');
const axios = require('axios');
const router = express.Router();
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
const {
    getPaletteFromURL
} = require('color-thief-node');

router.get('/summName/', async(req, res) => {
    let time = Date.now();
    const nameSummoner = req.query.name;
    
    const valor = await checkDb(nameSummoner,"summonerName",time);
    console.log("VALOR",valor)
    res.send(valor);

    
    
    
   
       
});
router.get('/rankedStats/', async(req, res) => {
    const id = req.query.id;
    console.log("Llega : ",id)
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
            console.log("Error en ranked",e);

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
             
              if(i===partidasSend){
                
                res.send(dataToSend)
              }

            })
              
        
        })
        .catch(e => console.log("ERROR MATCH List"))

});

router.get('/allM/', async(req,res)=>{
    const summId = req.query.id;
    console.log("EN MASTERY");
    const masteryRetrive = await RiotApi.getAllMastery(summId)
        .then(d=>{
               res.send(d.data)
        }).catch(e=>console.log("Error en mastery",e))
})

router.get('/championGames/', async(req,res)=>{
    console.log("EN CHAMP GAME");
    const summId = req.query.id;
    const championId = req.query.champion
    console.log("llega : "+ summId + " y "+ championId)
    await RiotApi.getMatchWithChamp(summId,championId)
        .then(d=>{
            
            res.send(d.data);

        })
        .catch(e=>console.log("Error en queque de champs",e))
});
 






module.exports = router;