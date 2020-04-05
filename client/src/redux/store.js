import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//REDUCERS IMPORT

import inputHeaderReducer from './reducers/inputHeaderReducer';
import loaderReducer from './reducers/loaderReducer';

//COMBINE REDUCERS

const reducer = combineReducers( {
  inputHeaderReducer,
  loaderReducer

} );

const composeEnhancers = composeWithDevTools( {
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
} );

const store = createStore( reducer, composeEnhancers(

  // other store enhancers if any
)

// other store enhancers if any
);

export default store;
