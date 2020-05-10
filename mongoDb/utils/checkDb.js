const RiotApi = require('../../riotApi/RiotApi');
const SummonerProfile = require('../models/SummonerProfile');

const mongoose = require('mongoose');

const checkDb = async(valor, type, time) => {
    //Esta variable define cuanto tiempo tiene que haber pasado para actualizar perfil en mongodb
    const sevenDaysMs = 504800000;
    let respuesta = {};
    let summModel = mongoose.model('SummonerProfile');

    switch (type) {
        //////////////////////////////////////
        case "summonerName":
            {
                respuesta = {};
                const isSumm = await summModel.find({
                    "name": new RegExp('\\b' + valor + '\\b', 'i')
                }).then(async fo => {
                    console.log("LEnght", fo);

                    //Se busca en BD por nombre, en caso de que el array tenga lenght 0 se añade usuario.
                    if (fo.length === 0) {
                        console.log("Se añade nuevo USER! ", valor);
                        await RiotApi.sByName(valor).then(async d => {
                            const model = new summModel({
                                accountId: d.data.accountId,
                                profileIconId: d.data.profileIconId,
                                name: d.data.name,
                                id: d.data.id,
                                summonerLevel: d.data.summonerLevel,
                                revisionDate: d.data.revisionDate,
                                puuid: d.data.puuid
                            });

                            await model.save()
                                .then(async result => {

                                    await summModel.find({
                                            id: result.id
                                        })
                                        .then(finalSend => {
                                           

                                            respuesta = finalSend
                                            

                                        });

                                })
                                .catch(error => {
                                    console.log("error3");
                                });



                        })
                    } else {


                        let diferencia = time - fo[0].revisionDate;

                        

                        //Revisamos cuanto hace desde ultima revision , en caso de ser mayor a 7 dias se vuelve a query
                        if (diferencia > sevenDaysMs) {

                            console.log("SE BUSCA DE NUEVO ", valor);
                            await summModel.deleteMany({id:fo[0].id},err=>{
                                if(err) console.log(err);
                                console.log("Successful deletion de ",valor);
                            })
                            await RiotApi.sByName(valor).then(async d => {

                                const model = new summModel({

                                    accountId: d.data.accountId,
                                    profileIconId: d.data.profileIconId,
                                    name: d.data.name,
                                    id: d.data.id,
                                    summonerLevel: d.data.summonerLevel,
                                    revisionDate: d.data.revisionDate,
                                    puuid: d.data.puuid
                                });

                                await model.save()
                                    .then(async result => {
                                       
                                         await summModel.find({
                                                id: result.id
                                            })
                                            .then(finalSend => {
                                              

                                                respuesta = finalSend

                                            }).catch(e => console.log("Error name check"));
                                        console.log("xx")
                                    })
                                    .catch(error => {
                                        console.log(e => "error4");
                                    });



                            }).catch(e => console.log("error5"));

                        } else {
                            console.log("Se envia de BD", fo)

                            respuesta = fo;

                        }


                    }
                }).catch(e => {
                respuesta = false;
                console.log("error en checkDB", e)})
                break;
            }
            //////////////////////////////////////
        case "match":{
                 let matchModel = mongoose.model('match');
                 respuesta = {};
                 const isMatch = await matchModel.find({
                    "gameId": new RegExp('\\b' + valor + '\\b', 'i')
                }).then(async fo => {
                   

                    if (fo.length === 0) {
                        console.log("Se añade nueva Game! id: ", valor);
                        const gameRetrive = await RiotApi.getMatchId(valor).then(async d=>{
                            model= new matchModel({
                                gameId:d.data.gameId,
                                match:d.data
                            });

                            await model.save();

                            respuesta = d.data;



                        })
                        .catch(e=>console.log("error get match"))

                    }else{
                        
                        fo.map(sendFinal=>{
                            console.log("Se manda de bd match")
                            respuesta = sendFinal.match
                        })
                    }
                }).catch(e=>console.log(e))
                console.log("llego a match")
                break;
            }
        default:
            break;
    }
    console.log("Se manda ", respuesta)
    return respuesta
}

module.exports = checkDb