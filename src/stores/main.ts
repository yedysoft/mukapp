import {BaseStore} from './base';
import {IInfo} from '../types/user';
import {IServer} from '../types/main';
import {IGroup} from '../types/chat';
import defaults from '../utils/defaults';

class MainStore extends BaseStore<MainStore> {
  infos: IInfo[] = [];
  servers: IServer[] = [];
  groups: IGroup[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MainStore.name, []);
  }

  getInfoById(id: string): IInfo {
    return this.infos.find(i => i.id === id) ?? defaults.info;
  }

  addOrUpdateInfo(info: IInfo) {
    const index = this.infos.findIndex(i => i.id === info.id);
    if (index === -1) {
      this.infos.push(info);
    } else {
      this.infos[index] = info;
    }
  }

  getServerById(id: string): IServer {
    return this.servers.find(i => i.id === id) ?? defaults.server;
  }

  addOrUpdateServer(server: IServer) {
    const index = this.servers.findIndex(i => i.id === server.id);
    if (index === -1) {
      this.servers.push(server);
    } else {
      this.servers[index] = server;
    }
  }

  getGroupById(id: string): IGroup {
    return this.groups.find(i => i.id === id) ?? defaults.group;
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
