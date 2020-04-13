import React, {Component} from 'react';
import {  connect } from 'react-redux';

const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
class SummonerProfile extends Component{


	render(){
		const data = this.props.summonerData;
		
		
		const imgProfile = ddEndpoint+data.profileIconId+".png";


		const setupLeague = (state)=>{
			console.log("EEE",state);	
			return (<div>
				<div class="row">
						<div class="col-5">
	 						<div class="row text-center ">
	 							<div class="profileLiga col-6 p-0">
	 								<p>Solo: {renderLeague("solo",state)}</p>
	 							</div>
	 							<div class="profileLiga col-6 p-0">
	 								<p>Flex: {renderLeague("flex",state)}</p>
	 							</div>
	 						</div>
	 					</div>
					</div>
				
				
				 </div>)
			
		}
		const renderLeague = (league,state)=>{
			switch(league){
				case "solo":{
					if(state.unranked.solo){
						return "Unranked"
					}else{
						const soloQStr = state.soloq.tier +" "+state.soloq.rank
						return soloQStr
					}
				}
				case "flex":{
					if(state.unranked.flex){
						return "Unranked"
					}else{
						const soloQStr = state.flexq.tier +" "+state.flexq.rank
						return soloQStr
					}
				}
				
			}
		}
		
		return (<>
				<div className="row">

					<div className="profileIcon col-1 mx-auto animated fadeInDownBig">
						<div className="imageProfile rounded-circle mx-auto" style={{backgroundImage: "url(" + imgProfile + ")"}}></div>
						<br/>
						<h2 className="text-center summLevel">{data.summonerLevel}</h2>
						<br/>
						<h1 className="text-center summName">{data.name}</h1>
						{setupLeague(this.props.rankedData)}
					</div>
					

					</div>
					
					
				</>)
	}
}

const mapStateToProps = (state) => {
  return {
    summonerData: state.summonerProfileReducer.summonerData,
   	rankedData: state.summonerProfileReducer.rankedData

  }
};

export default connect( mapStateToProps)( SummonerProfile );