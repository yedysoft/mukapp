import {GestureResponderEvent, Pressable, StyleProp, View, ViewStyle} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import defaults from '../../utils/defaults';
import {PopupKey, Positions} from '../../types';
import YedyIcon, {YedyIconProps} from './YedyIcon';
import {usePopupVisible, useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';

export type YedyIconButtonProps = YedyIconProps & {
  style?: StyleProp<ViewStyle>;
  iconViewStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  popup?: PopupKey;
  popupData?: any;
  disabled?: boolean;
  visible?: boolean;
};

export type YedyIconButtonRef = {
  openPopup: () => void;
};

export default forwardRef<YedyIconButtonRef, YedyIconButtonProps>(
  ({style, iconViewStyle, onPress, popup, popupData, disabled, visible = true, ...rest}: YedyIconButtonProps, ref) => {
    const {colors} = useTheme();
    const {ui} = useStores();

    // Popup için gerekenler
    const viewRef = useRef<View>(null);
    const positions = useRef<Positions>(defaults.positions);
    const popupVisible = usePopupVisible(popup);

    const handleOnLayout = () => {
      if (popup && viewRef.current) {
        viewRef.current.measure((_x, _y, width, height, pageX, pageY) => {
          if (
            width &&
            height &&
            pageX &&
            pageY &&
            (positions.current.width !== width ||
              positions.current.height !== height ||
              positions.current.pageX !== pageX ||
              positions.current.pageY !== pageY)
          ) {
            const bottom = pageY + height;
            const right = pageX + width;
            positions.current = {width, height, pageX, pageY, bottom, right};
            ui.sendPositionsPopup(popup, positions.current);
          }
        });
      }
    };

    const handleOnPress = (event: GestureResponderEvent) => {
      event.stopPropagation();
      openPopup();
      onPress && onPress();
    };

    const openPopup = () => {
      popup && ui.openPopup(popup, popupData);
    };

    useImperativeHandle(ref, () => ({
      openPopup,
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
        disabled={disabled || (!popup && !onPress)}
      >
        <YedyIcon
          {...rest}
          color={popupVisible ? colors.primary : rest.color ?? colors.secondary}
          style={iconViewStyle}
        />
      </Pressable>
    );
  },
);
