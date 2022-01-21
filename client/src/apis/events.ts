import {AxiosResponse} from 'axios';

import {IEvent, TNewEvent} from '@models';
import axios from '@utils/axios';

export const getEventsByUser: (
  username: string
) => Promise<AxiosResponse<IEvent[]>> = (username) =>
  axios.get<IEvent[]>('events/by-user', {
    params: {user: username},
  });

export const addEvent: (event: TNewEvent) => Promise<AxiosResponse<IEvent>> = (
  event
) => axios.post<IEvent>('events', event);
