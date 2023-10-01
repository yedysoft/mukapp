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
        console.error('XMLHttpRequest hatası:', url);
      });

      this.addEventListener('load', () => {
        if (this.status === 401) {
          stores.auth.setMany({loggedIn: false, authToken: ''});
        } else if (this.status >= 400) {
          console.error('Başarısız XMLHttpRequest:', this.status, this.statusText, url);
        }
      });
    }
  };
};

interceptXMLHttpRequest();
