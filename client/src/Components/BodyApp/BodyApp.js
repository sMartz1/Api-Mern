import React, {Component} from 'react';
import {  connect } from 'react-redux';

import SummonerProfile from '../SummonerProfile/SummonerProfile';
import Game from '../Game/Game';
import Loader from './Loader';

class BodyApp extends Component{



	render(){
		const renderBody = (isLoading,loaded) =>{
			
			if(isLoading){
				return(<div className="col loadingScreen animated fadeInDownBig">
					<Loader />
					</div>)
			}else{
				if(loaded){
					return (<>
						<div className="profileSection col-12 mt-10">
					 	<SummonerProfile />
						</div>
						<div className="gameSection col-12 mt-10 text-center">
						<Game />
						</div>
					</>)
				}else{
					return <h3>go machine</h3>
				}
			}	
		}




//////////////////////////////
//FINAL RENDER
		return(<>{renderBody(this.props.isLoading,this.props.loaded)}</>)
			 
	}
}



const mapStateToProps = (state) => {
  return {
    isLoading: state.loaderReducer.isLoading,
   	loaded:state.loaderReducer.loaded

  }
};
export default connect( mapStateToProps)( BodyApp );
