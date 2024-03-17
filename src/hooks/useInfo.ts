import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';
import {IInfo} from '../types/user';

export default (id: string, doWork = true) => {
  if (!doWork || !id) {
    return {} as IInfo;
  }
  const {main} = useStores();
  const {api} = useServices();
  const [info, setInfo] = useState(main.getInfoById(id));
  const [toogle, setToogle] = useState<boolean>(false);

  useEffect(() => {
    const i = main.getInfoById(id);
    if (i.id === 'default') {
      api.main
        .getInfoByIds([id])
        .then(() => setToogle(!toogle))
        .catch(() => api.helper.sleep(500).then(() => setToogle(!toogle)));
    } else if (!api.helper.isEqual(i, info)) {
      setInfo(i);
    }
    return () => console.log('useInfo', id, 'useEffectReturn');
  }, [toogle]);

  return info;
};
