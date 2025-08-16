import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome() {
  const proceed = async (path: string) => {
    try {
      await AsyncStorage.setItem('seenWelcome', '1');
    } catch {}
    router.replace(path as any);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-4xl font-semibold text-black">eazzy</Text>
        <Text className="text-center text-gray-600">Enhancing your laundry experience</Text>
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity className="bg-[#2675f5] px-5 py-3 rounded-2xl" onPress={() => proceed('/services')}>
            <Text className="text-white font-medium">Start New Order</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 px-5 py-3 rounded-2xl" onPress={() => proceed('/') }>
            <Text className="text-black font-medium">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


