import React, {Component} from 'react';
import {  connect } from 'react-redux';




const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";

class SummonerProfile extends Component{


	render(){
		const data = this.props.summonerData;

		const imgProfile = ddEndpoint+data.profileIconId+".png";
		
		
	
		const setupLeague = (state)=>{
				
			return (<div>
				<div className="row">
						<div className="col-12">
	 						<div className="row text-center ">
	 							<div className="profileLiga col">
	 								<p>Solo: {renderLeague("solo",state)}</p>
	 							</div>
	 							<div className="profileLiga col">
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

				default: return "Fallo de datos..."

				
			}
		}
const setupRgb = color=>{
	return color[0]+","+color[1]+","+color[2]
}
let colors = this.props.colors;

console.log("COLORS EN COMPONENT", colors)
let estilos = {
	backgroundImage: "url(" + imgProfile + ")",
	boxShadow: "17px 6px 1px rgb("+setupRgb(colors[0])+",0.6),-4px 10px 1px rgb("+setupRgb(colors[1])+",0.6),-16px -6px 1px rgb("+setupRgb(colors[2])+",0.5),5px -4px 1px rgb("+setupRgb(colors[3])+",0.5)"
}

		return (<>
				<div className="row">

					<div className="profileIcon col-1 mx-auto animated fadeInDownBig">
						
 					
    			<div className="imageProfile rounded-circle mx-auto" style={estilos} ></div>
 					
						
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
   	rankedData: state.summonerProfileReducer.rankedData,
   	colors: state.summonerProfileReducer.colors

  }
};

export default connect( mapStateToProps)( SummonerProfile );