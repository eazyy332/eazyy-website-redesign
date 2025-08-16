import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceMetrics } from '../../hooks/useDeviceMetrics';

type Props = { children: React.ReactNode };

export default function StickyFooter({ children }: Props) {
  const m = useDeviceMetrics();
  return (
    <SafeAreaView edges={["bottom"]} className="bg-white">
      <View
        className="border-t border-border bg-white"
        style={{ paddingHorizontal: m.gutter, paddingTop: 10, paddingBottom: 10 }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}


