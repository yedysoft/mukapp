import useTheme from '../../hooks/useTheme';
import {responsiveWidth} from '../../utils/util';
import {IQuotedMessage} from '../../types/chat';
import {useStores} from '../../stores';
import useInfo from '../../hooks/useInfo';
import {observer} from 'mobx-react';
import {TouchableOpacity} from 'react-native';
import {useServices} from '../../services';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import YedyText from '../custom/YedyText';

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
      <YedyText
        numberOfLines={1}
        fontType={'bold'}
        style={{
          color: api.helper.randomColor(),
          textAlign: 'left',
        }}
      >
        {info.name}
      </YedyText>
      <YedyText numberOfLines={3} style={{textAlign: 'left'}}>
        {quotedMessage?.content}
      </YedyText>
    </TouchableOpacity>
  );
});
