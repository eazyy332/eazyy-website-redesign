import React from 'react';
import { Image, Text, View, ImageSourcePropType } from 'react-native';
import { useDeviceMetrics } from '../../hooks/useDeviceMetrics';

type Props = {
  size?: number;
  showWordmarkFallback?: boolean;
};

export default function Logo({ size, showWordmarkFallback = true }: Props) {
  const m = useDeviceMetrics();
  const height = size || (m.isSmallPhone ? 18 : 22);

  const source: ImageSourcePropType =
    // Allow overriding via env for quick testing
    (process.env.EXPO_PUBLIC_LOGO_URL ? { uri: process.env.EXPO_PUBLIC_LOGO_URL } : undefined) ||
    // Fallback to app icon (replace with real logo asset when available)
    require('../../assets/icon.png');

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={source} style={{ width: height * 1.2, height, borderRadius: 4 }} resizeMode="contain" />
      {showWordmarkFallback && (
        <Text style={{ marginLeft: 6, fontWeight: '700', fontSize: height * 0.9 }} className="text-primary">
          eazzy
        </Text>
      )}
    </View>
  );
}


