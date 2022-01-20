import {combineReducers} from 'redux';

import ui, {uiMiddleware} from './ui';
import auth from './auth';
import events from './events';

export default combineReducers({ui, auth, events});

export const middlewares = [uiMiddleware];
