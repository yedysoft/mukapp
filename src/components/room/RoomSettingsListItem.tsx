import useTheme from '../../hooks/useTheme';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import YedyText from '../custom/YedyText';

type Props = {
  setting?: any;
};

const RoomSettingsListItem = observer(({setting}: Props) => {
  const {colors} = useTheme();

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled={true}>
      <YedyText numberOfLines={1} fontSize={16}>
        Test Setting
      </YedyText>
    </MukListItem>
  );
});

export default RoomSettingsListItem;
