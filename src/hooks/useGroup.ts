import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';
import {IGroup} from '../types/chat';

export default (id: string, doWork = true) => {
  const {main} = useStores();
  const {api} = useServices();
  const [group, setGroup] = useState(main.getGroupById(id));
  const [toogle, setToogle] = useState<boolean>(false);

  useEffect(() => {
    const g = main.getGroupById(id);
    if (g.id === 'default') {
      api.main
        .getGroupByIds([id])
        .then(() => setToogle(!toogle))
        .catch(() => api.helper.sleep(500).then(() => setToogle(!toogle)));
    } else if (!api.helper.isEqual(g, group)) {
      setGroup(g);
    }
  }, [toogle, id]);

  return !doWork || !id ? ({} as IGroup) : group;
};
