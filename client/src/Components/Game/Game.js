import React, { Component } from 'react';
import {  connect } from 'react-redux';
import gameUtils from './gameUtils';

class Game extends Component {

		



	render() {
		const isGame = this.props.gameData.isGame;
		const gameData = this.props.gameData;
		const champions = this.props.champions;
		
		
		
		console.log("ISGAME",isGame)
		const renderGame= ()=>{
			if(isGame){
				return (<>{gameUtils.getGame(gameData,champions)}</>)
			}else{
				return <h1>No esta en partida</h1>
			}
		}
		return (
			<div>{renderGame()}</div>
		);
	}
}


const mapStateToProps = (state) => {
  return {
    gameData: state.gameReducer,
    champions: state.championReducer.champions
   	

  }
};

export default connect( mapStateToProps)( Game );

