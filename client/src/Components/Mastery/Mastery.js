import React, { Component } from 'react';
import {  connect } from 'react-redux';
import gameUtils from '../Game/gameUtils';
const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";

class Mastery extends Component {
	render() {

		let mastery = this.props.mastery.allMastery;
		let topFour =this.props.mastery.topFour;
		const champions = this.props.champions;

		return (
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
