import React, {Component} from 'react';
import {  connect } from 'react-redux';

import gameUtils from '../Game/gameUtils';

const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";

class SummonerProfile extends Component{


	render(){
		const data = this.props.summonerData;

		const imgProfile = ddEndpoint+data.profileIconId+".png";
		
		

const renderLeague = (league,state)=>{
		
			switch(league){
				case "solo":{
					if(state.unranked.solo){
						return "Unranked"
					}else{
						const soloQStr = state.soloq.tier +" "+state.soloq.rank
						const winRate = (state.soloq.wins/(state.soloq.wins+state.soloq.losses))*100
						return (<>
								<p className="col">{soloQStr}</p>
								<p className="col">Win Rate: {winRate.toFixed()}%</p>
								</>)
					}
				}
				case "flex":{
					if(state.unranked.flex){
						return "Unranked"
					}else{
						const soloQStr = state.flexq.tier +" "+state.flexq.rank
						const winRate = (state.flexq.wins/(state.flexq.wins+state.flexq.losses))*100
						return (<>
								<p className="col">{soloQStr}</p>
								<p className="col">Win Rate: {winRate.toFixed()}%</p>
								</>)
					}
				}

				default: return "Fallo de datos..."

				
			}
		}
const setupRgb = color=>{
	return color[0]+","+color[1]+","+color[2]
}


let colors = this.props.colors;
const champions = this.props.champions;

let estilos = {
	backgroundImage: "url(" + imgProfile + ")",
	boxShadow: "17px 6px 1px rgb("+setupRgb(colors[0])+",0.6),-4px 10px 1px rgb("+setupRgb(colors[1])+",0.6),-16px -6px 1px rgb("+setupRgb(colors[2])+",0.5),5px -4px 1px rgb("+setupRgb(colors[3])+",0.5)"
}






let mastery = this.props.mastery.allMastery;
let topFour =this.props.mastery.topFour;

console.log(topFour);	



		return (<>
				<div className="row">
				<div className="col-2 soloStats statsProfile bg-light mx-auto animated fadeInDownBig">
					<div className="row text-center">
						<h4 className="col">Solo</h4>
						<div className="w-100"></div>
						{renderLeague("solo",this.props.rankedData)}
						<div className="w-100"></div>
						<div className="row ml-0 pl-2">
						{Object.keys(this.props.matchRanked.solo).map((mat,ky)=>{
								let actual = this.props.matchRanked.solo[mat]
								
								let matchStyle = {
									backgroundImage: "url(" + championUrl + gameUtils.getChampionName(actual.champion,champions) + ".png)",
								}
								return(
									<div key={ky} className="col-1 tenGames" style={matchStyle}>
									{actual.win?(<div key={ky} className="victoria"></div>):(<div key={ky} className="derrota"></div>)}
									</div>
									)
							})}

						</div>
						<div className="w-100"></div>
						<h3 className="lp text-center col mt-2">{this.props.rankedData.soloq.leaguePoints} LP</h3>




					</div>

				</div>
			    <div className="col-2 ">
			    <div className="row">
			    <div className="col-8 statsProfile bg-light mastery mx-auto">
			    {topFour.map((m,i)=>{
			   
				let championStyle = {
					backgroundImage:"url("+championUrl + gameUtils.getChampionName(m.championId,champions) + ".png)"
				}
			    		return(<>
					<div className="masteryChampion row" key={i}>
					<div  key={i} className="col-6">
						<h5 key={m.championId+"i"}>{gameUtils.getChampionName(m.championId,champions)}</h5>
						<p key={m.championId+"a"}>{m.championPoints}</p>
					</div>
					<div className="imageChampion col-6" style={championStyle}></div>
					</div> </>)
			    })}</div>
			    </div>
			    </div>

				<div className="profileIcon col-1 mx-auto animated fadeInDownBig">
						
 					
    			<div className="imageProfile rounded-circle mx-auto" style={estilos} ></div>
 									
						<br/>
						<h2 className="text-center summLevel">{data.summonerLevel}</h2>
						<br/>
						<h1 className="text-center summName">{data.name}</h1>
						
				</div>
					
				<div className="col-2 flexStats statsProfile bg-light mx-auto animated fadeInDownBig">
					<div className="row text-center">
						<h4 className="col">Flex</h4>
						<div className="w-100"></div>
						{renderLeague("flex",this.props.rankedData)}
						<div className="w-100"></div>
						<div className="row ml-0 pl-2">
							{Object.keys(this.props.matchRanked.flex).map((mat,ky)=>{
								let actual = this.props.matchRanked.flex[mat]
								
								let matchStyle = {
									backgroundImage: "url(" + championUrl + gameUtils.getChampionName(actual.champion,champions) + ".png)",
								}
								return(
									<div key={ky} className="col-1 tenGames" style={matchStyle}>
									{actual.win?(<div key={ky} className="victoria"></div>):(<div key={ky}  className="derrota"></div>)}
									</div>
									)
							})}
						</div>
						<div className="w-100"></div>
						<h3 className="lp text-center col mt-2">{this.props.rankedData.flexq.leaguePoints} LP</h3>
					</div>
				</div>
					</div>
					
					
				</>)

	}
}

const mapStateToProps = (state) => {
  return {
    summonerData: state.summonerProfileReducer.summonerData,
   	rankedData: state.summonerProfileReducer.rankedData,
   	colors: state.summonerProfileReducer.colors,
   	matchRanked: state.summonerProfileReducer.matchData,
   	champions: state.championReducer.champions,
   	mastery: state.masteryReducer

  }
};

export default connect( mapStateToProps)( SummonerProfile );