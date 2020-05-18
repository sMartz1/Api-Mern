import React, { Component } from 'react';

import Header from './Components/Header/Header';
import BodyApp from './Components/BodyApp/BodyApp';
import { connect } from 'react-redux';

import championAction from './redux/actions/championAction';



const renderBody= (x)=>{
	if(x){
		return (<BodyApp />)
	}else{
		return (<div></div>)
	}
	
}

class App extends Component {


componentDidMount(){
  this.props.championAction();
}
render(){
  return (  
    <div className="App" id="App">
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

const mapDispatchToProps = {
  championAction,

};



export default connect( mapStateToProps,mapDispatchToProps)( App );
