import NotificationList from './/NotificationList';
import MukTooltip from '../custom/MukTooltip';
import {TooltipScreenProps} from '../../types';

export default function NotificationsTooltip({positions, visible, changeVisible}: TooltipScreenProps) {
  return (
    <MukTooltip positions={positions} visible={visible} changeVisible={changeVisible}>
      <NotificationList />
    </MukTooltip>
  );
}
