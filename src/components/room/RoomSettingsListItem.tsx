import {useTheme} from '../../hooks';
import {YedyListItem, YedyText} from '../custom';
import {observer} from 'mobx-react';

type Props = {
  setting?: any;
};

const RoomSettingsListItem = observer(({setting}: Props) => {
  const {colors} = useTheme();

  return (
    <YedyListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled={true}>
      <YedyText numberOfLines={1} size={16}>
        Test Setting
      </YedyText>
    </YedyListItem>
  );
});

export default RoomSettingsListItem;
