import React, {ReactNode, useRef, useState} from 'react';
import {Portal, useTheme} from 'react-native-paper';
import {screenHeight, screenWidth} from '../../utils/util';
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

export default function MukTooltip({
  children,
  positions = defaults.positions,
  visible,
  changeVisible,
  anchor = 'auto',
  style,
}: Props) {
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
      return {top: positions.pageY + positions.height, left: positions.pageX + positions.width - tooltipPosition.width};
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
      return {top: positions.pageY + positions.height, left: positions.pageX + positions.width - tooltipPosition.width};
    }
  };

  console.log('MukTooltipRender', visible, positions, tooltipPosition);

  return (
    <Portal>
      <Pressable
        onPress={() => changeVisible(false)}
        style={{
          display: visible ? undefined : 'none',
          backgroundColor: 'rgba(255,0,0,0.3)', //colors.backdrop,
          width: screenWidth,
          height: screenHeight,
        }}
      >
        <View
          ref={ref}
          onLayout={onLayout}
          style={[
            {
              borderRadius: 16,
              backgroundColor: 'rgba(0,81,255,0.8)', //colors.background,
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
      </Pressable>
    </Portal>
  );
}

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  });
