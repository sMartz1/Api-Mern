import React, {Component} from 'react';
import {  connect } from 'react-redux';
import RiotApiComponent from '../RiotApiHandler/RiotApiComponent';
import SummonerProfile from '../SummonerProfile/SummonerProfile';

class BodyApp extends Component{
	constructor(props){
		super(props);
		this.state = {
			summonerData:[],
			isLoaded:false
		}
	}

	componentDidMount(){
		const summonerCall = async ()=>{
			await RiotApiComponent.getName(this.props.iHead)
			.then(d=>{
				console.log(d);
				this.setState({summonerData:d.data,
							    isLoaded:this.props.isLoaded});
			})
			
			
		}

		summonerCall();
		

	}
	render(){

		const renderBody = (isLoaded,summTest) =>{
			let summData = {}
			if(isLoaded){
			
			summTest.map(profileArr=>{
				summData = profileArr;
				
					
			})
			return <SummonerProfile summonerData={summData}/>
			
			
		}else{                   
			return(<h2>No se ha cargado</h2>)
		}
	}




//////////////////////////////
//FINAL RENDER
		return(<div className="profileSection col-12 mt-10">
					{renderBody(this.state.isLoaded,this.state.summonerData)}
			  </div>)
	}
}



const mapStateToProps = (state) => {
  return {
    iHead: state.inputHeaderReducer.inputHeader,
   	isLoaded: state.loaderReducer.summonerTyped
  }
};
export default connect( mapStateToProps)( BodyApp );
