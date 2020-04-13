import React, { Component } from 'react';
import {  connect } from 'react-redux';


class Game extends Component {

		



	render() {
		const isGame = this.props.gameData.isGame;
		const gameData = this.props.gameData.gameData;

		const renderGame= ()=>{
			if(isGame){
				return <h1>En partida</h1>
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

