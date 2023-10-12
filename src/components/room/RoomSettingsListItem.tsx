import {Text, useTheme} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import MukSwitch from '../custom/MukSwitch';

type Props = {
  setting?: any;
};

const RoomSettingsListItem = observer(({setting}: Props) => {
  const {colors} = useTheme();

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled={true}>
      <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400'}}>
        Test Setting
      </Text>
      <MukSwitch value={true} onValueChange={() => console.log('switched')} />
    </MukListItem>
  );
});

export default RoomSettingsListItem;
