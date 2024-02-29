import NotificationList from '../notification/NotificationList';
import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';
import {useEffect} from 'react';
import {useServices} from '../../services';

export default function NotificationsTooltip({positions, visible, changeVisible}: TooltipScreenProps) {
  const {api} = useServices();

  useEffect(() => {
    visible && api.user.updateReaded();
  }, [visible]);

  return (
    <MukTooltip
      anchor={'bottom'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: 200, height: 200}}
    >
      <NotificationList compact />
    </MukTooltip>
  );
}
