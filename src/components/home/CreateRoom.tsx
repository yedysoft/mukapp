import YedyFAB from '../custom/YedyFAB';
import React from 'react';
import {observer} from 'mobx-react';
import RoomConfigTooltip from '../tooltips/RoomConfigTooltip';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/util';

export default observer(() => {
  const {room} = useStores();

  return (
    <>
      {!room.isLive ? (
        <YedyFAB icon={'plus'} tooltip={RoomConfigTooltip} style={{bottom: responsiveWidth(16)}} />
      ) : null}
    </>
  );
});
