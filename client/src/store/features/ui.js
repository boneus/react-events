import {useMemo} from 'react';
import {createSlice, bindActionCreators} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {message} from 'antd';

const moduleName = 'UI';

const uiSlice = createSlice({
  name: moduleName,
  initialState: {},
  reducers: {
    setNotification: (state, {payload}) => {
      payload.message && message[payload.type](payload.message);
    },
  },
});

export default uiSlice.reducer;

export const {setNotification} = uiSlice.actions;

/**
 * Middlewares
 */
export const uiMiddleware =
  ({dispatch, getState}) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type.includes('setError') && action.payload) {
      message.error(action.payload);
    }
  };

/**
 * Hooks
 */
export const useUIActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({...uiSlice.actions}, dispatch),
    [dispatch]
  );
};
