import {YedyFAB} from '../custom';
import React from 'react';
import {observer} from 'mobx-react';
import RoomConfigTooltip from '../tooltips/RoomConfigTooltip';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/util';

export default observer(() => {
  const {room} = useStores();

  return (
    <YedyFAB
      icon={'plus'}
      scale={0.55}
      visible={!room.isLive}
      tooltip={RoomConfigTooltip}
      style={{
        bottom: responsiveWidth(16),
        right: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    />
  );
});
