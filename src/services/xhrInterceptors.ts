import {stores} from '../stores';
import {wsUrl} from '../../config';

const interceptXMLHttpRequest = () => {
  const open = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    open.call(this, method, url, async, user, password);
    if (url.startsWith(wsUrl) && stores.auth.authToken) {
      this.setRequestHeader('Authorization', `Bearer ${stores.auth.authToken}`);
    }
  };
};

interceptXMLHttpRequest();
