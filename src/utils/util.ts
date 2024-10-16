import {PixelRatio, StyleProp, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {stores} from '../stores';

const DESIGN_HEIGHT = 896;
const DESIGN_WIDTH = 414;

const normalize = (size: number, based: 'width' | 'height' | 'size'): number => {
  const heightScale = stores.ui.windowHeight / DESIGN_HEIGHT;
  const widthScale = stores.ui.windowWidth / DESIGN_WIDTH;
  const minScale = Math.min(heightScale, widthScale);
  const scale = based === 'height' ? heightScale : based === 'width' ? widthScale : minScale;
  const newSize: number = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const responsiveWidth = (size: number): number => normalize(size, 'width');

const responsiveHeight = (size: number): number => normalize(size, 'height');

const responsiveSize = (size: number): number => normalize(size, 'size');

const responsiveScale = (scale: number): number => responsiveSize(scale * 64);

const shadowStyle = (shadowColor: string): StyleProp<ViewStyle> => ({
  shadowColor,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.5,
  shadowRadius: 8,
  elevation: 6,
});

const genericMemo: <T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean,
) => T = memo;

const getAnimatedValue = (value: any): number => value.__getValue() as number;

export {responsiveScale, responsiveWidth, responsiveHeight, responsiveSize, shadowStyle, genericMemo, getAnimatedValue};
