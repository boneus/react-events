/**
 * Action types
 */
export const SET_IS_AUTHED = 'SET_IS_AUTHED';
export const SET_USER = 'SET_USER';

/**
 * Action creators
 */
export const setIsAuthed = (payload) => ({
  type: SET_IS_AUTHED,
  payload,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

/**
 * Reducer
 */
const initialState = {
  isAuthed: false,
  user: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_IS_AUTHED:
      return {...state, isAuthed: payload};

    default:
      return state;
  }
};
