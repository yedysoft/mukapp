import {GestureResponderEvent, Pressable, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import React, {forwardRef, ReactNode, useImperativeHandle, useRef, useState} from 'react';
import defaults from '../../utils/defaults';
import {ModalScreenProps, Positions, TooltipScreenProps, YedyIconName} from '../../types';
import YedyIcon from './YedyIcon';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';

type Props = {
  style?: StyleProp<ViewStyle>;
  iconViewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  icon: YedyIconName;
  color?: string;
  scale?: number;
  badge?: number | string;
  onPress?: () => void;
  tooltip?: ({positions, visible, changeVisible, data}: TooltipScreenProps) => ReactNode;
  modal?: ({visible, changeVisible, data}: ModalScreenProps) => ReactNode;
  tooltipOrModalData?: any;
  disabled?: boolean;
  visible?: boolean;
  defaultBadge?: boolean;
  directionH?: 'ltr' | 'rtl';
  directionV?: 'ttb' | 'btt';
};

export type YedyIconButtonRef = {
  openModalOrTooltip: () => void;
};

export default forwardRef<YedyIconButtonRef, Props>(
  (
    {
      style,
      iconViewStyle,
      iconStyle,
      icon,
      color,
      scale = 1,
      badge,
      onPress,
      tooltip,
      modal,
      tooltipOrModalData,
      disabled,
      visible = true,
      defaultBadge,
      directionH,
      directionV,
    }: Props,
    ref,
  ) => {
    const {colors} = useTheme();

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
        style={[
          {
            display: visible ? undefined : 'none',
            borderRadius: 100,
            padding: responsiveWidth(4),
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
        onPressIn={handleOnLayout}
        onPress={handleOnPress}
        onLayout={handleOnLayout}
        disabled={disabled || (!tooltip && !modal && !onPress)}
      >
        <YedyIcon
          icon={icon ? icon : 'blank'}
          badge={badge}
          defaultBadge={defaultBadge}
          scale={scale}
          color={color ?? (tooltipVisible || modalVisible ? colors.primary : colors.secondary)}
          style={iconViewStyle}
          iconStyle={iconStyle}
          directionH={directionH}
          directionV={directionV}
        />
        {tooltip &&
          tooltipVisible &&
          tooltip({
            positions: positions,
            visible: tooltipVisible,
            changeVisible: tooltipChangeVisible,
            data: tooltipOrModalData,
          })}
        {modal &&
          modalVisible &&
          modal({visible: modalVisible, changeVisible: modalChangeVisible, data: tooltipOrModalData})}
      </Pressable>
    );
  },
);
