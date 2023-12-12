import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import {IBlockedUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import MukIconButton from '../custom/MukIconButton';

type Props = {
  item: IBlockedUser;
  onIconPress: (id: string) => void;
};

const BlockedListItem = observer(({item, onIconPress}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage scale={1} source={require('../../../assets/adaptive-icon.png')} />
        <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '300'}}>
          @{item.userName}
        </Text>
      </View>
      <MukIconButton scale={0.4} icon={'circle'} color={colors.secondary} onPress={() => onIconPress(item.blockId)} />
    </MukListItem>
  );
});

export default BlockedListItem;
