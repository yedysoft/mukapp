import React, {ReactNode, useEffect, useRef} from 'react';
import {BackHandler, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import MukIconButton from './MukIconButton';
import {responsiveWidth} from '../../utils/util';
import {Portal, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';

type Props = {
  children: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  buttonOnPress?: () => void;
  buttonIcon?: string;
  style?: StyleProp<ViewStyle>;
};

export default ({children, visible, changeVisible, buttonOnPress, buttonIcon, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const event = useRef<NativeEventSubscription | null>(null);

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

  return (
    <Portal>
      <View style={[{display: visible ? undefined : 'none'}, StyleSheet.absoluteFill]} onTouchStart={closeModal} />
      <View
        style={[
          {
            position: 'absolute',
            display: visible ? undefined : 'none',
            backgroundColor: colors.dialog,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        {children}
        {buttonOnPress ? (
          <MukIconButton
            style={{
              alignSelf: 'flex-end',
              backgroundColor: colors.background,
              borderRadius: 100,
              width: responsiveWidth(48),
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: responsiveWidth(16),
              marginBottom: responsiveWidth(16),
            }}
            icon={buttonIcon}
            color={colors.primary}
            scale={0.5}
            onPress={buttonOnPress}
          />
        ) : undefined}
      </View>
    </Portal>
  );
};
