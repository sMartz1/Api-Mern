import React, {Component} from 'react';
import {  connect } from 'react-redux';

import gameUtils from '../Game/gameUtils';
import Mastery from '../Mastery/Mastery';
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

		return (<>
				<div className="row">
				<div className="col-4 mx-auto animated fadeInDownBig">
					<div className="row text-center">
						<div className="col-7 statsProfile bg-light mx-auto">
						<h4 className="col">Solo</h4>
						<div className="w-100"></div>
						{renderLeague("solo",this.props.rankedData)}
						<div className="w-100"></div>
						<div className="row ">
						{Object.keys(this.props.matchRanked.solo).map((mat,ky)=>{
								let actual = this.props.matchRanked.solo[mat]
								
								let matchStyle = {
									backgroundImage: "url(" + championUrl + gameUtils.getChampionName(actual.champion,champions) + ".png)",
								}
								return(
									<div key={ky} className={ky>0?"col-1 tenGames":"col-1 tenGames offset-1"} style={matchStyle}>
									{actual.win?(<div key={ky} className="victoria"></div>):(<div key={ky} className="derrota"></div>)}
									</div>
									)
							})}

						</div>
						<div className="w-100"></div>
						<h3 className="lp text-center col mt-2">{this.props.rankedData.soloq.leaguePoints} LP</h3>
						</div>



					</div>
							<div className="row text-center mt-2">
							<div className="col-7 statsProfile bg-light mx-auto ">
						<h4 className="col">Flex</h4>
						<div className="w-100"></div>
						{renderLeague("flex",this.props.rankedData)}
						<div className="w-100"></div>
						<div className="row">
							{Object.keys(this.props.matchRanked.flex).map((mat,ky)=>{
								let actual = this.props.matchRanked.flex[mat]
								
								let matchStyle = {
									backgroundImage: "url(" + championUrl + gameUtils.getChampionName(actual.champion,champions) + ".png)",
								}
								return(
									<div key={ky} className={ky>0?"col-1 tenGames":"col-1 tenGames offset-1"} style={matchStyle}>
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
			<div className="profileIcon col-4 mx-auto animated fadeInDownBig">
						
 					
    		<div className="imageProfile rounded-circle mx-auto" style={estilos} ></div>
 									
						<br/>
						<h2 className="text-center summLevel">{data.summonerLevel}</h2>
						<br/>
						<h1 className="text-center summName">{data.name}</h1>
						
				</div>
			    <div className="col-4 mx-auto">
			    <div className="row">
			    	<Mastery />
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
   	

  }
};

export default connect( mapStateToProps)( SummonerProfile );