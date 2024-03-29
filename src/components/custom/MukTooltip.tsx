import React, {ReactNode, useRef, useState} from 'react';
import {Portal, useTheme} from 'react-native-paper';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import defaults from '../../utils/defaults';
import {MukColors, MukTheme, Positions} from '../../types';

type Props = {
  children: ReactNode;
  positions: Positions;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  anchor?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  style?: StyleProp<ViewStyle>;
};

export default ({children, positions = defaults.positions, visible, changeVisible, anchor = 'auto', style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const ref = useRef<View>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{width: number; height: number}>({width: 0, height: 0});
  const styles = makeStyles(colors);

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
    }
    if (anchor === 'left') {
      return {top: positions.pageY, left: positions.pageX - tooltipPosition.width};
    }
    if (anchor === 'right') {
      return {top: positions.pageY, left: positions.pageX + positions.width};
    }
    if (anchor === 'top') {
      return {top: positions.pageY - tooltipPosition.height, left: positions.pageX};
    }
    if (anchor === 'bottom') {
      return {
        top: positions.pageY + positions.height,
        left: positions.pageX + positions.width - tooltipPosition.width,
      };
    }
  };

  console.log('MukTooltipRender', visible, positions, tooltipPosition);

  return (
    <Portal>
      <View
        style={{
          display: visible ? undefined : 'none',
          backgroundColor: colors.background,
          opacity: 0.5,
        }}
      >
        <Pressable style={{width: '100%', height: '100%'}} onPress={() => changeVisible(false)} />
      </View>
      <View
        ref={ref}
        onLayout={onLayout}
        style={[
          {
            position: 'absolute',
            display: visible ? undefined : 'none',
            borderRadius: 16,
            backgroundColor: colors.dialog,
            borderWidth: 0.5,
            borderColor: colors.backdrop,
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
