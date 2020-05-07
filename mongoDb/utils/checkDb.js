const RiotApi = require('../../riotApi/RiotApi');
const SummonerProfile = require('../models/SummonerProfile');
const Match = require('../models/match');

const checkDb = async(valor, type, time) => {
    const sevenDaysMs = 504800000;
    let respuesta = {};

    switch (type) {
        //////////////////////////////////////
        case "summonerName":
            {
               
                const isSumm = await SummonerProfile.find({
                    "name": new RegExp('\\b' + valor + '\\b', 'i')
                }).then(async fo => {
                    console.log("LEnght", fo);

                    //Se busca en BD por nombre, en caso de que el array tenga lenght 0 se añade usuario.
                    if (fo.length === 0) {
                        console.log("Se añade nuevo USER! ", valor);
                        await RiotApi.sByName(valor).then(async d => {
                            const model = new SummonerProfile({
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

                                    await SummonerProfile.find({
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
                            await SummonerProfile.deleteMany({id:fo[0].id},err=>{
                                if(err) console.log(err);
                                console.log("Successful deletion de ",valor);
                            })
                            await RiotApi.sByName(valor).then(async d => {

                                const model = new SummonerProfile({

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
                                       
                                         await SummonerProfile.find({
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
                }).catch(e => console.log("error en checkDB", e))
                break;
            }
            //////////////////////////////////////
        case "match":
            {
                console.log("llego a match")
                respuesta = false
                break;
            }
        default:
            break;
    }
    console.log("Se manda ", respuesta)
    return respuesta
}

module.exports = checkDb