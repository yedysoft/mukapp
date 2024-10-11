import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';
import MukIconButton from '../custom/MukIconButton';
import YedyText from '../custom/YedyText';

type Props = {
  item: ISearchUser;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
};

export default observer(({item, onIconPress, otherUser}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {auth} = useStores();

  return (
    <MukListItem
      style={{alignItems: 'center', justifyContent: 'space-between'}}
      onPress={() => navigation.push('Profile', {userId: item.id})}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage
          scale={1}
          source={
            item.image
              ? {uri: `${item.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
        />
        <View style={{justifyContent: 'center', gap: responsiveWidth(4)}}>
          <YedyText numberOfLines={1} fontType={'bold'} fontSize={16}>
            {item.name}
          </YedyText>
          <YedyText numberOfLines={1} fontSize={14}>
            @{item.userName}
          </YedyText>
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
