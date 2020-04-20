import React from 'react';

const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";

let gameUtils = {
	getGame:(gameData,champions)=>{
		const participantes = gameData.participantes;
		
		return(
			<div className="row">
				<div className="col-6 team100group">
					<div className="row">
						{participantes.t100.map(s=>{
							
							let cName = championName(s.summoner.championId,champions);
							return(<div className="col-10 offset-1 bg-light mb-1 team100 player" key={s.summoner.summonerId} >
								<div className="row">
									<span className="bandera"></span>
									<div className="col-1 champion">
									<img alt={cName}src={championUrl+cName+".png"} />
									</div>
									<h2 className="participantName col-3">{s.summoner.summonerName}</h2>
									{getLeague(s.ranked)}
									
								</div>
								</div>)})}
					</div>
				</div>
				<div className="col-6 team200group">
					<div className="row">
						{participantes.t200.map(s=>{
							let cName = championName(s.summoner.championId,champions);
							
							return(<div className="col-10 offset-1 bg-light mb-1 team200 player" key={s.summoner.summonerId} >
								<div className="row">
								<span className="bandera"></span>
								<div className="col-1 champion">
									<img alt={cName}src={championUrl+cName+".png"} />
									</div>
								<h2 className="participantName col-3">{s.summoner.summonerName}</h2>
								{getLeague(s.ranked)}
								</div>
								</div>)})}
					</div>
				</div>		
			</div>
		)
	},
	getChampionName:(a,c)=>{
		return championName(a,c);
	}
};

const getLeague = ranked=>{
	 return(<>
	 	<div className="col-2">
	 	<div className="row">
	 		<div className="col-12">
	 		Solo
	 		</div>
	 		<div className="col-12">
	 		{renderLeague("solo",ranked)}
	 		</div>
	 	</div>
	 	</div>
	 	<div className="col-2">
	 	<div className="row">
	 		<div className="col-12">
	 		Flex
	 		</div>
	 		<div className="col-12">
	 		{renderLeague("flex",ranked)}
	 		</div>
	 	</div>
	 	</div>
	 	
	 
	 	
	 	</>)
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

const championName= (id,c)=>{
	let name;
	let champions = c;
	
	for(var i in champions){
		
		
		if(champions[i].key==id){
			
			name = champions[i].id
		}
	}
	
	
	

	return name;
}




export default gameUtils ;