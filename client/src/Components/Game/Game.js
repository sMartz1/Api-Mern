import React, { Component } from 'react';
import {  connect } from 'react-redux';
import gameUtils from './gameUtils';

class Game extends Component {

		



	render() {
		const isGame = this.props.gameData.isGame;
		const gameData = this.props.gameData;
		
		
		
		const renderGame= ()=>{
			if(isGame){
				return (<>{gameUtils.getGame(gameData)}</>)
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
    gameData: state.gameReducer
   	

  }
};

export default connect( mapStateToProps)( Game );

