import axios from 'axios';
import {restUrl} from '../../config';
import {MessageBody} from '../types';
import {stores} from '../stores';
import socket from './api/socket';
import defaults from '../utils/defaults';
import {openDialog} from '../components/stacks/DialogStack';

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
          stores.auth.setMany({loggedIn: false, isNeededPassChange: false, authToken: ''});
          stores.user.setMany({notifications: [], chats: [], info: defaults.info});
          stores.room.setMany({config: defaults.config, sessionId: null, streamerId: null, chat: []});
          stores.media.setMany({playingTrack: defaults.playingTrack, queue: [], playlists: [], searchValue: ''});
        });
      } else if (status === 500) {
        const err: MessageBody = data;
        console.log(config.url, err);
        if ([1012, 1013, 1014].includes(err.code)) {
          // Spotify yetkilendirmesi gerekiyor
          openDialog('spotifyAuthNeeded');
        } else if (err.code === 1036) {
          // Spotify premium gerekiyor
          openDialog('spotifyPremiumNeeded');
        } else {
          stores.ui.addMessage(err);
        }
      } else if (status >= 400) {
        console.error(config.url, status, response.statusText, data);
      }
    } else {
      console.log(config.url);
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
