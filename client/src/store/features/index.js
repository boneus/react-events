import {combineReducers} from 'redux';

import {uiMiddleware} from './ui';
import auth from './auth';
import events from './events';

export default combineReducers({auth, events});

export const middlewares = [uiMiddleware];
