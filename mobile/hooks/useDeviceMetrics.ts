import { useWindowDimensions, Platform } from 'react-native';

export function useDeviceMetrics() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  const isSmallPhone = width < 360;
  const isLargePhone = width >= 430; // e.g., iPhone Pro Max
  const gutter = isSmallPhone ? 14 : isLargePhone ? 20 : 16;
  const cornerRadius = isSmallPhone ? 14 : isLargePhone ? 20 : 16;
  const tabBarHeight = isSmallPhone ? 62 : isLargePhone ? 76 : 68;
  const titleSize = isSmallPhone ? 22 : isLargePhone ? 26 : 24;
  const subtitleSize = isSmallPhone ? 13 : 14;
  const iconBase = isSmallPhone ? 18 : isLargePhone ? 24 : 20;
  const touchTarget = 44; // iOS HIG minimum
  const shadow = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 2 },
    default: {},
  });

  return {
    width,
    height,
    scale,
    fontScale,
    isSmallPhone,
    isLargePhone,
    gutter,
    cornerRadius,
    tabBarHeight,
    titleSize,
    subtitleSize,
    iconBase,
    touchTarget,
    shadow,
  };
}


