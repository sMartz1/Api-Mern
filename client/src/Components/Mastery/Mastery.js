import React, { Component } from 'react';
import {  connect } from 'react-redux';
import gameUtils from '../Game/gameUtils';
const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";

class Mastery extends Component {
	render() {

		
		let topFour =this.props.mastery.topFour;
		const champions = this.props.champions;


		return (
			<div className="col-8 mastery mx-auto animated fadeInDownBig">

			    {topFour.map((m,i)=>{
			   
			   	console.log("VALOR que llegue",topFour[i]["totalGames"])
				let championStyle = {
					backgroundImage:"url("+championUrl + gameUtils.getChampionName(m.championId,champions) + ".png)"
				}
			    		return(
					<div className="masteryChampion row mb-1 statsProfile bg-light" key={i}>
					<div  key={i} className="col-6">
						<h5 key={m.championId+"i"}>{gameUtils.getChampionName(m.championId,champions)}</h5>
						<p key={m.championId+"a"}>{m.championPoints}</p>
						<p key={m.championId+"g"}>Total games: {m.totalGames}</p>
						<p key={m.championId+"an"}>Games analizadas:{m.partidasAnalizadas}</p>
						<p key={m.championId+"wr"}>WinRate: {m.winRate}%</p>

					</div>
					<div key={m.championId+"i"}className="imageChampion col-6" style={championStyle}></div>
					</div>)
			    })}</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
   	mastery: state.masteryReducer,
   	champions: state.championReducer.champions,

  }
};

export default connect( mapStateToProps)( Mastery );

