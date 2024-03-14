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
    this.makeObservableAndPersistable(this, MainStore.name, ['infos', 'servers', 'groups']);
  }

  getInfoById(id: string): IInfo {
    return this.infos.find(i => i.id === id) ?? defaults.info;
  }

  addOrUpdateInfos(infos: IInfo[]) {
    this.set('infos', [
      ...this.infos.map(a => infos.find(t => t.id === a.id) ?? a),
      ...infos.filter(t => !this.infos.some(a => a.id === t.id)),
    ]);
  }

  getServerById(id: string): IServer {
    return this.servers.find(i => i.id === id) ?? defaults.server;
  }

  addOrUpdateServers(servers: IServer[]) {
    this.set('servers', [
      ...this.servers.map(a => servers.find(t => t.id === a.id) ?? a),
      ...servers.filter(t => !this.servers.some(a => a.id === t.id)),
    ]);
  }

  getGroupById(id: string): IGroup {
    return this.groups.find(i => i.id === id) ?? defaults.group;
  }

  addOrUpdateGroups(groups: IGroup[]) {
    this.set('groups', [
      ...this.groups.map(a => groups.find(t => t.id === a.id) ?? a),
      ...groups.filter(t => !this.groups.some(a => a.id === t.id)),
    ]);
  }
}

const main = new MainStore();
export default main;
