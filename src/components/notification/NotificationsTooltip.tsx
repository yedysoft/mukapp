import NotificationList from './/NotificationList';
import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';

export default function NotificationsTooltip({positions, visible, changeVisible}: TooltipScreenProps) {
  return (
    <MukTooltip
      anchor={'top'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: 200, height: 200}}
    >
      <NotificationList />
    </MukTooltip>
  );
}
