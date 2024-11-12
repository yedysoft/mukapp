import {useTheme} from '../../hooks';
import {View} from 'react-native';
import {YedyIconButton, YedyImage, YedyListItem, YedyText} from '../custom';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {IBlockedUser} from '../../types/user';
import {useStores} from '../../stores';

type Props = {
  item: IBlockedUser;
  onIconPress: (id: string) => void;
};

export default observer(({item, onIconPress}: Props) => {
  const {colors} = useTheme();
  const {auth} = useStores();

  return (
    <YedyListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <YedyImage
          scale={1}
          source={
            item.image
              ? {uri: `${item.image.link}?token=${auth.authToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
        />
        <YedyText numberOfLines={1}>@{item.userName}</YedyText>
      </View>
      <YedyIconButton scale={0.4} icon={'circle'} color={colors.secondary} onPress={() => onIconPress(item.blockId)} />
    </YedyListItem>
  );
});
