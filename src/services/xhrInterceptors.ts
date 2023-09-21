import {stores} from '../stores';
import {restUrl} from '../../config';

const interceptXMLHttpRequest = () => {
  const open = XMLHttpRequest.prototype.open;

  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    open.call(this, method, url, async, user, password);
    if (url.startsWith(restUrl + '/ws') && stores.auth.authToken) {
      this.setRequestHeader('Authorization', `Bearer ${stores.auth.authToken}`);
    }
  };
};

interceptXMLHttpRequest();
