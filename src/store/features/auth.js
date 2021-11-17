import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';

import {getUsers} from '@apis/users';
import {setNotification} from './ui';

export const moduleName = 'AUTH';

/**
 * Action types
 */
export const SET_IS_AUTHED = `${moduleName}/setIsAuthed`;
export const SET_USER = `${moduleName}/setUser`;
export const SET_IS_LOADING = `${moduleName}/setIsLoading`;
export const SET_ERROR = `${moduleName}/setError`;

/**
 * Reducer
 */
const initialState = {
  isAuthed: false,
  user: {},
  isLoading: false,
  error: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_IS_AUTHED:
      return {...state, isAuthed: payload};
    case SET_USER:
      return {...state, user: payload};
    case SET_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_ERROR:
      return {...state, error: payload};

    default:
      return state;
  }
};

/**
 * Hooks
 */
export const useAuthActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {setIsAuthed, setUser, setIsLoading, setError, login, logout},
        dispatch
      ),
    [dispatch]
  );
};

export const useAuthSelector = () => useSelector((state) => state.auth);

/**
 * Thunks
 */
export const login = ({username, password}) => (dispatch) => {
  dispatch(setIsLoading(true));

  setTimeout(async () => {
    try {
      const response = await getUsers();
      const authedUser = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (authedUser) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', authedUser.username);

        delete authedUser.password;
        dispatch(setError());
        dispatch(setUser(authedUser));
        dispatch(setIsAuthed(true));
        dispatch(setNotification({type: 'success', message: 'Welcome!'}, moduleName));
      } else {
        dispatch(setError('Invalid username or password'));
      }
    } catch (e) {
      dispatch(setError('Server: Error while logging in'));
    }

    dispatch(setIsLoading(false));
  }, 1000);
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');

  dispatch(setIsAuthed(false));
  dispatch(setUser({}));
  dispatch(setNotification({type: 'success', message: 'Goodbye!'}, moduleName));
};

/**
 * Action creators
 */
export const setIsAuthed = (isAuthed) => ({
  type: SET_IS_AUTHED,
  payload: isAuthed,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setIsLoading = (isloading) => ({
  type: SET_IS_LOADING,
  payload: isloading,
});

export const setError = (error = null) => ({
  type: SET_ERROR,
  payload: error,
});

