import React from 'react';
let gameUtils = {
	getGame:(gameData)=>{
		const participantes = gameData.participantes;
		console.log("PARTICIPANTES",gameData)
		return(
			<div className="row">
				<div className="col-6 team100">
					<div className="row">
						{participantes.t100.map(s=>{
							return(<div className="col-12" key={s.summoner.summonerId} >
								<h2>{s.summoner.summonerName}</h2>
								</div>)})}
					</div>
				</div>
				<div className="col-6 team200">
					<div className="row">
						{participantes.t200.map(s=>{
							return(<div className="col-12" key={s.summoner.summonerId} >
								<h2>{s.summoner.summonerName}</h2>
								</div>)})}
					</div>
				</div>		
			</div>
		)
	}
}


;

export default gameUtils;