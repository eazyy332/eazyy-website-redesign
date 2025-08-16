import React, { useMemo, useState } from 'react';
import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useCart } from '../../context/CartContext';
import QuantityStepper from '../../components/ui/QuantityStepper';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import FloatingCart from '../../components/ui/FloatingCart';
import Screen from '../../components/ui/Screen';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';

type Item = { id: string; name: string; description: string; price: number; subcategory?: string; emoji?: string };

const catalog: Record<string, { name: string; items: Item[] }> = {
  'eazzy-bag': {
    name: 'eazzy Bag Services',
    items: [
      { id: 'small-bag', name: 'Small Bag (up to 5 lbs)', description: 'Perfect for a few items', price: 15.99, emoji: '👝' },
      { id: 'regular-bag', name: 'Regular Bag (up to 10 lbs)', description: 'Weekly laundry', price: 24.99, emoji: '🎒' },
      { id: 'large-bag', name: 'Large Bag (up to 15 lbs)', description: 'Family size', price: 34.99, emoji: '🧳' },
    ],
  },
  'wash-iron': {
    name: 'Wash & Iron',
    items: [
      { id: 'dress-shirt', name: 'Dress Shirt', description: 'Pressed', price: 4.99, emoji: '👔' },
      { id: 'trousers', name: 'Trousers', description: 'Pressed', price: 6.99, emoji: '👖' },
    ],
  },
  'dry-cleaning': {
    name: 'Dry Cleaning',
    items: [
      { id: 'suit-jacket', name: 'Suit Jacket', description: 'Professional clean', price: 15.99, emoji: '🤵' },
      { id: 'coat', name: 'Coat', description: 'Winter coat', price: 25.99, emoji: '🧥' },
    ],
  },
  'repairs': {
    name: 'Repairs & Alterations',
    items: [
      { id: 'hem-pants', name: 'Hem Pants', description: 'Adjust length', price: 12.99, emoji: '📏' },
      { id: 'replace-zipper', name: 'Replace Zipper', description: 'New zipper', price: 19.99, emoji: '🔧' },
    ],
  },
};

export default function ItemsByCategory() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { items, addItem, decrementItem, getQty } = useCart();
  const [confettiKey, setConfettiKey] = useState(0);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'standard' | 'premium'>('all');
  const onAdd = (it: Item) => {
    add(it);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setConfettiKey((k) => k + 1);
  };

  const current = useMemo(() => (typeof category === 'string' ? catalog[category] : undefined), [category]);
  const add = (item: Item) => addItem({ ...item, serviceCategory: String(category) });
  const qty = (id: string) => getQty(String(category), id);

  if (!current) return (
    <View className="flex-1 items-center justify-center">
      <Text>Category not found</Text>
    </View>
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return current.items.filter((it) => {
      const matchesText = q === '' || it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q);
      const matchesPrice =
        priceFilter === 'all' ||
        (priceFilter === 'budget' && it.price < 10) ||
        (priceFilter === 'standard' && it.price >= 10 && it.price <= 20) ||
        (priceFilter === 'premium' && it.price > 20);
      return matchesText && matchesPrice;
    });
  }, [current.items, search, priceFilter]);

  return (
    <Screen title={current.name} subtitle="Select items" className="bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        <Section>
          {/* Search */}
          <View className="bg-muted rounded-2xl px-4 py-3 mb-3 flex-row items-center">
            <Text className="text-muted-foreground">🔎</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search items..."
              className="flex-1 ml-3 text-foreground"
              placeholderTextColor="#9CA3AF"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text className="text-muted-foreground">✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Price filter chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row gap-2 pr-4">
              {[
                { id: 'all', label: 'All' },
                { id: 'budget', label: 'Budget < €10' },
                { id: 'standard', label: '€10–€20' },
                { id: 'premium', label: 'Premium > €20' },
              ].map((chip) => (
                <TouchableOpacity
                  key={chip.id}
                  onPress={() => setPriceFilter(chip.id as any)}
                  className={`px-4 py-2 rounded-full border ${priceFilter === chip.id ? 'bg-primary border-primary' : 'bg-card border-border'}`}
                >
                  <Text className={`${priceFilter === chip.id ? 'text-white' : 'text-foreground'} text-sm font-medium`}>
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Items */}
           <View className="gap-3">
            {filtered.map((it) => (
              <Card key={it.id} className="p-0">
                <View className="p-4">
                  <Text className="text-lg text-foreground mb-1">{it.emoji} {it.name}</Text>
                   <Text className="text-muted-foreground mb-2">{it.description}</Text>
                  <View className="flex-row justify-between items-center">
                     <Text className="text-primary font-semibold">€{it.price.toFixed(2)}</Text>
                    <View className="flex-row gap-3 items-center">
                      <QuantityStepper
                        value={qty(it.id)}
                        onDecrement={() => decrementItem(String(category), it.id)}
                        onIncrement={() => onAdd(it)}
                      />
                      <TouchableOpacity className="bg-primary px-4 py-2 rounded-xl" onPress={() => onAdd(it)}>
                        <Text className="text-white font-semibold">Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </Section>

        <ConfettiCannon key={confettiKey} count={0} autoStart={false} fadeOut origin={{ x: -10, y: 0 }} ref={(ref) => {
          if (!ref) return;
          ref.start();
        }} />
      </ScrollView>
      <FloatingCart />
    </Screen>
  );
}


