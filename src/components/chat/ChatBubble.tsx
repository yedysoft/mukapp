import {Text, useTheme} from 'react-native-paper';
import {Animated, PanResponder, View} from 'react-native';
import {MukTheme} from '../../types';
import {getAnimatedValue, responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';
import {IMessage} from '../../types/chat';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import useInfo from '../../hooks/useInfo';
import {useServices} from '../../services';
import {ReactNode, useRef} from 'react';

type Props = {
  message: IMessage;
  quotedMessage?: ReactNode;
};

export default observer(({message, quotedMessage}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {user} = useStores();
  const {api} = useServices();
  const me = message.senderId === user.getInfo.id;
  const i = useInfo(message.senderId, !me);
  const info = me ? user.getInfo : i;
  const sended = !!message.id;
  const time = api.helper.formatDateTime(message.date.toString(), 'time');
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => sended,
      onPanResponderMove: (_e, gestureState) => {
        if ((!me && gestureState.dx > 0) || (me && gestureState.dx < 0)) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: () => {
        if (Math.abs(getAnimatedValue(translateX)) > 20) {
          user.set('quotedMessage', {id: message.id, senderId: message.senderId, content: message.content});
        }

        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const animatedStyles = {
    transform: [{translateX}],
  };

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          gap: responsiveWidth(4),
          justifyContent: me ? 'flex-end' : 'flex-start',
        },
        animatedStyles,
      ]}
      {...panResponder.panHandlers}
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
        {quotedMessage}
        <Text
          style={{
            display: me || message.type === 'Private' ? 'none' : undefined,
            color: colors.light,
            textAlign: 'left',
            fontWeight: '800',
          }}
        >
          {info.name} {info.surname}
        </Text>
        <Text style={{color: colors.light, textAlign: 'left'}}>{message.content}</Text>
        <Text
          style={{
            color: colors.light,
            textAlign: 'right',
            fontSize: 10,
            fontWeight: '300',
          }}
        >
          {time} {me ? (sended ? '✓' : '⏳') : ''}
        </Text>
      </View>
    </Animated.View>
  );
});
