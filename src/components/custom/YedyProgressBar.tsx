import {Animated, LayoutChangeEvent, StyleProp, View, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {useCallback, useEffect, useRef, useState} from 'react';

type Props = {
  progress: number;
  color?: string;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  fillStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export default ({progress, color, visible = true, style, fillStyle}: Props) => {
  const {colors} = useTheme();
  const {current: timer} = useRef<Animated.Value>(new Animated.Value(0));
  const {current: fade} = useRef<Animated.Value>(new Animated.Value(0));
  const [width, setWidth] = useState<number>(0);
  const [prevWidth, setPrevWidth] = useState<number>(0);

  const startAnimation = useCallback(() => {
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false,
    }).start();

    Animated.timing(timer, {
      duration: 200,
      toValue: progress ? progress : 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [fade, timer, progress]);

  const stopAnimation = useCallback(() => {
    Animated.timing(fade, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [fade]);

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [visible, startAnimation, stopAnimation]);

  useEffect(() => {
    if (visible && prevWidth === 0) {
      startAnimation();
    }
  }, [prevWidth, startAnimation, visible]);

  const onLayout = (event: LayoutChangeEvent) => {
    setPrevWidth(width);
    setWidth(event.nativeEvent.layout.width);
  };

  const tintColor = color ?? colors.primary;
  const trackTintColor = colors.outlineVariant;

  return (
    <View onLayout={onLayout}>
      <Animated.View style={[{height: 4, overflow: 'hidden', backgroundColor: trackTintColor, opacity: fade}, style]}>
        {width ? (
          <Animated.View
            style={[
              {
                flex: 1,
                width,
                backgroundColor: tintColor,
                transform: [
                  {
                    translateX: timer.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-1 * 0.5 * width, 0],
                    }),
                  },
                  {
                    scaleX: timer.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.0001, 1],
                    }),
                  },
                ],
              },
              fillStyle,
            ]}
          />
        ) : null}
      </Animated.View>
    </View>
  );
};
