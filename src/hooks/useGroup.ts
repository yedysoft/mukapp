import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';

export default (id: string | null | undefined, doWork = true) => {
  const {main} = useStores();
  const {api} = useServices();
  const [group, setGroup] = useState(main.getGroupById(<string>id));
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (id && doWork) {
      const g = main.getGroupById(id);
      if (g.id === 'default') {
        api.main.getGroupByIds([id]).catch(() => api.helper.sleep(500).then(() => setToggle(!toggle)));
      } else if (!api.helper.isEqual(g, group)) {
        setGroup(g);
      }
    }
  }, [toggle, main.groups, id, doWork]);

  return group;
};
