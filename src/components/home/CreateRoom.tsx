import MukFAB from '../../components/custom/MukFAB';
import React from 'react';
import {observer} from 'mobx-react';
import RoomConfigTooltip from '../tooltips/RoomConfigTooltip';
import {useStores} from '../../stores';

export default observer(() => {
  const {room} = useStores();

  return <>{!room.isLive ? <MukFAB tooltip={RoomConfigTooltip} /> : null}</>;
});
