import {configureStore} from '@reduxjs/toolkit';

import rootReducer, {middlewares} from './features';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});
