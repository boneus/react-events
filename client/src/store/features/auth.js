import {useMemo} from 'react';
import {
  createSlice,
  createAsyncThunk,
  bindActionCreators,
} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';

import {getUser} from '@apis/users';
import {setNotification} from './ui';
import {setEvents} from './events';

export const moduleName = 'AUTH';

const authSlice = createSlice({
  name: moduleName,
  initialState: {
    isAuthed: false,
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setIsAuthed: (state, {payload}) => {
      state.isAuthed = payload;
    },
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    setIsLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setError: (state, {payload}) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.error = null;
        state.user = payload;
        state.isAuthed = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, {payload}) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.error = null;
        state.isAuthed = false;
        state.user = {};
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, {payload}) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

export const {setIsAuthed, setUser, setIsLoading, setError} = authSlice.actions;

/**
 * Thunks
 */
export const login = createAsyncThunk(
  `${moduleName}/login`,
  async (credentials, {dispatch, rejectWithValue}) => {
    try {
      const response = await getUser(credentials);
      const authedUser = response.data[0];

      if (authedUser) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', authedUser.username);

        delete authedUser.password;
        dispatch(
          setNotification({type: 'success', message: 'Welcome!'}, moduleName)
        );

        return authedUser;
      } else {
        rejectWithValue('Invalid username or password');
      }
    } catch (e) {
      rejectWithValue('Server: Error while logging in');
    }
  }
);

export const logout = createAsyncThunk(
  `${moduleName}/logout`,
  async (_, {dispatch}) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');

    dispatch(
      setNotification({type: 'success', message: 'Goodbye!'}, moduleName)
    );
    dispatch(setEvents([]));
  }
);

/**
 * Hooks
 */
export const useAuthActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({...authSlice.actions, login, logout}, dispatch),
    [dispatch]
  );
};

export const useAuthSelector = () => {
  const auth = useSelector((state) => state.auth);
  return useMemo(() => auth, [auth]);
};
