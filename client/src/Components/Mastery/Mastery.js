import React, { Component } from 'react';
import {  connect } from 'react-redux';
import gameUtils from '../Game/gameUtils';
import Modal from 'react-modal';
import modalAction from '../../redux/actions/modalAction';
const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";
Modal.setAppElement('#root');
class Mastery extends Component {
	constructor( props ) {
    super( props );

    this.sendModal = this.sendModal.bind( this );
    this.closeModal = this.closeModal.bind( this );
  }

  sendModal(data){
  	this.props.modalAction(data,true);
  }
  closeModal(){
  	this.props.modalAction({},false);
  }
	
	render() {

		
		let topFour =this.props.mastery.topFour;
		const champions = this.props.champions;
		let modalOpen = this.props.modal.isOpen;
		let modalData= this.props.modal.modalData


		return (
			<div className="col-8 mastery mx-auto animated fadeInDownBig">

			    {topFour.map((m,i)=>{
			    let name = gameUtils.getChampionName(m.championId,champions);
			   	console.log("VALOR que llegue",topFour[i]["totalGames"])
			   	
				let championStyle = {
					backgroundImage:"url("+championUrl + name + ".png)"
				}
			    		return(
					<div className="masteryChampion row mb-1 statsProfile bg-light" key={i} onClick={()=>this.sendModal(m)}>
					<div  key={i} className="col-6">
						<h5 key={m.championId+"i"}>{name}</h5>
						<p key={m.championId+"a"}>{m.championPoints}</p>
						<p key={m.championId+"g"}>Total games: {m.totalGames}</p>
						<p key={m.championId+"an"}>Games analizadas:{m.partidasAnalizadas}</p>
						<p key={m.championId+"wr"}>WinRate: {m.winRate}%</p>

					</div>
					<div key={m.championId+"i"}className="imageChampion col-6" style={championStyle}></div>
					</div>
					)
			    })}
			    <Modal 					
           			isOpen={modalOpen}
           			contentLabel="Minimal Modal Example"
           			className="Modal"
           			overlayClassName="Overlay">modalData.
           				<h5 >{modalData.championPoints}</h5>
          				<button onClick={()=>this.closeModal()}>Close Modal</button>
        		</Modal>
        		</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
   	mastery: state.masteryReducer,
   	champions: state.championReducer.champions,
   	modal:state.modalReducer

  }
};

const mapDispatchToProps = {
  modalAction,

};

export default connect( mapStateToProps,mapDispatchToProps)( Mastery );

