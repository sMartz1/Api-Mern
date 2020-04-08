import React, {Component} from 'react';
import {  connect } from 'react-redux';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import SummonerProfile from '../SummonerProfile/SummonerProfile';
import summonerLoading from '../../redux/actions/summonerLoading';

class BodyApp extends Component{
	constructor(props){
		super(props);
		this.state = {
			summonerData:[]
			
		}
	}

	componentDidMount(){
		const summonerCall = async ()=>{
			await RiotApiComponent.getName(this.props.iHead)
			.then(d=>{
				
				this.setState({summonerData:d.data
							   });
				this.props.summonerLoading(false,"loading");
				this.props.summonerLoading(true,"loaded");

			})
				
				
			
		}

		summonerCall();
		

	}

	componentDidUpdate(){
		if(this.props.isLoading){
		
							 
		const summonerCall = async ()=>{
			await RiotApiComponent.getName(this.props.iHead)
			.then(d=>{
				
				this.setState({summonerData:d.data
							   });
				this.props.summonerLoading(false,"loading");
				this.props.summonerLoading(true,"loaded");

			})
				
				
			
		}

		summonerCall();
		
	}
}


	render(){

		const renderBody = (isLoaded,summTest) =>{
			let summData = {}
			let isUp = false;
			if(isLoaded){
			
			summTest.map(profileArr=>{
				summData = profileArr;
				isUp = true;
					
			})

			if(!isUp){
				return(<h2>Cargando...</h2>)
		}else{
			console.log("se va a render",summData)
			return <SummonerProfile summonerData={summData}/>
			
		}
			
			
		}else{                   
			return(<h2>Cargando...</h2>)
		}
	}




//////////////////////////////
//FINAL RENDER
		return(<div className="profileSection col-12 mt-10">
					{renderBody(this.props.loaded,this.state.summonerData)}
			  </div>)
	}
}



const mapStateToProps = (state) => {
  return {
    iHead: state.inputHeaderReducer.inputHeader,
   	isLoading: state.loaderReducer.isLoading,
   	loaded:state.loaderReducer.loaded

  }
};
const mapDispatchToProps = {
   summonerLoading

};
export default connect( mapStateToProps,mapDispatchToProps)( BodyApp );
