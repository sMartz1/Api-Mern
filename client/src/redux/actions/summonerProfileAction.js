import types from '../types';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import summonerLoading from './summonerLoading';
import gameAction from './gameAction';
import masteryAction from './masteryAction'
const profileType = types.summProfile;
const profileRankedType = types.summProfileRanked;
const matchType = types.matchRanked;
const colorType = types.colorPallete;


const summonerProfileAction = () => async(dispatch, getState) => {
    //Se recoge nombre
    let name = getState().inputHeaderReducer.inputHeader;
    //isLoading true
    dispatch(summonerLoading(false, "loaded"));
    dispatch(summonerLoading(true, "loading"));



    //GET SUMMONER PROFILE
    await RiotApiComponent.getName(name)
        .then(d => {

            d.data.data.find(dfind => {
                dispatch({
                    type: profileType,
                    payload: {
                        data:dfind,
                        isSummoner:d.data.isSummoner
                    }
                })
                return true;



            })

        }).catch(e => console.log(e));
    console.log("Llega a action : ",getState().summonerProfileReducer.summonerFound)
    if(getState().summonerProfileReducer.summonerFound){

    let idSummoner = getState().summonerProfileReducer.summonerData.id;
    let idProfile = getState().summonerProfileReducer.summonerData.profileIconId;
    let accountId = getState().summonerProfileReducer.summonerData.accountId;

    await RiotApiComponent.getColors(idProfile)
        .then(colors => {
            dispatch({
                type: colorType,
                payload: colors.data
            });
        }).catch(e => console.log(e));

    
    await RiotApiComponent.getRanked(idSummoner)
        .then(dRanked => {

            dispatch({
                type: profileRankedType,
                payload: dRanked.data
            })

        }).catch(e => console.log(e));

    let soloQ = getState().summonerProfileReducer.rankedData.unranked.solo;
    let flexQ = getState().summonerProfileReducer.rankedData.unranked.flex;
    let dataProfile = {
        solo: {},
        flex: {}
    }
    if (!soloQ) {
        await RiotApiComponent.getMatch(accountId, "solo").
        then(d => {

            dataProfile.solo = d.data
        })
    }
    if (!flexQ) {
        await RiotApiComponent.getMatch(accountId, "flex").
        then(d => {
            dataProfile.flex = d.data
        })
    }




    await dispatch({
        type: matchType,
        payload: dataProfile
    });

    await dispatch(masteryAction(idSummoner));
    await dispatch(gameAction(idSummoner));

    }else{
         dispatch(summonerLoading(true,"loaded"));
         dispatch(summonerLoading(false,"loading"));
    }

}





export default summonerProfileAction;