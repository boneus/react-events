import {
  AnyAction,
  configureStore,
  EnhancedStore,
  Middleware,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import rootReducer, {middlewares} from './features';

const store: EnhancedStore<TAppState, AnyAction, TAppMiddleware[]> =
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
  });

export default store;

export type TAppState = ReturnType<typeof rootReducer>;
// export type TAppState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TAppMiddleware = Middleware<{}, TAppState>;
export type TAppThunkApiConfig<SliceState, RejectedValue = string> = {
  dispatch: TAppDispatch;
  state: SliceState;
  // extra: {
  //   jwt: string
  // },
  rejectValue: RejectedValue;
};

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;
