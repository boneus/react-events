import {combineReducers} from 'redux';

import {uiMiddleware} from './core/ui';
import auth from './features/auth';

export default combineReducers({auth});

export const middlewares = [uiMiddleware]
