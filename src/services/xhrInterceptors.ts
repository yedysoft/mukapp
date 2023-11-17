import {stores} from '../stores';
import {restUrl} from '../../config';
import {MessageBody} from '../types';

const interceptXMLHttpRequest = () => {
  const open = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (
    method,
    url: string,
    async?: boolean | undefined,
    user?: string | null | undefined,
    password?: string | null | undefined,
  ) {
    open.call(this, method, url, async, user, password);
    if (url.startsWith(restUrl)) {
      if (stores.auth.getAuthToken) {
        this.setRequestHeader('Authorization', `Bearer ${stores.auth.getAuthToken}`);
      }

      this.addEventListener('error', () => {
        stores.ui.addError(this.responseText, this.status);
      });

      this.addEventListener('timeout', () => {
        stores.ui.addError('İstek zaman aşımına uğradı', this.status);
      });

      this.addEventListener('load', () => {
        if (this.status === 401) {
          stores.auth.setMany({loggedIn: false, authToken: ''});
        } else if (this.status === 500) {
          const err: MessageBody = JSON.parse(this.response);
          console.log(url, err);
          if (err) {
            // Spotify yetkilendirmesi gerekiyor
            if ([1012, 1013, 1014].includes(err.code)) {
              stores.media.set('authenticated', false);
            } else {
              stores.ui.addMessage(err);
            }
          }
        } else if (this.status >= 400) {
          console.error(url, this.status, this.statusText, this.response);
        }
      });
    }
  };
};

interceptXMLHttpRequest();
