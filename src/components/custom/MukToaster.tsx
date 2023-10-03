import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useCallback, useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {services} from '../../services';
import {Pressable} from 'react-native';

type Props = {
  error: ErrorMessage;
  interval: number;
};

export default function MukToaster({error, interval}: Props) {
  const {colors} = useTheme();
  const [isToasterDisplayed, setIsToasterDisplayed] = useState(true);

  const showError = useCallback(async () => {
    setIsToasterDisplayed(true);
    await services.api.helper.sleep(interval);
    error.show = true;
  }, []);

  useEffect(() => {
    showError().then(() => setIsToasterDisplayed(false));
  }, []);

  return (
    <>
      {isToasterDisplayed && (
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
          <Pressable onPress={() => setIsToasterDisplayed(false)}>
            <Text numberOfLines={2} style={{color: colors.secondary, fontSize: responsiveSize(16)}}>{error.error.message}</Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
}
