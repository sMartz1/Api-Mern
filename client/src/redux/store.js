import { createStore, combineReducers ,  applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//REDUCERS IMPORT

import inputHeaderReducer from './reducers/inputHeaderReducer';
import loaderReducer from './reducers/loaderReducer';
import summonerProfileReducer from './reducers/summonerProfileReducer';
import gameReducer from './reducers/gameReducer';
import championReducer from './reducers/championsReducer';
import masteryReducer from './reducers/masteryReducer';
import modalReducer from './reducers/modalReducer';
//COMBINE REDUCERS

const reducer = combineReducers( {
  inputHeaderReducer,
  loaderReducer,
  summonerProfileReducer,
  gameReducer,
  championReducer,
  masteryReducer,
  modalReducer

} );

const composeEnhancers = composeWithDevTools( {
	
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
} );

const store = createStore( reducer, composeEnhancers(
	applyMiddleware(thunk)
  // other store enhancers if any
),

// other store enhancers if any
);

export default store;
