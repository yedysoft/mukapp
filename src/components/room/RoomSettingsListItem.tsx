import {useTheme} from 'react-native-paper';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import MukSwitch from '../custom/MukSwitch';
import {MukTheme} from 'src/types';
import YedyText from '../custom/YedyText';

type Props = {
  setting?: any;
};

const RoomSettingsListItem = observer(({setting}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled={true}>
      <YedyText numberOfLines={1} fontSize={16}>
        Test Setting
      </YedyText>
      <MukSwitch value={true} onValueChange={() => console.log('switched')} />
    </MukListItem>
  );
});

export default RoomSettingsListItem;
