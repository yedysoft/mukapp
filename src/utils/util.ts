import {PixelRatio, StyleProp, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {stores} from '../stores';

const DESIGN_HEIGHT = 780;
const DESIGN_WIDTH = 360;
const DESIGN_PIXEL_DENSITY = 3;

const normalize = (size: number, based: 'width' | 'height' | 'size'): number => {
  const devicePixelDensity = PixelRatio.get();
  const heightScale = stores.ui.screenHeight / DESIGN_HEIGHT;
  const widthScale = stores.ui.screenWidth / DESIGN_WIDTH;
  const minScale = Math.min(heightScale, widthScale);
  const scale = based === 'height' ? heightScale : based === 'width' ? widthScale : minScale;
  const density = devicePixelDensity / DESIGN_PIXEL_DENSITY;
  const newSize = size * density * scale;
  return PixelRatio.roundToNearestPixel(newSize);
};

const responsiveWidth = (size: number): number => normalize(size, 'width');

const responsiveHeight = (size: number): number => normalize(size, 'height');

const responsiveSize = (size: number): number => normalize(size, 'size');

const responsiveScale = (scale: number): number => responsiveSize(scale * 64);

const shadowStyle = (shadowColor?: string): StyleProp<ViewStyle> => ({
  shadowColor: shadowColor ?? stores.ui.getTheme.colors.primary,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.4,
  shadowRadius: 4,
  elevation: 4,
});

const genericMemo: <T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean,
) => T = memo;

const getAnimatedValue = (value: any): number => value.__getValue() as number;

export {responsiveScale, responsiveWidth, responsiveHeight, responsiveSize, shadowStyle, genericMemo, getAnimatedValue};
