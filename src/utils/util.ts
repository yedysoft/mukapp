import {Dimensions, PixelRatio} from 'react-native';
import React, {memo} from 'react';

const heightMobileUI = 896;
const widthMobileUI = 414;

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;

const normalize = (size: number, based: 'width' | 'height'): number => {
  const newSize: number = size * (based === 'height' ? screenHeight / heightMobileUI : screenWidth / widthMobileUI);
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

export {screenWidth, screenHeight, responsiveScale, responsiveWidth, responsiveHeight, responsiveSize, genericMemo};
