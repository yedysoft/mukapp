import {useTheme} from '../../hooks';
import {YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {IFollowUser} from '../../types/user';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';

type Props = {
  onPress?: (id: string) => void;
  friend: IFollowUser;
};

export default observer(({onPress, friend}: Props) => {
  const {colors} = useTheme();
  const {auth} = useStores();

  return (
    <YedyListItem
      onPress={() => onPress && onPress(friend.id)}
      style={{
        alignItems: 'center',
        backgroundColor: friend.selected ? colors.primary : colors.shadow,
        borderRadius: 16,
      }}
    >
      <YedyImage
        scale={0.6}
        style={{borderRadius: 100}}
        source={
          friend.image
            ? {uri: `${friend.image.link}?token=${auth.authToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View style={{gap: responsiveWidth(4)}}>
        <YedyText numberOfLines={1} type={'bold'} size={13} color={friend.selected ? colors.dark : colors.secondary}>
          {friend.name}
        </YedyText>
        <YedyText numberOfLines={1} size={11} color={friend.selected ? colors.dark : colors.secondary}>
          @{friend.userName}
        </YedyText>
      </View>
    </YedyListItem>
  );
});
