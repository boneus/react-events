import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';

import {getUsers} from '@apis/users';
import {setNotification} from './ui';

export const moduleName = 'EVENTS';

/**
 * Action types
 */
export const SET_GUESTS = `${moduleName}/setGuests`;
export const SET_EVENTS = `${moduleName}/setEvents`;
export const SET_IS_LOADING = `${moduleName}/setIsLoading`;
export const SET_ERROR = `${moduleName}/setError`;

/**
 * Reducer
 */
const initialState = {
  guests: [],
  events: [],
  isLoading: false,
  error: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case SET_GUESTS:
      return {...state, guests: payload};
    case SET_EVENTS:
      return {...state, events: payload};
    case SET_IS_LOADING:
      return {...state, isLoading: payload};
    case SET_ERROR:
      return {...state, error: payload};

    default:
      return state;
  }
}

/**
 * Hooks
 */
export const useEventsActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({
      setGuests,
      setEvents,
      setIsLoading,
      setError,
      fetchGuests,
      fetchEvents,
      addEvent
    }, dispatch),
    [dispatch]
  );
};

export const useEventsSelector = () => useSelector((state) => state.events);

/**
 * Thunks
 */
export const fetchGuests = () => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const response = await getUsers();

    dispatch(setError());
    dispatch(setGuests(response.data));
  } catch (e) {
    dispatch(setError('Server: Error while fetching guests'));
  }

  dispatch(setIsLoading(false));
};

export const fetchEvents = (username) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const userEvents = events.filter((event) => event.author === username || event.guest === username);

    dispatch(setError());
    dispatch(setEvents(userEvents));
  } catch (e) {
    dispatch(setError('Server: Error while fetching events'));
  }

  dispatch(setIsLoading(false));
};

export const addEvent = (userEvent) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(userEvent);

    localStorage.setItem('events', JSON.stringify(events));

    const userEvents = events.filter((event) => event.author === userEvent.author || event.guest === userEvent.author);

    dispatch(setError());
    dispatch(setEvents(userEvents));
    dispatch(setNotification({type: 'success', message: 'New event is successfully added'}, moduleName));
  } catch (e) {
    dispatch(setError('Server: Error while adding new event'));
  }

  dispatch(setIsLoading(false));
};

/**
 * Action creators
 */
export const setGuests = (guests) => ({
  type: SET_GUESTS,
  payload: guests
});

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: events
});

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const setError = (error = null) => ({
  type: SET_ERROR,
  payload: error
});


