import {useStores} from '../stores';
import {useServices} from '../services';
import {useEffect, useState} from 'react';

export default (id: string) => {
  const {main} = useStores();
  const {api} = useServices();
  const [info, setInfo] = useState(main.getInfoById(id));
  const [toogle, setToogle] = useState<boolean>(false);

  useEffect(() => {
    const i = main.getInfoById(id);
    if (i.id === 'default') {
      api.main.getInfoByIds([id]).finally(() => setToogle(!toogle));
    } else {
      !api.helper.isEqual(i, info) && setInfo(i);
    }
  }, [toogle]);

  return info;
};
