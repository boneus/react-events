import {useMemo} from 'react';
import {
  createSlice,
  bindActionCreators,
  Slice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {message} from 'antd';

import {TAppMiddleware, useAppDispatch} from '@store';

export const moduleName = 'UI';

interface IUIState {}

interface INotification {
  type: 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading';
  message: string;
  moduleName: string;
}

const uiSlice: Slice<IUIState> = createSlice<
  IUIState,
  SliceCaseReducers<IUIState>
>({
  name: moduleName,
  initialState: {},
  reducers: {
    setNotification: (state, {payload}: PayloadAction<INotification>) => {
      payload.message && message[payload.type](payload.message);
    },
  },
});

export default uiSlice.reducer;

export const {setNotification} = uiSlice.actions;

/**
 * Middlewares
 */
export const uiMiddleware: TAppMiddleware = (store) => (next) => (action) => {
  next(action);

  if (action.type.includes('rejected') && action.payload) {
    message.error(action.payload);
  }
};

/**
 * Hooks
 */
export const useUIActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators({...uiSlice.actions}, dispatch),
    [dispatch]
  );
};
