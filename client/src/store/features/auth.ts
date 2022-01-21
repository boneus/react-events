import {useMemo} from 'react';
import {
  createSlice,
  createAsyncThunk,
  bindActionCreators,
  Slice,
  PayloadAction,
  AsyncThunk,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import {IUser, IUserCredentials} from '@models';
import {getUser} from '@apis';
import {TAppThunkApiConfig, useAppDispatch, useAppSelector} from '@store';
import {setNotification} from '@store/features/ui';
import {setEvents} from '@store/features/events';

export const moduleName = 'AUTH';

interface IAuthState {
  isAuthed: boolean;
  user: IUser;
  isLoading: boolean;
  error: string | null;
}

const authSlice: Slice<IAuthState> = createSlice<
  IAuthState,
  SliceCaseReducers<IAuthState>
>({
  name: moduleName,
  initialState: {
    isAuthed: false,
    user: {} as IUser,
    isLoading: false,
    error: null,
  },
  reducers: {
    setIsAuthed: (state, {payload}: PayloadAction<boolean>) => {
      state.isAuthed = payload;
    },
    setUser: (state, {payload}: PayloadAction<IUser>) => {
      state.user = payload;
    },
    setIsLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, {payload = null}: PayloadAction<string | null>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, {payload = {}}) => {
        state.error = null;
        state.user = payload as IUser;
        state.isAuthed = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, {payload = null}) => {
        console.log('login rejected');
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.error = null;
        state.isAuthed = false;
        state.user = {} as IUser;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, {payload = null}) => {
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
export const login: AsyncThunk<
  IUser | undefined,
  IUserCredentials,
  TAppThunkApiConfig<IAuthState>
> = createAsyncThunk<
  IUser | undefined,
  IUserCredentials,
  TAppThunkApiConfig<IAuthState>
>(`${moduleName}/login`, async (credentials, {dispatch, rejectWithValue}) => {
  try {
    const response = await getUser(credentials);
    const authedUser = response.data[0];

    if (authedUser) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', authedUser.username);

      // delete authedUser.password;
      dispatch(
        setNotification({type: 'success', message: 'Welcome!', moduleName})
      );

      return authedUser;
    } else {
      return rejectWithValue('Invalid username or password');
    }
  } catch (e) {
    return rejectWithValue('Server: Error while logging in');
  }
});

export const logout: AsyncThunk<
  void,
  void,
  TAppThunkApiConfig<IAuthState>
> = createAsyncThunk<void, void, TAppThunkApiConfig<IAuthState>>(
  `${moduleName}/logout`,
  async (_, {dispatch}) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');

    dispatch(
      setNotification({type: 'success', message: 'Goodbye!', moduleName})
    );
    dispatch(setEvents([]));
  }
);

/**
 * Hooks
 */
export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () => bindActionCreators({...authSlice.actions, login, logout}, dispatch),
    [dispatch]
  );
};

export const useAuthSelector: () => IAuthState = () => {
  const auth = useAppSelector((state) => state.auth);
  return useMemo(() => auth, [auth]);
};
