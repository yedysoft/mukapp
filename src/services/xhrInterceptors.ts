import {stores} from '../stores';
import {restUrl} from '../../config';

const interceptXMLHttpRequest = () => {
  const open = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    open.call(this, method, url, async, user, password);
    if (url.startsWith(restUrl)) {
      if (stores.auth.getAuthToken) {
        this.setRequestHeader('Authorization', `Bearer ${stores.auth.getAuthToken}`);
      }

      this.addEventListener('error', event => {
        console.error('XMLHttpRequest hatası:', event);
      });

      this.addEventListener('load', () => {
        if (this.status === 401) {
          stores.auth.setMany({loggedIn: false, authToken: ''});
        } else if (this.status >= 400) {
          console.error('Başarısız XMLHttpRequest:', this.status, this.statusText);
        }
      });
    }
  };
};

interceptXMLHttpRequest();
