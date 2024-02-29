import {PixelRatio, Platform} from 'react-native';
import React, {memo} from 'react';
import {stores} from '../stores';

const heightMobileUI = Platform.OS === 'ios' ? 896 : 900;
const widthMobileUI = Platform.OS === 'ios' ? 414 : 450;

const normalize = (size: number, based: 'width' | 'height'): number => {
  const newSize: number =
    size * (based === 'height' ? stores.ui.windowHeight / heightMobileUI : stores.ui.windowWidth / widthMobileUI);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
const responsiveScale = (scale: number | undefined): number => responsiveWidth(scale ? 64 * scale : 64);
const responsiveWidth = (size: number): number => normalize(size, 'width');
const responsiveHeight = (size: number): number => normalize(size, 'height');
const responsiveSize = (size: number): number => responsiveWidth(size);

const genericMemo: <T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean,
) => T = memo;

export {responsiveScale, responsiveWidth, responsiveHeight, responsiveSize, genericMemo};
