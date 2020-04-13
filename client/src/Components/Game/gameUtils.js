import React from 'react';
let gameUtils = {
	getGame:(gameData,part)=>{
		console.log("PART",part)
		return(
			<div className="row">
				<div className="col-6 team100">
					<div className="row">
						{part.t100.map(s=>{
							return(<div className="col-12" key={s.summonerId} >
								<h2>{s.summonerName}</h2>
								</div>)})}
					</div>
				</div>
				<div className="col-6 team200">
					<div className="row">
						{part.t200.map(s=>{
							return(<div className="col-12" key={s.summonerId} >
								<h2>{s.summonerName}</h2>
								</div>)})}
					</div>
				</div>		
			</div>
		)
	}
}


;

export default gameUtils;