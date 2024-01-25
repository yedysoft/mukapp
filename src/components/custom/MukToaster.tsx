import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {useServices} from '../../services';
import {Pressable} from 'react-native';
import {useStores} from '../../stores';
import {MukMessage, MukTheme} from '../../types';

type Props = {
  message: MukMessage;
  interval: number;
};

export default function MukToaster({message, interval}: Props) {
  const {colors} = useTheme<MukTheme>();
  const [visible, setVisible] = useState(true);
  const {api} = useServices();
  const {ui} = useStores();

  const close = () => {
    setVisible(false);
    ui.delMessage(message.id);
  };

  useEffect(() => {
    api.helper.sleep(interval, ui.id).then(close);
  }, []);

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        display: visible ? undefined : 'none',
        width: '90%',
        backgroundColor: colors[message.body.type.toLowerCase() as 'info' | 'error' | 'warning'],
        borderRadius: 16,
        zIndex: 1400,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        minHeight: responsiveWidth(60),
        maxHeight: responsiveWidth(96),
      }}
    >
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          padding: responsiveWidth(8),
          borderRadius: 16,
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            color: colors.text,
            fontSize: responsiveSize(16),
          }}
        >
          {message.body.message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
