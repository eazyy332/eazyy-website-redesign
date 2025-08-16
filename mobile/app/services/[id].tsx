import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import Icon from '../../components/ui/Icon';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Screen from '../../components/ui/Screen';

const details: Record<string, { title: string; description: string; points: string[] }> = {
  'eazzy-bag': {
    title: 'eazzy Bag Service',
    description: 'Fill our premium laundry bag with mixed items. We sort, wash, dry, and fold with care.',
    points: ['Mixed items allowed', 'Premium detergents', 'Folded & wrapped', 'Pickup & delivery']
  },
  'wash-iron': {
    title: 'Wash & Iron',
    description: 'Professional wash and iron for shirts, trousers, and more. Crisp, ready-to-wear results.',
    points: ['Machine wash', 'Steam iron finish', 'Stain pre-treatment', 'Delicate handling']
  },
  'dry-cleaning': {
    title: 'Dry Cleaning',
    description: 'Gentle dry cleaning for delicate fabrics and special garments requiring expert care.',
    points: ['Delicate fabrics', 'Spot treatment', 'Odor removal', 'Protective covers']
  },
  'repairs': {
    title: 'Repairs & Alterations',
    description: 'Tailoring services including hemming, zipper replacement, and minor repairs.',
    points: ['Hemming & tapering', 'Buttons & zippers', 'Patches & tears', 'Custom fit']
  },
};

export default function ServiceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = id && typeof id === 'string' ? details[id] : undefined;

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-black">Service not found</Text>
      </View>
    );
  }

  return (
    <Screen title={data.title} subtitle={data.description}>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>

      <Card title="What you get" variant="feature" className="mb-6">
        <View className="mt-2 gap-2">
          {data.points.map((p, idx) => (
            <View key={idx} className="flex-row items-center">
              <Icon name="check" size={16} color="#2675f5" />
              <Text className="ml-2 text-foreground">{p}</Text>
            </View>
          ))}
        </View>
      </Card>

        <Link href={{ pathname: '/items/[category]', params: { category: id } }} asChild>
          <Button variant="primary" size="lg" fullWidth>
            Select Items
          </Button>
        </Link>
      </ScrollView>
    </Screen>
  );
}


