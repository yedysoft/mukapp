import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useCallback, useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';
import {services} from '../../services';

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
            backgroundColor: '#c41c1c',
            position: 'absolute',
            padding: 20,
            alignItems: 'center',
            top: 50,
            left: 20,
            right: 20,
            borderRadius: 8,
            zIndex: 1400,
          }}
        >
          <Text style={{color: 'white', fontSize: responsiveSize(16)}}>{error.error.message}</Text>
        </Animated.View>
      )}
    </>
  );
}
