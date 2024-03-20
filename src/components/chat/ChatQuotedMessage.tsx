import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import {IQuotedMessage} from '../../types/chat';
import {useStores} from '../../stores';
import useInfo from '../../hooks/useInfo';
import {observer} from 'mobx-react';
import {TouchableOpacity} from 'react-native';

type Props = {
  quotedMessage: IQuotedMessage | null | undefined;
  onPress?: () => void;
};

export default observer(({quotedMessage, onPress}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const me = quotedMessage?.senderId === user.getInfo.id;
  const i = useInfo(quotedMessage?.senderId, !me);
  const info = me ? user.getInfo : i;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: responsiveWidth(12),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        gap: responsiveWidth(4),
        display: quotedMessage ? undefined : 'none',
        backgroundColor: colors.bubble,
        width: '100%',
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: me ? colors.primary : colors.light,
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
