import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ViewShot, { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import JSZip from 'jszip';
import { Platform } from 'react-native';
import { router } from 'expo-router';

const routes: string[] = [
  '/',
  '/services',
  '/services/eazzy-bag',
  '/items/eazzy-bag',
  '/cart',
  '/order-start',
  '/order-address',
  '/order-scheduling',
  '/order-payment',
  '/order-confirmation',
  '/order-tracking?orderId=EZ-2024-003',
  '/order-history',
  '/order-rating?orderId=EZ-2024-003',
  '/messages',
  '/notifications',
  '/profile',
  '/settings',
  '/help',
  '/about',
  '/contact',
  '/addresses',
  '/payment-methods',
  '/welcome',
  '/onboarding',
];

function safe(route: string) {
  return route.replace(/[^a-zA-Z0-9-_]+/g, '_').replace(/^_+|_+$/g, '');
}

export default function CaptureOverlay() {
  const ref = useRef<View>(null);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const savedFiles: string[] = [];
      for (const route of routes) {
        router.replace(route as any);
        // Wait for navigation and next JS tick to ensure new screen rendered
        await new Promise((r) => setTimeout(r, 1500));
        await new Promise((r) => setTimeout(r, 0));
        const uri = await captureScreen({ format: 'png', quality: 1, result: 'tmpfile' });
        const baseDir = FileSystem.documentDirectory || FileSystem.cacheDirectory || '';
        const filename = baseDir + `screen_${safe(route)}.png`;
        await FileSystem.copyAsync({ from: uri, to: filename });
        savedFiles.push(filename);
      }
      // Upload directly to local project server if reachable
      try {
        const server = (process.env.EXPO_PUBLIC_UPLOAD_URL as string) || 'http://127.0.0.1:5123/upload';
        for (const file of savedFiles) {
          const data = await FileSystem.readAsStringAsync(file, { encoding: FileSystem.EncodingType.Base64 });
          const name = file.split('/').pop() || 'screen.png';
          await fetch(server, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: name, dataBase64: data }),
          }).catch(() => {});
        }
      } catch {}

      if ((await Sharing.isAvailableAsync()) && savedFiles.length > 0 && Platform.OS !== 'ios') {
        // Fallback share (Android or where applicable)
        await Sharing.shareAsync(savedFiles[savedFiles.length - 1]);
      }
    } catch (e) {
      // noop
    } finally {
      setBusy(false);
    }
  };

  return (
    <ViewShot style={{ position: 'absolute', inset: 0 }} ref={ref}>
      <View pointerEvents="box-none" style={{ position: 'absolute', bottom: 20, right: 20, opacity: busy ? 0 : 1 }}>
        <TouchableOpacity
          onPress={run}
          disabled={busy}
          style={{ backgroundColor: '#00000099', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>{busy ? 'Capturing…' : 'Capture All'}</Text>
        </TouchableOpacity>
      </View>
    </ViewShot>
  );
}


