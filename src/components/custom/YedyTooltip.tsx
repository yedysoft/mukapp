import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {useTheme} from '../../hooks';
import {BackHandler, Keyboard, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import defaults from '../../utils/defaults';
import {Dimensions, Positions} from '../../types';
import {responsiveWidth, shadowStyle} from '../../utils/util';
import YedyPortal from './portal/YedyPortal';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  shadow?: boolean;
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

export default ({
  children,
  positions = defaults.positions,
  visible,
  changeVisible,
  shadow = true,
  anchor = 'auto',
  style,
}: Props) => {
  const {colors} = useTheme();
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
  const DEFAULT_PADDING = responsiveWidth(12);
  const renderCheck = dimensions.height === 0 || dimensions.width === 0;

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

  const onLayout = () => {
    if (ref.current && visible) {
      ref.current.measure((_x, _y, width, height) => {
        if (width && height && (dimensions.width !== width || dimensions.height !== height)) {
          setDimensions({width, height});
        }
      });
    }
  };

  const closeModal = () => {
    changeVisible(false);
    Keyboard.dismiss();
    return true;
  };

  useFocusEffect(useCallback(() => closeModal, []));

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
        style={[
          {
            display: visible ? undefined : 'none',
            backgroundColor: colors.background,
            opacity: renderCheck ? 0 : 0.25,
          },
          StyleSheet.absoluteFill,
        ]}
        onTouchStart={closeModal}
      />
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
          },
          shadow ? shadowStyle() : {},
          viewLocation(),
          style,
        ]}
      >
        {children}
      </View>
    </YedyPortal>
  );
};
