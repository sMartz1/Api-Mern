import React from 'react';
const championUrl = "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/";
let gameUtils = {
	getGame:(gameData)=>{
		const participantes = gameData.participantes;
		console.log("PARTICIPANTES",gameData)
		return(
			<div className="row">
				<div className="col-6 team100group">
					<div className="row">
						{participantes.t100.map(s=>{
							return(<div className="col-10 offset-1 bg-light mb-1 team100 player" key={s.summoner.summonerId} >
								<div className="row">
									<span className="bandera"></span>
									<div className="col-1 champion"></div>
									<h2>{s.summoner.summonerName}</h2>
								</div>
								</div>)})}
					</div>
				</div>
				<div className="col-6 team200group">
					<div className="row">
						{participantes.t200.map(s=>{
							return(<div className="col-10 offset-1 bg-light mb-1 team200 player" key={s.summoner.summonerId} >
								<div className="row">
								<span className="bandera"></span>
								<h2>{s.summoner.summonerName}</h2>
								</div>
								</div>)})}
					</div>
				</div>		
			</div>
		)
	}
}


;

export default gameUtils;