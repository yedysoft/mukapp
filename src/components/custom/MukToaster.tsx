import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useServices} from '../../services';
import {Pressable} from 'react-native';
import {useStores} from '../../stores';
import {ErrorMessage, MukTheme} from '../../types';

type Props = {
  error: ErrorMessage;
  interval: number;
};

export default function MukToaster({error, interval}: Props) {
  const {colors} = useTheme<MukTheme>();
  const [visible, setVisible] = useState(true);
  const {api} = useServices();
  const {ui} = useStores();

  const close = () => {
    setVisible(false);
    ui.delError(error.id);
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
        backgroundColor: colors[error.error.type ?? 'error'],
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
          {error.error.message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
