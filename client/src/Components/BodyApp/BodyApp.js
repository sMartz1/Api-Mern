import React, {Component} from 'react';
import {  connect } from 'react-redux';

import SummonerProfile from '../SummonerProfile/SummonerProfile';
import Game from '../Game/Game';
import Loader from './Loader';

class BodyApp extends Component{



	render(){
		const renderBody = (isLoading,loaded,summ) =>{
			
			if(isLoading){
				return(<div className="col loadingScreen animated fadeInDownBig">
					<Loader />
					</div>)
			}else{
				if(loaded){
					if(summ){
					return (<>
						<div className="profileSection col-12 mt-10">
					 	<SummonerProfile />
						</div>
						<div className="gameSection col-12 mt-10 text-center">
						<Game />
						</div>
					</>)
				}else{
					return <h2 className="col display-4 mt-10 text-center">Seguro que has puesto bien el nombre? Recibo 404 de riot...</h2>
				}
				}else{
					return <h3>go machine</h3>
				}
			}	
		}




//////////////////////////////
//FINAL RENDER
		return(<>{renderBody(this.props.isLoading,this.props.loaded,this.props.summLoaded)}</>)
			 
	}
}



const mapStateToProps = (state) => {
  return {
    isLoading: state.loaderReducer.isLoading,
   	loaded:state.loaderReducer.loaded,
   	summLoaded:state.summonerProfileReducer.summonerFound

  }
};
export default connect( mapStateToProps)( BodyApp );
