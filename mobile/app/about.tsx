import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Screen from '../components/ui/Screen';
import { RefreshControl } from 'react-native';

export default function AboutScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  };
  return (
    <Screen title="About eazzy" subtitle="Premium laundry and dry cleaning with speed, quality, and trust.">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

      <View className="gap-4">
        <View className="bg-white rounded-2xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-black mb-1">Quality</Text>
          <Text className="text-gray-600">Professionally cleaned with care and consistency.</Text>
        </View>
        <View className="bg-white rounded-2xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-black mb-1">Speed</Text>
          <Text className="text-gray-600">Same-day collection and next-day return where available.</Text>
        </View>
        <View className="bg-white rounded-2xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-black mb-1">Tracking</Text>
          <Text className="text-gray-600">Live updates from pickup to drop-off.</Text>
        </View>
        <View className="bg-white rounded-2xl p-4 border border-gray-200">
          <Text className="text-lg font-semibold text-black mb-1">Trust</Text>
          <Text className="text-gray-600">Handled by friendly drivers and skilled cleaners.</Text>
        </View>
      </View>
      </ScrollView>
    </Screen>
  );
}


