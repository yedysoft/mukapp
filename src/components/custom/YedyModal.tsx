import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Keyboard, NativeEventSubscription, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import YedyPortal from './portal/YedyPortal';
import {useTheme} from '../../hooks';
import {responsiveWidth, shadowStyle} from '../../utils/util';
import {useFocusEffect} from '@react-navigation/native';
import {Dimensions} from '../../types';
import YedyIconButton from './YedyIconButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import YedyText from './YedyText';

type Props = {
  children: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  title?: string;
  fullscreen?: boolean;
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default observer(({children, visible, changeVisible, title, fullscreen, shadow = true, style}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();
  const insets = useSafeAreaInsets();
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
  const renderCheck = (dimensions.height === 0 || dimensions.width === 0) && !fullscreen;

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
      {!fullscreen && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            display: visible ? undefined : 'none',
            backgroundColor: colors.background,
            opacity: renderCheck ? 0 : 0.25,
          }}
          onTouchStart={closeModal}
        />
      )}
      <View
        ref={ref}
        onLayout={fullscreen ? undefined : onLayout}
        style={[
          {
            display: visible ? undefined : 'none',
            backgroundColor: fullscreen ? colors.background : colors.dialog,
            opacity: renderCheck ? 0 : 1,
          },
          fullscreen
            ? {
                ...StyleSheet.absoluteFillObject,
                paddingHorizontal: responsiveWidth(12),
                paddingTop: responsiveWidth(8) + insets.top,
                paddingBottom: responsiveWidth(8) + insets.bottom,
              }
            : {
                position: 'absolute',
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: colors.backdrop,
                width: ui.windowWidth * 0.8,
                marginHorizontal: (ui.windowWidth - dimensions.width) / 2,
                marginVertical: (ui.windowHeight - dimensions.height) / 2,
              },
          shadow && !fullscreen ? shadowStyle() : {},
          style,
        ]}
      >
        <View
          style={{
            display: fullscreen || title ? undefined : 'none',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: responsiveWidth(8),
          }}
        >
          <YedyText numberOfLines={1} type={'bold'} size={22} style={{flex: 1}}>
            {title}
          </YedyText>
          <YedyIconButton icon={'close'} onPress={closeModal} />
        </View>
        {children}
      </View>
    </YedyPortal>
  );
});
