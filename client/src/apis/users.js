import axios from '@utils/axios';

export const getUsers = () => axios.get('users');
export const getUser = ({username, password}) => axios.get('users', {params: {username, password}});
