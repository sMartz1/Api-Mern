import React, {Component} from 'react';
const ddEndpoint = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/profileicon/";
class SummonerProfile extends Component{
	
	render(){
		const data = this.props.summonerData;
		console.log(data.profileIconId)
		const imgProfile = ddEndpoint+data.profileIconId+".png";
		
		return (
				<div className="row">

					<div className="profileIcon col-1 mx-auto animated fadeInDownBig">
						<div className="imageProfile rounded-circle mx-auto" style={{backgroundImage: "url(" + imgProfile + ")"}}></div>
						<br/>
						<h2 className="text-center summLevel">{data.summonerLevel}</h2>
						<br/>
						<h1 className="text-center summName">{data.name}</h1>
					</div>
					
					
				</div>)
	}
}

export default SummonerProfile