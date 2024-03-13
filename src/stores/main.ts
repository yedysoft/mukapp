import {BaseStore} from './base';
import {IInfo} from '../types/user';
import defaults from '../utils/defaults';
import {services} from '../services';
import {IServer} from '../types/main';
import {IGroup} from '../types/chat';

class MainStore extends BaseStore<MainStore> {
  infos: IInfo[] = [];
  servers: IServer[] = [];
  groups: IGroup[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MainStore.name, []);
  }

  getInfoById(id: string, auto = true): IInfo {
    const i = this.infos.find(i => i.id === id);
    if (i) {
      return i;
    } else {
      auto && services.api.main.getInfoByIds([id]);
      return defaults.info;
    }
  }

  addOrUpdateInfo(info: IInfo) {
    const index = this.infos.findIndex(i => i.id === info.id);
    if (index === -1) {
      this.infos.push(info);
    } else {
      this.infos[index] = info;
    }
  }

  getServerById(id: string, auto = true): IServer {
    const i = this.servers.find(i => i.id === id);
    if (i) {
      return i;
    } else {
      auto && services.api.main.getServerByIds([id]);
      return defaults.server;
    }
  }

  addOrUpdateServer(server: IServer) {
    const index = this.servers.findIndex(i => i.id === server.id);
    if (index === -1) {
      this.servers.push(server);
    } else {
      this.servers[index] = server;
    }
  }

  getGroupById(id: string, auto = true): IGroup {
    const i = this.groups.find(i => i.id === id);
    if (i) {
      return i;
    } else {
      auto && services.api.main.getGroupByIds([id]);
      return defaults.group;
    }
  }

  addOrUpdateGroup(group: IGroup) {
    const index = this.groups.findIndex(i => i.id === group.id);
    if (index === -1) {
      this.groups.push(group);
    } else {
      this.groups[index] = group;
    }
  }
}

const main = new MainStore();
export default main;
