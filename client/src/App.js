import React, { Component } from 'react';

import Header from './Components/Header/Header';
import BodyApp from './Components/BodyApp/BodyApp';
import { connect } from 'react-redux';



const renderBody= (x)=>{
	if(x){
		return (<BodyApp />)
	}else{
		return (<div></div>)
	}
	
}

class App extends Component {

render(){
  return (  
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row">
        {renderBody(this.props.inputFilled)}
      </div>
    </div>
    </div>

  );
  }
}

const mapStateToProps = (state) => {
  return {
    inputFilled: state.loaderReducer.isLoading||state.loaderReducer.loaded
    
  }
};




export default connect( mapStateToProps)( App );
