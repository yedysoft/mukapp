import {IconButton, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode, useRef, useState} from 'react';
import MukBadge from './MukBadge';
import defaults from '../../utils/defaults';
import {MukTheme, Positions, TooltipScreenProps} from '../../types';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon?: IconSource;
  color?: string;
  scale?: number;
  badge?: number;
  onPress?: () => void;
  tooltip?: ({positions, visible, changeVisible}: TooltipScreenProps) => ReactNode;
  disabled?: boolean;
  defaultBadge?: boolean;
};
export default function MukIconButton({
  style,
  icon,
  color,
  scale,
  badge,
  onPress,
  tooltip,
  disabled,
  defaultBadge,
}: Props) {
  const {colors} = useTheme<MukTheme>();

  // Tooltip için gerekenler
  const ref = useRef<View>(null);
  const [positions, setPositions] = useState<Positions>(defaults.positions);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const tooltipChangeVisible = (open: boolean) => {
    setTooltipVisible(open);
  };

  const onLayout = () => {
    if (tooltip && ref.current) {
      ref.current.measure((_x, _y, width, height, pageX, pageY) => {
        setPositions({width: width, height: height, pageX: pageX, pageY: pageY});
      });
    }
  };

  const onPressHandle = () => {
    setTooltipVisible(!tooltipVisible);
    onPress && onPress();
  };

  return (
    <Pressable ref={ref} onLayout={onLayout} style={style} onPress={onPressHandle}>
      <View
        style={{
          display: defaultBadge ? undefined : 'none',
          position: 'absolute',
          width: responsiveWidth(8),
          top: responsiveWidth(6),
          right: responsiveWidth(10),
          zIndex: 10,
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: colors.tertiary,
        }}
      />
      <MukBadge
        badge={badge}
        style={{
          position: 'absolute',
          top: responsiveWidth(24),
          right: responsiveWidth(12),
          flex: 1,
          flexDirection: 'row',
        }}
      />
      <IconButton
        disabled={disabled}
        icon={icon ? icon : 'blank'}
        iconColor={color ? color : colors.secondary}
        style={{margin: 0}}
        size={responsiveSize(scale ? 64 * scale : 64)}
      />
      {tooltip && tooltip({positions: positions, visible: tooltipVisible, changeVisible: tooltipChangeVisible})}
    </Pressable>
  );
}
