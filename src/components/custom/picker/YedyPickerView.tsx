import React, {ReactNode, useEffect, useRef} from 'react';
import {BackHandler, Keyboard, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import YedyIconButton from '../YedyIconButton';
import YedyPortal from '../portal/YedyPortal';
import {responsiveWidth} from '../../../utils/util';
import {useTheme} from '../../../hooks';
import {YedyIconName} from '../../../types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  buttonOnPress: () => void;
  buttonIcon: YedyIconName;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default ({children, visible, changeVisible, buttonOnPress, buttonIcon, onClear, style}: Props) => {
  const {colors} = useTheme();
  const event = useRef<NativeEventSubscription | null>(null);
  const insets = useSafeAreaInsets();

  const closeModal = () => {
    changeVisible(false);
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

  return (
    <YedyPortal>
      <View style={[{display: visible ? undefined : 'none'}, StyleSheet.absoluteFill]} onTouchStart={closeModal} />
      <View
        style={[
          {
            position: 'absolute',
            display: visible ? undefined : 'none',
            backgroundColor: colors.dialog,
            bottom: insets.bottom,
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
          }}
        >
          <YedyIconButton
            style={{
              backgroundColor: colors.error,
              borderRadius: 100,
              width: responsiveWidth(48),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={'delete'}
            color={colors.light}
            scale={0.5}
            onPress={onClear}
          />
          <YedyIconButton
            style={{
              backgroundColor: colors.primary,
              borderRadius: 100,
              width: responsiveWidth(48),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            icon={buttonIcon}
            color={colors.dark}
            scale={0.5}
            onPress={buttonOnPress}
          />
        </View>
      </View>
    </YedyPortal>
  );
};
