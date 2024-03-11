import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';
import {IMessage} from '../../types/chat';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  message: IMessage;
};

export default observer(({message}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const me = message.senderId === user.getInfo.id;
  const info = me ? user.getInfo : user.getInfosById(message.senderId);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: responsiveWidth(4),
        justifyContent: me ? 'flex-end' : 'flex-start',
      }}
    >
      <MukImage
        source={require('../../../assets/adaptive-icon.png')}
        scale={0.6}
        style={{
          display: me || message.type === 'Private' ? 'none' : undefined,
          backgroundColor: colors.bubble,
          borderRadius: 100,
          marginTop: responsiveWidth(8),
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          alignSelf: 'flex-start',
          backgroundColor: me ? colors.primary : 'rgb(54,54,54)',
          padding: responsiveWidth(12),
          maxWidth: responsiveWidth(240),
          borderRadius: 16,
          gap: responsiveWidth(4),
        }}
      >
        <Text style={{display: me ? 'none' : undefined, color: colors.light, textAlign: 'left', fontWeight: '800'}}>
          {info?.name} {info?.surname}
        </Text>
        <Text style={{color: colors.light, textAlign: 'left'}}>{message.content}</Text>
      </View>
    </View>
  );
});
