import React, {Component} from 'react';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
class SummonerProfile extends Component{
	constructor(props){
  	super(props);	
  	this.state={
  		ranked:{},
  		loadedRanked:false
  		
  		} 
		}

	componentDidMount() {
		console.log("Se llama con id",this.props.summonerData.id);
		const leagueCall = async()=>{
		
		await RiotApiComponent.getRanked(this.props.summonerData.id)
		.then(d=>{
			console.log("RANKED DATA",d); 
			this.setState({
			ranked: d.data,
			loadedRanked:true
		});
			
		})
		.catch(e=>{console.log(e);});}
		
			
			leagueCall();
		
		
		
		
	}
	
	render(){
		const data = this.props.summonerData;
		const imgProfile = ddEndpoint+data.profileIconId+".png";

		const setupLeague = (load,state)=>{
			console.log("LOAD",load);
			console.log("STATE",state)
			if(load){
				return (<div><p>Solo: {renderLeague("solo",state)}</p> <p>Flex: {renderLeague("flex",state)}</p></div>)
			}
		}
		const renderLeague = (league,state)=>{
			switch(league){
				case "solo":{
					if(state.ranked.unranked.solo){
						return "Unranked"
					}else{
						const soloQStr = state.ranked.soloq.tier +" "+state.ranked.soloq.rank
						return soloQStr
					}
				}
				case "flex":{
					if(state.ranked.unranked.flex){
						return "Unranked"
					}else{
						const soloQStr = state.ranked.flexq.tier +" "+state.ranked.flexq.rank
						return soloQStr
					}
				}
				
			}
		}
		
		return (
				<div className="row">

					<div className="profileIcon col-1 mx-auto animated fadeInDownBig">
						<div className="imageProfile rounded-circle mx-auto" style={{backgroundImage: "url(" + imgProfile + ")"}}></div>
						<br/>
						<h2 className="text-center summLevel">{data.summonerLevel}</h2>
						<br/>
						<h1 className="text-center summName">{data.name}</h1>
						{setupLeague(this.state.loadedRanked,this.state)}
						
						
					</div>
					
					
				</div>)
	}
}

export default SummonerProfile