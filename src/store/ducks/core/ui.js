import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';

import {message} from "antd"

export const moduleName = 'UI';

/**
 * Action types
 */
export const SET_NOTIFICATION = `${moduleName}/setNotification`;

/**
 * Middlewares
 */
export const uiMiddleware = ({dispatch, getState}) => next => action => {
  next(action)

  if (action.type.includes('setError') && action.payload) {
    message.error(action.payload)
  }
  if (action.type.includes('setNotification') && action.payload.message) {
    message[action.payload.type](action.payload.message)
  }
}

/**
 * Hooks
 */
export const useUIActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({setNotification}, dispatch),
    [dispatch]
  );
};

/**
 * Action creators
 */
export const setNotification = (payload, entity = '') => ({
  type: `[${entity}] ${SET_NOTIFICATION}`,
  payload,
  entity,
});


