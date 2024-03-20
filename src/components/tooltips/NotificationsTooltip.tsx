import NotificationList from '../notification/NotificationList';
import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';
import {useEffect} from 'react';
import {useServices} from '../../services';
import {useStores} from '../../stores';

export default function NotificationsTooltip({positions, visible, changeVisible}: TooltipScreenProps) {
  const {api} = useServices();
  const {ui} = useStores();

  useEffect(() => {
    visible && api.user.updateReaded();
  }, [visible]);

  return (
    <MukTooltip
      anchor={'bottom'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: ui.windowWidth * 0.6, height: ui.windowHeight * 0.3}}
    >
      <NotificationList compact />
    </MukTooltip>
  );
}
