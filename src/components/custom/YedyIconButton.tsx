import {IconButton, useTheme} from 'react-native-paper';
import {responsiveScale, responsiveWidth} from '../../utils/util';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {GestureResponderEvent, Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from 'react';
import MukBadge from './MukBadge';
import defaults from '../../utils/defaults';
import {ModalScreenProps, MukTheme, Positions, TooltipScreenProps} from '../../types';

type Props = {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  icon?: IconSource;
  color?: string;
  scale?: number;
  badge?: number;
  onPress?: () => void;
  tooltip?: ({positions, visible, changeVisible, data}: TooltipScreenProps) => ReactNode;
  modal?: ({visible, changeVisible, data}: ModalScreenProps) => ReactNode;
  tooltipOrModalData?: any;
  disabled?: boolean;
  defaultBadge?: boolean;
};

export type YedyIconButtonRef = {
  openModalOrTooltip: () => void;
};

export default forwardRef<YedyIconButtonRef, Props>(
  (
    {
      style,
      iconStyle,
      icon,
      color,
      scale,
      badge,
      onPress,
      tooltip,
      modal,
      tooltipOrModalData,
      disabled,
      defaultBadge,
    }: Props,
    ref,
  ) => {
    const {colors} = useTheme<MukTheme>();

    // Tooltip ve Modal için gerekenler
    const viewRef = useRef<View>(null);
    const [positions, setPositions] = useState<Positions>(defaults.positions);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const tooltipChangeVisible = (open: boolean) => {
      setTooltipVisible(open);
    };

    const modalChangeVisible = (open: boolean) => {
      setModalVisible(open);
    };

    const handleOnLayout = () => {
      if (tooltip && viewRef.current) {
        viewRef.current.measure((_x, _y, width, height, pageX, pageY) => {
          if (
            width &&
            height &&
            pageX &&
            pageY &&
            (positions.width !== width ||
              positions.height !== height ||
              positions.pageX !== pageX ||
              positions.pageY !== pageY)
          ) {
            const bottom = pageY + height;
            const right = pageX + width;
            setPositions({width, height, pageX, pageY, bottom, right});
          }
        });
      }
    };

    const handleOnPress = (event: GestureResponderEvent) => {
      event.stopPropagation();
      tooltip && setTooltipVisible(!tooltipVisible);
      modal && modalChangeVisible(!modalVisible);
      onPress && onPress();
    };

    const openModalOrTooltip = () => {
      tooltip && setTooltipVisible(!tooltipVisible);
      modal && modalChangeVisible(!modalVisible);
    };

    useImperativeHandle(ref, () => ({
      openModalOrTooltip,
    }));

    return (
      <Pressable
        ref={viewRef}
        style={style}
        onPressIn={handleOnLayout}
        onPress={handleOnPress}
        onLayout={handleOnLayout}
        disabled={disabled || (!tooltip && !modal && !onPress)}
      >
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
          iconColor={color ?? (tooltipVisible || modalVisible ? colors.dark : colors.secondary)}
          style={[
            {
              backgroundColor: tooltipVisible || modalVisible ? colors.primary : 'transparent',
              margin: 0,
            },
            iconStyle,
          ]}
          size={responsiveScale(scale)}
        />
        {tooltip &&
          tooltip({
            positions: positions,
            visible: tooltipVisible,
            changeVisible: tooltipChangeVisible,
            data: tooltipOrModalData,
          })}
        {modal && modal({visible: modalVisible, changeVisible: modalChangeVisible, data: tooltipOrModalData})}
      </Pressable>
    );
  },
);
