import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';
import {IInfo} from '../../types/user';
import {IMessage} from '../../types/chat';
import {useStores} from '../../stores';

type Props = {
  message: IMessage;
};

export default function ChatBubble({message}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const me = message.senderId === user.getInfo.id

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
          display: me ? 'none' : undefined,
          backgroundColor: colors.secondary,
          borderRadius: 100,
          marginTop: responsiveWidth(8),
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          alignSelf: 'flex-start',
          backgroundColor: me ? colors.primary : colors.secondary,
          padding: responsiveWidth(12),
          maxWidth: responsiveWidth(240),
          borderRadius: 16,
          gap: responsiveWidth(4),
        }}
      >
        <Text style={{display: me ? 'none' : undefined, color: colors.tertiary, textAlign: 'left'}}>
          {message?.senderId ?? '@eto'}
        </Text>
        <Text style={{color: me ? colors.secondary : colors.background, textAlign: 'left'}}>
          {message?.content ?? 'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet'}
        </Text>
      </View>
    </View>
  );
}
