import {YedyFAB} from '../custom';
import React from 'react';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/util';

export default observer(() => {
  const {room} = useStores();

  return (
    <YedyFAB
      icon={'plus-thick'}
      visible={!room.isLive}
      popup={'createRoom'}
      style={{
        bottom: responsiveWidth(16),
        right: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    />
  );
});
