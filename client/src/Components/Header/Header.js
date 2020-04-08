import React, { Component } from 'react';
import { connect } from 'react-redux';
import inputAction from '../../redux/actions/inputAction';
import summonerLoading from '../../redux/actions/summonerLoading';



class Header extends Component {
  state = {
    input: ''
  }
  constructor( props ) {
    super( props );

    this.sendInput = this.sendInput.bind( this );
    this.handleKey = this.handleKey.bind( this );
  }

  sendInput( e ) {
    this.props.inputAction( e.target.value );
  }



handleKey( e ) {

    const keyCode = e.keyCode || e.which;
    if ( keyCode === 13 ) {
      this.props.summonerLoading(false,"loaded");
      this.props.summonerLoading(true,"loading");


       
      

    }
  }


  render() {
    return (<nav className="navbar navbar-expand-md navbar-light bg-light fixed-top navBarWp">
              <a className="navbar-brand" target="_blank" >RIOT API</a>
              <button className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#miNavbar"
                      aria-controls="miNavbar"
                      aria-expanded="false"
                      aria-label="Mostrar u ocultar menú">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse  bg-light" id="miNavbar">
                <input className="form-control mr-sm-2 text-center col-md-3 mx-auto"
                       type="text"
                       placeholder="Summoner"
                       aria-label="Búsqueda"
                       onChange={ this.sendInput }
                       onKeyUp={ this.handleKey } />
              </div>
            </nav>);
  }




}

const mapStateToProps = (state) => {
  return {
    iHead: state.inputHeaderReducer.inputHeader
  }
};

const mapDispatchToProps = {
  inputAction,
  summonerLoading

};


export default connect( mapStateToProps, mapDispatchToProps )( Header );
