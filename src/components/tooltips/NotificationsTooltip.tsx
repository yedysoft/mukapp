import NotificationList from '../notification/NotificationList';
import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';

export default function NotificationsTooltip({positions, visible, changeVisible}: TooltipScreenProps) {
  return (
    <MukTooltip
      anchor={'bottom'}
      positions={positions}
      visible={visible}
      changeVisible={changeVisible}
      style={{width: 200, height: 200}}
    >
      <NotificationList />
    </MukTooltip>
  );
}
