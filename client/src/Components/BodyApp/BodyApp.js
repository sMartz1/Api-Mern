import React, {Component} from 'react';
import {  connect } from 'react-redux';

import SummonerProfile from '../SummonerProfile/SummonerProfile';
import Game from '../Game/Game';
import Loader from './Loader';
import mySvg from '../../assets/404.svg'

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
					return  <div
       			className="col-12 notFound animated fadeInUpBig"
       			style={{ backgroundImage: `url(${mySvg})` }}
   				 > </div>
				}
				}else{
					return <h3>Ready to find and seek!</h3>
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
