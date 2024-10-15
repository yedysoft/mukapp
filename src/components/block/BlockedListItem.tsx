import useTheme from '../../hooks/useTheme';
import {View} from 'react-native';
import MukImage from '../../components/custom/MukImage';
import {responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import {observer} from 'mobx-react';
import {IBlockedUser} from '../../types/user';
import YedyIconButton from '../custom/YedyIconButton';
import {useStores} from '../../stores';
import YedyText from '../custom/YedyText';

type Props = {
  item: IBlockedUser;
  onIconPress: (id: string) => void;
};

export default observer(({item, onIconPress}: Props) => {
  const {colors} = useTheme();
  const {auth} = useStores();

  return (
    <MukListItem style={{alignItems: 'center', justifyContent: 'space-between'}} disabled>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(16)}}>
        <MukImage
          scale={1}
          source={
            item.image
              ? {uri: `${item.image.link}?token=${auth.getAuthToken}`}
              : require('../../../assets/adaptive-icon.png')
          }
        />
        <YedyText numberOfLines={1}>@{item.userName}</YedyText>
      </View>
      <YedyIconButton scale={0.4} icon={'circle'} color={colors.secondary} onPress={() => onIconPress(item.blockId)} />
    </MukListItem>
  );
});
