import {combineReducers} from 'redux';

import {uiMiddleware} from './core/ui';
import auth from './features/auth';
import events from './features/events';

export default combineReducers({auth, events});

export const middlewares = [uiMiddleware];
