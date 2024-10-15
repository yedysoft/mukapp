import useTheme from '../../hooks/useTheme';
import {Animated, PanResponder, View} from 'react-native';
import {getAnimatedValue, responsiveWidth} from '../../utils/util';
import MukImage from '../custom/MukImage';
import {IMessage} from '../../types/chat';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import useInfo from '../../hooks/useInfo';
import {useServices} from '../../services';
import {ReactNode, useRef} from 'react';
import YedyIcon from '../custom/YedyIcon';
import YedyText from '../custom/YedyText';

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
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => sended,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy === 0;
    },
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
  });

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
        color={colors.secondary}
        style={[
          {padding: 0, position: 'absolute', alignSelf: 'center', transform: [{rotateY: me ? '180deg' : '0deg'}]},
          me ? {right: responsiveWidth(-44)} : {left: responsiveWidth(-44)},
        ]}
      />
      <MukImage
        source={
          info.image
            ? {uri: `${info.image.link}?token=${auth.getAuthToken}`}
            : require('../../../assets/adaptive-icon.png')
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
        <YedyText
          visible={!me && message.type !== 'PRIVATE'}
          fontType={'bold'}
          style={{
            color: api.helper.randomColor(),
            textAlign: 'left',
          }}
        >
          {info.name}
        </YedyText>
        <YedyText style={{color: me ? colors.background : colors.secondary, textAlign: 'left'}}>
          {message.content}
        </YedyText>
        <YedyText
          fontSize={10}
          style={{
            color: me ? colors.background : colors.secondary,
            textAlign: 'right',
          }}
        >
          {time} {me ? (sended ? '✓' : '⏳') : ''}
        </YedyText>
      </View>
    </Animated.View>
  );
});
