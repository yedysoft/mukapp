import {Portal, useTheme} from 'react-native-paper';
import {Animated, PanResponder, Platform, StyleProp, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';
import {ReactNode, useEffect, useRef} from 'react';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';

type Props = {
  style?: StyleProp<ViewStyle>;
  visible: boolean;
  setVisible: (a: boolean) => void;
  children?: ReactNode;
};
const MukBottomSheet = observer(({style, visible, setVisible, children}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const BOTTOM_SHEET_MAX_HEIGHT = ui.screenHeight * 0.6;
  const BOTTOM_SHEET_MIN_HEIGHT = 0;
  const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
  const MAX_DOWNWARD_TRANSLATE_Y = 0;
  const DRAG_THRESHOLD = 50;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        }

        if (gesture.dy > 0) {
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    console.log('direction', direction);
    setVisible(direction === 'up');
    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    visible ? springAnimation('up') : springAnimation('down');
  }, [visible]);

  return (
    <Portal>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            flex: 1,
            bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
            ...Platform.select({
              android: {elevation: 3},
              ios: {
                shadowColor: colors.shadow,
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
              },
            }),
            backgroundColor: '#051517',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
          bottomSheetAnimation,
        ]}
      >
        <View
          style={{
            width: 132,
            height: 32,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              width: 100,
              height: 6,
              backgroundColor: colors.primary,
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={[{flex: 1, flexDirection: 'column', padding: responsiveWidth(20), gap: responsiveWidth(24)}, style]}
        >
          {children}
        </View>
      </Animated.View>
    </Portal>
  );
});

export default MukBottomSheet;
