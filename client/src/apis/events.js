import axios from '@utils/axios';

export const getEventsByUser = ({username}) => axios.get('events', {params: {author: username, guest: username}});
export const addEvent = (event) => axios.post('events', event);
