import {observer} from 'mobx-react';
import NotificationList from './/NotificationList';
import MukTooltip from '../custom/MukTooltip';

export const NotificationsTooltip = observer(({visible, changeVisible}: TooltipScreenProps) => {
  return (
    <>
      <MukTooltip visible={visible} changeVisible={changeVisible}>
        <NotificationList />
      </MukTooltip>
    </>
  );
});
