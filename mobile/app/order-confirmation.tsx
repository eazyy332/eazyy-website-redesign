import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';
import { Alert, Platform, Linking } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function OrderConfirmation() {
  const [key, setKey] = React.useState(0);
  return (
    <Screen headerHidden>
      <View className="flex-1 items-center justify-center px-6">
        <ConfettiCannon key={key} count={120} origin={{ x: 0, y: 0 }} fadeOut autoStart onAnimationEnd={() => setKey((k)=>k+1)} />
        <Text className="text-3xl font-semibold text-foreground mb-2">Order Ready</Text>
        <Text className="text-muted-foreground mb-6 text-center">We’ll keep you updated with real‑time notifications.</Text>
        <TouchableOpacity className="bg-[#2675f5] px-6 py-4 rounded-2xl" onPress={() => {
          Alert.alert('Enjoying eazzy?', 'Would you like to rate the app?', [
            { text: 'Later', style: 'cancel', onPress: () => router.replace('/') },
            { text: 'Rate now', onPress: async () => {
                try {
                  // Attempt native in-app review via Store URLs as a simple approach
                  const iosUrl = 'itms-apps://itunes.apple.com/app/id000000000?action=write-review';
                  const androidUrl = 'market://details?id=com.quantumworks.mobile';
                  const webAndroidUrl = 'https://play.google.com/store/apps/details?id=com.quantumworks.mobile';
                  const target = Platform.select({ ios: iosUrl, android: androidUrl, default: webAndroidUrl });
                  if (target) {
                    const can = await Linking.canOpenURL(target);
                    await Linking.openURL(can ? target : webAndroidUrl);
                  }
                } catch {}
                router.replace('/');
              }
            },
          ]);
        }}>
          <Text className="text-white font-medium">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}


