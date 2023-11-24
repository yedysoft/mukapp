import {Dimensions, PixelRatio} from 'react-native';
import React, {memo} from 'react';

const normalize = (size: number, based: 'width' | 'height' = 'width'): number => {
  const widthBaseScale: number = screenWidth / widthMobileUI;
  const heightBaseScale: number = screenHeight / heightMobileUI;

  const newSize: number = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const heightMobileUI = 896;
const widthMobileUI = 414;

const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;

const responsiveScale = (scale: number | undefined): number => responsiveWidth(scale ? 64 * scale : 64);
const responsiveWidth = (size: number): number => normalize(size, 'width');
const responsiveHeight = (size: number): number => normalize(size, 'height');
const responsiveSize = (size: number): number => responsiveWidth(size);

const genericMemo: <T>(
  component: T,
  propsAreEqual?: (prevProps: React.PropsWithChildren<T>, nextProps: React.PropsWithChildren<T>) => boolean,
) => T = memo;

export {screenWidth, screenHeight, responsiveScale, responsiveWidth, responsiveHeight, responsiveSize, genericMemo};
