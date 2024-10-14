import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  BackHandler,
  Keyboard,
  NativeEventSubscription,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';
import {responsiveWidth} from '../../utils/util';
import YedyPortal from './YedyPortal';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  anchor?:
    | 'auto'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | 'on-top';
  style?: StyleProp<ViewStyle>;
};

export default ({children, positions = defaults.positions, visible, changeVisible, anchor = 'auto', style}: Props) => {
  const {colors} = useTheme() as MukTheme;
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [dimensions, setDimensions] = useState<{width: number; height: number}>({width: 0, height: 0});
  const styles = makeStyles(colors);
  const DEFAULT_PADDING = responsiveWidth(12);
  const renderCheck = dimensions.height === 0 && dimensions.width === 0;

  /*const route = useRoute();
  useEffect(() => {
    closeModal();
  }, [route]);*/

  const onLayout = () => {
    if (ref.current && visible) {
      ref.current.measure((_x, _y, width, height) => {
        if (width && height && (dimensions.width !== width || dimensions.height !== height)) {
          setDimensions({width, height});
        }
      });
    }
  };

  const viewLocation = (): StyleProp<ViewStyle> => {
    if (anchor === 'auto') {
      return {
        top: positions.bottom,
        left: positions.pageX + positions.width - dimensions.width,
      };
    } else if (anchor === 'left-top') {
      return {
        top: positions.bottom - dimensions.height,
        left: positions.pageX - dimensions.width + DEFAULT_PADDING,
      };
    } else if (anchor === 'left-bottom') {
      return {
        top: positions.pageY,
        left: positions.pageX - dimensions.width + DEFAULT_PADDING,
      };
    } else if (anchor === 'right-top') {
      return {
        top: positions.bottom - dimensions.height,
        left: positions.right + DEFAULT_PADDING,
      };
    } else if (anchor === 'right-bottom') {
      return {
        top: positions.pageY,
        left: positions.right + DEFAULT_PADDING,
      };
    } else if (anchor === 'top-right') {
      return {
        top: positions.pageY - dimensions.height - DEFAULT_PADDING,
        left: positions.pageX,
      };
    } else if (anchor === 'top-left') {
      return {
        top: positions.pageY - dimensions.height - DEFAULT_PADDING,
        left: positions.right - dimensions.width,
      };
    } else if (anchor === 'bottom-right') {
      return {
        top: positions.bottom + DEFAULT_PADDING,
        left: positions.pageX,
      };
    } else if (anchor === 'bottom-left') {
      return {
        top: positions.bottom + DEFAULT_PADDING,
        left: positions.right - dimensions.width,
      };
    } else if (anchor === 'on-top') {
      return {
        top: positions.bottom - dimensions.height,
        left: positions.right - dimensions.width,
      };
    }
  };

  const closeModal = () => {
    changeVisible(false);
    Keyboard.dismiss();
    return true;
  };

  useEffect(() => {
    if (visible) {
      Keyboard.dismiss();
      event.current?.remove();
      event.current = BackHandler.addEventListener('hardwareBackPress', closeModal);
    } else {
      event.current?.remove();
    }
    return () => event.current?.remove();
  }, [visible]);

  if (!visible) {
    return <></>;
  }

  return (
    <YedyPortal>
      <View
        style={{
          display: visible ? undefined : 'none',
          backgroundColor: colors.background,
          opacity: renderCheck ? 0 : 0.25,
          zIndex: 1398,
        }}
      >
        <Pressable style={{width: '100%', height: '100%'}} onPress={closeModal} />
      </View>
      <View
        ref={ref}
        onLayout={onLayout}
        style={[
          {
            position: 'absolute',
            display: visible ? undefined : 'none',
            borderRadius: 12,
            backgroundColor: colors.dialog,
            borderWidth: 0.5,
            borderColor: colors.backdrop,
            opacity: renderCheck ? 0 : 1,
            zIndex: 1399,
          },
          styles.shadow,
          style,
          viewLocation(),
        ]}
      >
        {children}
      </View>
    </YedyPortal>
  );
};

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.secondary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  });
