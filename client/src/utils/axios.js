import axios from 'axios';

import {apiBaseUrl} from '@configs/api';

axios.defaults.baseURL = apiBaseUrl;

export default axios;