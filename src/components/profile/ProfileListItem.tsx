import {useTheme} from '../../hooks';
import {View} from 'react-native';
import {YedyIconButton, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {ISearchUser} from '../../types/user';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useStores} from '../../stores';

type Props = {
  item: ISearchUser;
  onIconPress: (id: string) => void;
  otherUser?: boolean;
};

export default observer(({item, onIconPress, otherUser}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation<MainStackNavProp>();
  const {auth} = useStores();

  return (
    <YedyListItem
      style={{alignItems: 'center', justifyContent: 'space-between'}}
      onPress={() => navigation.push('Profile', {userId: item.id})}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <YedyImage
          scale={0.7}
          source={
            item.image
              ? {uri: `${item.image.link}?token=${auth.authToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
        />
        <View style={{justifyContent: 'center', gap: responsiveWidth(4)}}>
          <YedyText numberOfLines={1} type={'bold'} size={13}>
            {item.name}
          </YedyText>
          <YedyText numberOfLines={1}>@{item.userName}</YedyText>
        </View>
      </View>
      <YedyIconButton
        scale={0.4}
        icon={'account-minus'}
        color={colors.secondary}
        style={{display: otherUser ? 'none' : 'flex'}}
        onPress={() => onIconPress(item.id)}
      />
    </YedyListItem>
  );
});
