import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {BackHandler, NativeEventSubscription, Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {MukColors, MukTheme} from '../../types';
import YedyPortal from './YedyPortal';
import {useTheme} from 'react-native-paper';

type Props = {
  children: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export default observer(({children, visible, changeVisible, style}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();
  const styles = makeStyles(colors);
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [modalPosition, setModalPosition] = useState<{width: number; height: number}>({width: 0, height: 0});
  const renderCheck = modalPosition.height === 0 && modalPosition.width === 0;

  const route = useRoute();
  useEffect(() => {
    closeModal();
  }, [route]);

  const onLayout = () => {
    if (ref.current && visible) {
      ref.current.measure((_x, _y, width, height) => {
        if (width) {
          setModalPosition({width, height});
        }
      });
    }
  };

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
    <YedyPortal>
      <View
        style={{
          display: visible ? undefined : 'none',
          backgroundColor: colors.background,
          opacity: renderCheck ? 0 : 0.25,
        }}
      >
        <Pressable style={{width: '100%', height: '100%'}} onPress={closeModal} />
      </View>
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
            marginHorizontal: (ui.windowWidth - modalPosition.width) / 2,
            marginVertical: (ui.windowHeight - modalPosition.height) / 2,
            opacity: renderCheck ? 0 : 1,
          },
          styles.shadow,
          style,
        ]}
      >
        {children}
      </View>
    </YedyPortal>
  );
});

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
