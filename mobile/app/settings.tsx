import { View, Text, Switch } from 'react-native';
import { useColorScheme } from 'nativewind';
import Screen from '../components/ui/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import { useToast } from '../components/ui/Toast';

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const dark = colorScheme === 'dark';
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const enabled = await AsyncStorage.getItem('eazzy-biometrics-enabled');
      setBiometricsEnabled(enabled === 'true');
    })();
  }, []);

  const toggleBiometrics = async (v: boolean) => {
    if (v) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hasHardware || !enrolled) {
        showToast('Biometrics not available on this device', 'error');
        return;
      }
      await AsyncStorage.setItem('eazzy-biometrics-enabled', 'true');
      setBiometricsEnabled(true);
      showToast('Quick unlock enabled', 'success');
    } else {
      await AsyncStorage.setItem('eazzy-biometrics-enabled', 'false');
      setBiometricsEnabled(false);
      showToast('Quick unlock disabled', 'success');
    }
  };
  return (
    <Screen title="Settings" scroll={false}>
      <View className="px-4 py-6">
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-foreground">Dark mode</Text>
          <Switch value={dark} onValueChange={(v) => setColorScheme(v ? 'dark' : 'light')} />
        </View>
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-foreground">Quick unlock with biometrics</Text>
          <Switch value={biometricsEnabled} onValueChange={toggleBiometrics} />
        </View>
      </View>
    </Screen>
  );
}


