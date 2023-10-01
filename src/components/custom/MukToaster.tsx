import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useEffect, useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize} from '../../utils/Responsive';

export default function MukToaster() {
  const {colors} = useTheme();
  const [isToasterDisplayed, setIsToasterDisplayed] = useState(false);

  const userError = 'hata';
  useEffect(() => {
    if (userError !== null) {
      setIsToasterDisplayed(true);
      const intervalId = setInterval(function () {
        setIsToasterDisplayed(false);
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [userError]);

  return (
    <>
      {isToasterDisplayed &&
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
              }}
          >
              <Text style={{color: 'white', fontSize: responsiveSize(16)}}>{userError}</Text>
          </Animated.View>
      }
    </>
  );
}
