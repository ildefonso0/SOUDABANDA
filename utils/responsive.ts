import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }

  return (SCREEN_WIDTH >= 768 || SCREEN_HEIGHT >= 768);
};

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const wp = (percentage: number) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
};

export const hp = (percentage: number) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
};

export const moderateScale = (size: number, factor = 0.5) => {
  const newSize = size + (scale(size) - size) * factor;
  return Math.round(newSize);
};

export const scale = (size: number) => {
  return (SCREEN_WIDTH / guidelineBaseWidth) * size;
};

export const verticalScale = (size: number) => {
  return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
};

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;
export const isLargeDevice = SCREEN_WIDTH >= 768;

export const getResponsiveFontSize = (baseSize: number) => {
  if (isSmallDevice) return moderateScale(baseSize * 0.85);
  if (isLargeDevice) return moderateScale(baseSize * 1.2);
  return moderateScale(baseSize);
};

export const getResponsiveSpacing = (baseSpacing: number) => {
  if (isSmallDevice) return baseSpacing * 0.8;
  if (isLargeDevice) return baseSpacing * 1.3;
  return baseSpacing;
};

export const responsive = {
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  isTablet: isTablet(),
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  getResponsiveFontSize,
  getResponsiveSpacing,
};
