import {BaseStore} from './base';
import {IInfo} from '../types/user';
import {IGroup} from '../types/chat';
import defaults from '../utils/defaults';

class MainStore extends BaseStore<MainStore> {
  infos: IInfo[] = [];
  groups: IGroup[] = [];

  constructor() {
    super();
    this.makeObservableAndPersistable(this, MainStore.name, []);
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
