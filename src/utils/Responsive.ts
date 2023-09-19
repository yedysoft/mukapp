import {Dimensions, PixelRatio} from 'react-native';

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;
const heightMobileUI = 896;
const widthMobileUI = 414;

function normalize(size: number, based: 'width' | 'height' = 'width'): number {
  const widthBaseScale: number = screenWidth / widthMobileUI;
  const heightBaseScale: number = screenHeight / heightMobileUI;

  const newSize: number = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const responsiveWidth = (size: number): number => {
  return normalize(size, 'width');
};

export const responsiveHeight = (size: number): number => {
  return normalize(size, 'height');
};

export const responsiveSize = (size: number): number => {
  return responsiveWidth(size);
};

/*
const stwidth = 320

export const responsiveWidth = (width) => (screenWidth * width) / widthMobileUI

export const responsiveHeight = (height) => (screenHeight() * height) / heightMobileUI

export const screenWidth = () => Dimensions.get('window').width

export const screenHeight = () => Dimensions.get('window').height

export const responsiveSize = (oldSize) => Math.round((oldSize / stwidth) * screenWidth)
*/
