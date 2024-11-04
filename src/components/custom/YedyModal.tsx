import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Keyboard, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import YedyPortal from './portal/YedyPortal';
import {useTheme} from '../../hooks';
import {shadowStyle} from '../../utils/util';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions} from '../../types';

type Props = {
  children: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default observer(({children, visible, changeVisible, shadow = true, style}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
  const renderCheck = dimensions.height === 0 || dimensions.width === 0;

  const onLayout = () => {
    if (ref.current && visible) {
      ref.current.measure((_x, _y, width, height) => {
        if (width !== dimensions.width || height !== dimensions.height) {
          setDimensions({width, height});
        }
      });
    }
  };

  const closeModal = () => {
    changeVisible(false);
    Keyboard.dismiss();
    return true;
  };

  useFocusEffect(useCallback(() => closeModal, []));

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

  if (!visible) {
    return <></>;
  }

  return (
    <YedyPortal>
      <View
        style={[
          {
            display: visible ? undefined : 'none',
            backgroundColor: colors.background,
            opacity: renderCheck ? 0 : 0.25,
          },
          StyleSheet.absoluteFill,
        ]}
        onTouchStart={closeModal}
      />
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
            width: ui.windowWidth * 0.8,
            marginHorizontal: (ui.windowWidth - dimensions.width) / 2,
            marginVertical: (ui.windowHeight - dimensions.height) / 2,
            opacity: renderCheck ? 0 : 1,
          },
          shadow ? shadowStyle() : {},
          style,
        ]}
      >
        {children}
      </View>
    </YedyPortal>
  );
});
