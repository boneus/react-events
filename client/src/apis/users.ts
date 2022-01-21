import {AxiosResponse} from 'axios';

import {IUser, IUserCredentials} from '@models';
import axios from '@utils/axios';

export const getUsers: () => Promise<AxiosResponse<IUser[]>> = () =>
  axios.get<IUser[]>('users');
export const getUser: (
  credentials: IUserCredentials
) => Promise<AxiosResponse<IUser[]>> = ({username, password}) =>
  axios.get<IUser[]>('users', {params: {username, password}});
