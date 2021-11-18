import axios from '@utils/axios';

export const getEventsByUser = ({username}) => axios.get('events/by-user', {
  params: {user: username}
});
export const addEvent = (event) => axios.post('events', event);
