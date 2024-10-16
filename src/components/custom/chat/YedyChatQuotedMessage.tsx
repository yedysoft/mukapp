import {useInfo, useTheme} from '../../../hooks';
import {responsiveWidth} from '../../../utils/util';
import {IQuotedMessage} from '../../../types/chat';
import {useStores} from '../../../stores';
import {observer} from 'mobx-react';
import {TouchableOpacity} from 'react-native';
import {useServices} from '../../../services';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import YedyText from '../YedyText';

type Props = {
  quotedMessage: IQuotedMessage | null | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default observer(({quotedMessage, onPress, style}: Props) => {
  const {colors} = useTheme();
  const {user} = useStores();
  const {api} = useServices();
  const me = quotedMessage?.senderId === user.getInfo.id;
  const i = useInfo(quotedMessage?.senderId, !me);
  const info = me ? user.getInfo : i;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'column',
          alignSelf: 'flex-start',
          padding: responsiveWidth(12),
          borderRadius: 16,
          gap: responsiveWidth(4),
          display: quotedMessage ? undefined : 'none',
          backgroundColor: api.helper.hexToRgba(colors.background, 0.5),
          width: '100%',
          marginBottom: responsiveWidth(4),
        },
        style,
      ]}
    >
      <YedyText numberOfLines={1} type={'bold'} color={api.helper.randomColor()}>
        {info.name}
      </YedyText>
      <YedyText numberOfLines={3}>{quotedMessage?.content}</YedyText>
    </TouchableOpacity>
  );
});
