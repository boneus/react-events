import {useMemo} from 'react';
import {
  createSlice,
  bindActionCreators,
  createAsyncThunk,
  SliceCaseReducers,
  Slice,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';

import {IUser, IEvent, TNewEvent} from '@models';
import {getUsers, getEventsByUser, addEvent} from '@apis';
import {TAppThunkApiConfig, useAppDispatch, useAppSelector} from '@store';
import {setNotification} from '@store/features/ui';

export const moduleName = 'EVENTS';

interface IEventsState {
  guests: IUser[];
  events: IEvent[];
  isLoading: boolean;
  error: string | null;
}

const eventsSlice: Slice<IEventsState> = createSlice<
  IEventsState,
  SliceCaseReducers<IEventsState>
>({
  name: moduleName,
  initialState: {
    guests: [],
    events: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setGuests: (state, {payload}: PayloadAction<IUser[]>) => {
      state.guests = payload;
    },
    setEvents: (state, {payload}: PayloadAction<IEvent[]>) => {
      state.events = payload;
    },
    setIsloading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, {payload}: PayloadAction<string | null>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuests.fulfilled, (state, {payload = []}) => {
        state.error = null;
        state.guests = payload;
        state.isLoading = false;
      })
      .addCase(fetchGuests.rejected, (state, {payload = null}) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, {payload = []}) => {
        state.error = null;
        state.events = payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.rejected, (state, {payload = null}) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(addUserEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserEvent.fulfilled, (state, {payload}) => {
        state.error = null;
        payload && state.events.push(payload);
        state.isLoading = false;
      })
      .addCase(addUserEvent.rejected, (state, {payload = null}) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export default eventsSlice.reducer;

export const {setGuests, setEvents, setIsloading, setError} =
  eventsSlice.actions;

/**
 * Thunks
 */
export const fetchGuests: AsyncThunk<
  IUser[] | undefined,
  void,
  TAppThunkApiConfig<IEventsState>
> = createAsyncThunk<
  IUser[] | undefined,
  void,
  TAppThunkApiConfig<IEventsState>
>(`${moduleName}/fetchGuests`, async (_, {rejectWithValue}) => {
  try {
    const response = await getUsers();
    return response.data;
  } catch (e) {
    return rejectWithValue('Server: Error while fetching guests');
  }
});

export const fetchEvents: AsyncThunk<
  IEvent[] | undefined,
  string,
  TAppThunkApiConfig<IEventsState>
> = createAsyncThunk<
  IEvent[] | undefined,
  string,
  TAppThunkApiConfig<IEventsState>
>(`${moduleName}/fetchEvents`, async (username, {rejectWithValue}) => {
  try {
    const response = await getEventsByUser(username);
    return response.data;
  } catch (e) {
    return rejectWithValue('Server: Error while fetching events');
  }
});

export const addUserEvent: AsyncThunk<
  IEvent | undefined,
  TNewEvent,
  TAppThunkApiConfig<IEventsState>
> = createAsyncThunk<
  IEvent | undefined,
  TNewEvent,
  TAppThunkApiConfig<IEventsState>
>(
  `${moduleName}/addUserEvent`,
  async (userEvent, {dispatch, rejectWithValue}) => {
    try {
      const response = await addEvent(userEvent);

      dispatch(
        setNotification({
          type: 'success',
          message: 'New event is successfully added',
          moduleName,
        })
      );

      return response.data;
    } catch (e) {
      return rejectWithValue('Server: Error while adding new event');
    }
  }
);

/**
 * Hooks
 */
export const useEventsActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...eventsSlice.actions,
          fetchGuests,
          fetchEvents,
          addUserEvent,
        },
        dispatch
      ),
    [dispatch]
  );
};

export const useEventsSelector: () => IEventsState = () => {
  const events = useAppSelector((state) => state.events);
  return useMemo(() => events, [events]);
};
