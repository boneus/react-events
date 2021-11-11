import {applyMiddleware, compose} from 'redux';
import {createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './ducks';

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  enhancedCompose(applyMiddleware(thunk))
);
