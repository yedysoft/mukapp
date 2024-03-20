import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';

export default (id: string | null | undefined, doWork = true) => {
  const {main} = useStores();
  const {api} = useServices();
  const [info, setInfo] = useState(main.getInfoById(<string>id));
  const [toogle, setToogle] = useState<boolean>(false);

  useEffect(() => {
    if (id && doWork) {
      const i = main.getInfoById(id);
      if (i.id === 'default') {
        api.main.getInfoByIds([id]).catch(() => api.helper.sleep(500).then(() => setToogle(!toogle)));
      } else if (!api.helper.isEqual(i, info)) {
        setInfo(i);
      }
    }
  }, [toogle, main.infos, id, doWork]);

  return info;
};
