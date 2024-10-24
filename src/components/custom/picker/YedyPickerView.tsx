import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {BackHandler, Keyboard, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import YedyIconButton from '../YedyIconButton';
import YedyPortal from '../portal/YedyPortal';
import {responsiveWidth} from '../../../utils/util';
import {useTheme} from '../../../hooks';
import {YedyIconName} from '../../../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ChangeType = 'self' | 'other';

type Props = {
  children: ReactNode;
  buttonOnPress: () => void;
  buttonIcon: YedyIconName;
  onClear?: () => void;
  onChangeVisible?: (visible: boolean, type: ChangeType) => void;
  style?: StyleProp<ViewStyle>;
};

export type YedyPickerViewRef = {
  open: () => void;
  close: () => void;
};

export default forwardRef<YedyPickerViewRef, Props>(
  ({children, buttonOnPress, buttonIcon, onClear, onChangeVisible, style}: Props, ref) => {
    const {colors} = useTheme();
    const [visible, setVisible] = useState(false);
    const event = useRef<NativeEventSubscription | null>(null);
    const insets = useSafeAreaInsets();

    const changeVisible = (open: boolean, type: ChangeType = 'other') => {
      setVisible(open);
      onChangeVisible && onChangeVisible(open, type);
    };

    useEffect(() => {
      if (visible) {
        Keyboard.dismiss();
        event.current?.remove();
        event.current = BackHandler.addEventListener('hardwareBackPress', () => {
          changeVisible(false, 'self');
          return true;
        });
      } else {
        event.current?.remove();
      }
      return () => event.current?.remove();
    }, [visible]);

    useImperativeHandle(ref, () => ({
      open: () => changeVisible(true),
      close: () => changeVisible(false),
    }));

    return (
      <YedyPortal>
        <View
          style={[{display: visible ? undefined : 'none'}, StyleSheet.absoluteFill]}
          onTouchStart={() => changeVisible(false, 'self')}
        />
        <View
          style={[
            {
              position: 'absolute',
              display: visible ? undefined : 'none',
              backgroundColor: colors.dialog,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              flexDirection: 'column',
              flex: 1,
            },
            style,
          ]}
        >
          {children}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              paddingHorizontal: responsiveWidth(16),
              paddingBottom: insets.bottom + responsiveWidth(16),
            }}
          >
            <YedyIconButton
              style={{
                backgroundColor: colors.error,
                borderRadius: 100,
                width: responsiveWidth(36),
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              icon={'delete'}
              color={colors.light}
              scale={0.3}
              onPress={onClear}
            />
            <YedyIconButton
              style={{
                backgroundColor: colors.primary,
                borderRadius: 100,
                width: responsiveWidth(36),
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              icon={buttonIcon}
              color={colors.dark}
              scale={0.3}
              onPress={buttonOnPress}
            />
          </View>
        </View>
      </YedyPortal>
    );
  },
);
