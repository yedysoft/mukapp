import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {useTheme} from '../../hooks';
import {
  BackHandler,
  Keyboard,
  NativeEventSubscription,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {responsiveWidth, shadowStyle} from '../../utils/util';
import YedyPortal from './portal/YedyPortal';
import {useFocusEffect} from '@react-navigation/native';
import {useStores} from '../../stores';
import YedyText from './YedyText';
import YedyButton from './YedyButton';
import {Dimensions} from '../../types';
import YedyIconButton from './YedyIconButton';

type DialogButton = {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

type Dialog = {
  title?: string;
  content?: string;
  buttons?: Array<DialogButton>;
};

type Props = {
  children?: ReactNode;
  visible: boolean;
  changeVisible: (open: boolean) => void;
  shadow?: boolean;
  dialog?: Dialog;
  style?: StyleProp<ViewStyle>;
};

export default ({children, visible, changeVisible, shadow = true, dialog, style}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();
  const ref = useRef<View>(null);
  const event = useRef<NativeEventSubscription | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
  const renderCheck = dimensions.height === 0 || dimensions.width === 0;

  const onLayout = () => {
    if (ref.current && visible) {
      ref.current.measure((_x, _y, width, height) => {
        if (width && height && (dimensions.width !== width || dimensions.height !== height)) {
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

  const getButton = (index: number, button: DialogButton) => (
    <YedyButton
      key={index}
      label={button.text}
      textStyle={button.textStyle}
      buttonStyle={button.style}
      onPress={button.onPress}
    />
  );

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
    <YedyPortal zIndex={1399}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          display: visible ? undefined : 'none',
          backgroundColor: colors.background,
          opacity: renderCheck ? 0 : 0.25,
        }}
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
            opacity: renderCheck ? 0 : 1,
            width: ui.windowWidth * 0.8,
            gap: responsiveWidth(12),
            padding: responsiveWidth(16),
            marginHorizontal: (ui.windowWidth - dimensions.width) / 2,
            marginVertical: (ui.windowHeight - dimensions.height) / 2,
          },
          shadow ? shadowStyle() : {},
          style,
        ]}
      >
        {dialog ? (
          <>
            {dialog.title && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <YedyText type={'bold'} size={19} style={{flex: 1}}>
                  {dialog.title}
                </YedyText>
                <YedyIconButton
                  icon={'close'}
                  color={colors.outlineVariant}
                  scale={0.4}
                  onPress={closeModal}
                  style={{padding: 0}}
                />
              </View>
            )}
            {dialog.content && <YedyText size={14}>{dialog.content}</YedyText>}
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', gap: responsiveWidth(8)}}>
              {dialog.buttons && dialog.buttons.map((button: DialogButton, index) => getButton(index, button))}
            </View>
          </>
        ) : undefined}
        {children}
      </View>
    </YedyPortal>
  );
};
