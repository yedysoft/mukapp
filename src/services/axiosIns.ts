import axios from 'axios';
import {restUrl} from '../../config';
import {stores} from '../stores';

const axiosIns = axios.create({
  baseURL: restUrl,
  timeout: 5000,
});

axiosIns.interceptors.request.use(
  async (config: any) => {
    const token = stores.auth.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default axiosIns;
