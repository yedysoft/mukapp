import {useInfo, useTheme} from '../../../hooks';
import {Animated, PanResponder, View} from 'react-native';
import {getAnimatedValue, responsiveWidth} from '../../../utils/util';
import YedyIcon from '../YedyIcon';
import YedyImage from '../image/YedyImage';
import YedyText from '../YedyText';
import {IMessage} from '../../../types/chat';
import {useStores} from '../../../stores';
import {observer} from 'mobx-react';
import {useServices} from '../../../services';
import {ReactNode, useRef} from 'react';

type Props = {
  message: IMessage;
  quotedMessage?: ReactNode;
};

export default observer(({message, quotedMessage}: Props) => {
  const {colors} = useTheme();
  const {user, auth} = useStores();
  const {api} = useServices();
  const me = message.senderId === user.getInfo.id;
  const i = useInfo(message.senderId, !me);
  const info = me ? user.getInfo : i;
  const sended = !!message.id;
  const time = api.helper.formatDateTime(message.date.toString(), 'time');
  const {current: translateX} = useRef(new Animated.Value(0));
  const MAX_SLIDE_WIDTH = 45;

  const {current: panResponder} = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => sended,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: (_e, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_e, gestureState) => {
        if ((!me && gestureState.dx > 0) || (me && gestureState.dx < 0)) {
          translateX.setValue(
            Math.abs(gestureState.dx) >= MAX_SLIDE_WIDTH
              ? gestureState.dx < 0
                ? -MAX_SLIDE_WIDTH
                : MAX_SLIDE_WIDTH
              : gestureState.dx,
          );
        }
      },
      onPanResponderRelease: () => {
        if (Math.abs(getAnimatedValue(translateX)) > MAX_SLIDE_WIDTH - 5) {
          user.set('quotedMessage', {id: message.id, senderId: message.senderId, content: message.content});
        }

        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    }),
  );

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
      <YedyIcon
        icon={'reply'}
        scale={0.5}
        style={[
          {padding: 0, position: 'absolute', alignSelf: 'center', transform: [{rotateY: me ? '180deg' : '0deg'}]},
          me ? {right: responsiveWidth(-44)} : {left: responsiveWidth(-44)},
        ]}
      />
      <YedyImage
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.getAuthToken}`}
            : require('../../../../assets/adaptive-icon.png')
        }
        scale={0.6}
        style={{
          display: me || message.type === 'PRIVATE' ? 'none' : undefined,
          backgroundColor: colors.bubble,
          borderRadius: 100,
          marginTop: responsiveWidth(8),
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          alignSelf: 'flex-start',
          backgroundColor: me ? colors.primary : colors.bubble,
          padding: responsiveWidth(12),
          maxWidth: responsiveWidth(240),
          borderRadius: 16,
          gap: responsiveWidth(4),
        }}
      >
        {quotedMessage}
        <YedyText visible={!me && message.type !== 'PRIVATE'} type={'bold'} color={api.helper.randomColor()}>
          {info.name}
        </YedyText>
        <YedyText color={me ? colors.background : colors.secondary}>{message.content}</YedyText>
        <YedyText size={10} color={me ? colors.background : colors.secondary} style={{textAlign: 'right'}}>
          {time} {me ? (sended ? '✓' : '⏳') : ''}
        </YedyText>
      </View>
    </Animated.View>
  );
});
