import {useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {IFollowUser} from '../../types/user';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import YedyText from '../custom/YedyText';

type Props = {
  onPress?: (id: string) => void;
  friend: IFollowUser;
};

export default observer(({onPress, friend}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {auth} = useStores();

  return (
    <MukListItem
      onPress={() => onPress && onPress(friend.id)}
      style={{
        alignItems: 'center',
        backgroundColor: friend.selected ? colors.primary : colors.shadow,
        borderRadius: 16,
      }}
    >
      <MukImage
        scale={1}
        style={{borderRadius: 100}}
        source={
          friend.image
            ? {uri: `${friend.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
        }
      />
      <View style={{gap: responsiveWidth(4)}}>
        <YedyText
          numberOfLines={1}
          fontType={'bold'}
          fontSize={16}
          style={{color: friend.selected ? colors.dark : colors.secondary}}
        >
          {friend.name}
        </YedyText>
        <YedyText numberOfLines={1} fontSize={14} style={{color: friend.selected ? colors.dark : colors.secondary}}>
          @{friend.userName}
        </YedyText>
      </View>
    </MukListItem>
  );
});
