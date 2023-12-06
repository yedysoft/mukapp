import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import MukIconButton from '../custom/MukIconButton';
import {observer} from 'mobx-react';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';

type Props = {
  item: ISearchUser;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
};

const ProfileListItem = observer(({item, onIconPress, otherUser}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();

  return (
    <MukListItem
      style={{alignItems: 'center', justifyContent: 'space-between'}}
      onPress={() => navigation.navigate('Profile', {userId: item.id})}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage scale={1} source={require('../../../assets/adaptive-icon.png')} />
        <View style={{justifyContent: 'center', gap: responsiveWidth(8)}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '400'}}>
            {item.name} {item.surname}
          </Text>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '300'}}>
            @{item.userName}
          </Text>
        </View>
      </View>
      <MukIconButton
        scale={0.4}
        icon={'user-minus'}
        color={colors.secondary}
        style={{display: otherUser ? 'none' : 'flex'}}
        onPress={() => onIconPress(item.id)}
      />
    </MukListItem>
  );
});

export default ProfileListItem;
