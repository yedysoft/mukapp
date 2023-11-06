import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useCallback, useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useServices} from '../../services';
import {Pressable} from 'react-native';
import {useStores} from '../../stores';

type Props = {
  error: ErrorMessage;
  interval: number;
};

export default function MukToaster({error, interval}: Props) {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(true);
  const {api} = useServices();
  const {ui} = useStores();

  const showError = useCallback(async () => {
    await api.helper.sleep(interval);
  }, []);

  const close = () => {
    setVisible(false);
    ui.delError(error.id);
  };

  useEffect(() => {
    showError().then(close);
  }, []);

  return (
    <>
      {visible && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={{
            width: '90%',
            backgroundColor: colors.error,
            padding: responsiveWidth(16),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 8,
            zIndex: 1400,
            minHeight: responsiveWidth(60),
            maxHeight: responsiveWidth(96),
          }}
        >
          <Pressable onPress={close} style={{width: '100%', flex: 1}}>
            <Text numberOfLines={2} style={{color: colors.secondary, fontSize: responsiveSize(16)}}>
              {error.error.message}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}
