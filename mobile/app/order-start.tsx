import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';

export default function OrderStart() {
  return (
    <Screen title="Start New Order" subtitle="We’ll guide you through address, schedule and payment.">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity className="bg-[#2675f5] px-5 py-4 rounded-2xl" onPress={() => router.push('/order-address')}>
          <Text className="text-white text-center font-medium">Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}


