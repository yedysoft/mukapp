import {stores} from '../stores';
import {restUrl} from '../../config';

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
        stores.ui.addErrors({code: this.status, message: this.responseText});
      });

      this.addEventListener('timeout', () => {
        stores.ui.addErrors({code: this.status, message: this.responseText});
      });

      this.addEventListener('load', () => {
        if (this.status === 401) {
          stores.auth.setMany({loggedIn: false, authToken: ''});
        } else if (this.status === 500) {
          const err: ErrorBody = JSON.parse(this.response);
          if (err) {
            // Spotify yetkilendirmesi gerekiyor
            if ([1012, 1013, 1014].includes(err.code)) {
              stores.media.set('authenticated', false);
            } else {
              stores.ui.addErrors(err);
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
