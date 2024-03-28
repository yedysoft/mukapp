import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import {IQuotedMessage} from '../../types/chat';
import {useStores} from '../../stores';
import useInfo from '../../hooks/useInfo';
import {observer} from 'mobx-react';
import {TouchableOpacity} from 'react-native';
import {useServices} from '../../services';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  quotedMessage: IQuotedMessage | null | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default observer(({quotedMessage, onPress, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
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
          backgroundColor: api.helper.hexToRgba(colors.background, 0.4),
          width: '100%',
          marginBottom: responsiveWidth(4),
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={{
          color: me ? colors.primary : api.helper.randomColor(),
          textAlign: 'left',
          fontWeight: '800',
        }}
      >
        {info.name} {info.surname}
      </Text>
      <Text numberOfLines={3} style={{color: colors.light, textAlign: 'left'}}>
        {quotedMessage?.content}
      </Text>
    </TouchableOpacity>
  );
});
