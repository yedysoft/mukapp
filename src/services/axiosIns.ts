import axios from 'axios';
import {restUrl} from '../../config';
import {MessageBody} from '../types';
import {stores} from '../stores';
import socket from './api/socket';

const axiosIns = axios.create({
  baseURL: restUrl,
  timeout: 60000,
});

axiosIns.interceptors.request.use(
  config => {
    const token = stores.auth.authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log('Request interceptor error', error);
    return Promise.reject(error);
  },
);

axiosIns.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {response, config} = error;
    if (response) {
      const {status, data} = response;

      if (status === 401) {
        const err: MessageBody = data;
        if (err) {
          stores.ui.addMessage(err);
        }
        socket.disconnect().then(() => {
          stores.auth.setMany({loggedIn: false, authToken: ''});
        });
      } else if (status === 500) {
        const err: MessageBody = data;
        console.log(config.url, err);
        if ([1012, 1013, 1014].includes(err.code)) {
          // Spotify yetkilendirmesi gerekiyor
          stores.media.set('authenticated', false);
        } else if (err.code === 1036) {
          // Spotify premium gerekiyor
          stores.media.set('spotifyPremiumNeeded', true);
        } else {
          stores.ui.addMessage(err);
        }
      } else if (status >= 400) {
        console.error(config.url, status, response.statusText, data);
      }
    } else {
      if (error.code === 'ECONNABORTED') {
        stores.ui.addError('İstek zaman aşımına uğradı', 408);
      } else {
        stores.ui.addError(error.message, 0);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosIns;
