import {combineReducers} from 'redux';

import {TAppMiddleware} from '@store';
import ui, {uiMiddleware} from '@store/features/ui';
import auth from '@store/features/auth';
import events from '@store/features/events';

export default combineReducers({ui, auth, events});

export const middlewares: TAppMiddleware[] = [uiMiddleware];
