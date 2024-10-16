import {YedyFAB} from '../custom';
import React from 'react';
import {observer} from 'mobx-react';
import RoomConfigTooltip from '../tooltips/RoomConfigTooltip';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/util';

export default observer(() => {
  const {room} = useStores();

  return (
    <YedyFAB icon={'plus'} visible={!room.isLive} tooltip={RoomConfigTooltip} style={{bottom: responsiveWidth(16)}} />
  );
});
