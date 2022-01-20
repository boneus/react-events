import {useMemo} from 'react';
import {
  createSlice,
  bindActionCreators,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';

import {getUsers} from '@apis/users';
import {getEventsByUser, addEvent} from '@apis/events';
import {setNotification} from './ui';

export const moduleName = 'EVENTS';

const eventsSlice = createSlice({
  name: moduleName,
  initialState: {
    guests: [],
    events: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setGuests: (state, {payload}) => {
      state.guests = payload;
    },
    setEvents: (state, {payload}) => {
      state.events = payload;
    },
    setIsloading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setError: (state, {payload}) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGuests.fulfilled, (state, {payload}) => {
        state.error = null;
        state.guests = payload;
        state.isLoading = false;
      })
      .addCase(fetchGuests.rejected, (state, {payload}) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, {payload}) => {
        state.error = null;
        state.events = payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.rejected, (state, {payload}) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(addUserEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserEvent.fulfilled, (state, {payload}) => {
        state.error = null;
        state.events.push(payload);
        state.isLoading = false;
      })
      .addCase(addUserEvent.rejected, (state, {payload}) => {
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
export const fetchGuests = createAsyncThunk(
  `${moduleName}/fetchGuests`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (e) {
      rejectWithValue('Server: Error while fetching guests');
    }
  }
);

export const fetchEvents = createAsyncThunk(
  `${moduleName}/fetchEvents`,
  async (username, {rejectWithValue}) => {
    try {
      const response = await getEventsByUser({username});
      return response.data;
    } catch (e) {
      rejectWithValue('Server: Error while fetching events');
    }
  }
);

export const addUserEvent = createAsyncThunk(
  `${moduleName}/addUserEvent`,
  async (userEvent, {dispatch, getState, rejectWithValue}) => {
    try {
      const response = await addEvent(userEvent);

      dispatch(
        setNotification(
          {type: 'success', message: 'New event is successfully added'},
          moduleName
        )
      );

      return response.data;
    } catch (e) {
      rejectWithValue('Server: Error while adding new event');
    }
  }
);

/**
 * Hooks
 */
export const useEventsActions = () => {
  const dispatch = useDispatch();
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

export const useEventsSelector = () => {
  const events = useSelector((state) => state.events);
  return useMemo(() => events, [events]);
};
