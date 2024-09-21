import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Portal, useTheme} from 'react-native-paper';
import {BackHandler, NativeEventSubscription, Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';
import {useRoute} from '@react-navigation/native';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';

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
    | 'right-bottom';
  style?: StyleProp<ViewStyle>;
};

export default observer(
  ({children, positions = defaults.positions, visible, changeVisible, anchor = 'auto', style}: Props) => {
    const {colors} = useTheme() as MukTheme;
    const ref = useRef<View>(null);
    const event = useRef<NativeEventSubscription | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{width: number; height: number}>({width: 0, height: 0});
    const styles = makeStyles(colors);
    const DEFAULT_PADDING = responsiveWidth(16);

    const route = useRoute();
    useEffect(() => {
      closeModal();
    }, [route]);

    const onLayout = () => {
      if (ref.current && visible) {
        ref.current.measure((_x, _y, width, height) => {
          setTooltipPosition({width: width, height: height});
        });
      }
    };

    const viewLocation = (): StyleProp<ViewStyle> => {
      if (anchor === 'auto') {
        return {
          top: positions.pageY + positions.height,
          left: positions.pageX + positions.width - tooltipPosition.width,
        };
      } else if (anchor === 'left-top') {
        return {
          top: positions.pageY - tooltipPosition.height + positions.height,
          left: positions.pageX - tooltipPosition.width + DEFAULT_PADDING,
        };
      } else if (anchor === 'left-bottom') {
        return {
          top: positions.pageY,
          left: positions.pageX - tooltipPosition.width + DEFAULT_PADDING,
        };
      } else if (anchor === 'right-top') {
        return {
          top: positions.pageY - tooltipPosition.height + positions.height,
          left: positions.pageX + positions.width + DEFAULT_PADDING,
        };
      } else if (anchor === 'right-bottom') {
        return {
          top: positions.pageY,
          left: positions.pageX + positions.width + DEFAULT_PADDING,
        };
      } else if (anchor === 'top-right') {
        return {
          top: positions.pageY - tooltipPosition.height + DEFAULT_PADDING,
          left: positions.pageX,
        };
      } else if (anchor === 'top-left') {
        return {
          top: positions.pageY - tooltipPosition.height + DEFAULT_PADDING,
          left: positions.pageX - tooltipPosition.width + positions.width,
        };
      } else if (anchor === 'bottom-right') {
        return {
          top: positions.pageY + positions.height + DEFAULT_PADDING,
          left: positions.pageX,
        };
      } else if (anchor === 'bottom-left') {
        return {
          top: positions.pageY + positions.height + DEFAULT_PADDING,
          left: positions.pageX + positions.width - tooltipPosition.width,
        };
      }
    };

    const closeModal = () => {
      changeVisible(false);
      return true;
    };

    useEffect(() => {
      if (visible) {
        event.current?.remove();
        event.current = BackHandler.addEventListener('hardwareBackPress', closeModal);
      } else {
        event.current?.remove();
      }
      return () => event.current?.remove();
    }, [visible]);

    const renderCheck = tooltipPosition.height === 0 && tooltipPosition.width === 0;

    return (
      <Portal>
        <View
          style={{
            display: visible ? undefined : 'none',
            backgroundColor: colors.background,
            opacity: renderCheck ? 0 : 0.25,
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
            },
            styles.shadow,
            style,
            viewLocation(),
          ]}
        >
          {children}
        </View>
      </Portal>
    );
  },
);

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
