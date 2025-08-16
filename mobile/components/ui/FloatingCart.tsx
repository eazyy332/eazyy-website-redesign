import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { useCart } from '../../context/CartContext';
import Icon from './Icon';

export default function FloatingCart() {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 100, alignItems: 'center' }}
    >
      <BlurView intensity={40} tint="light" style={{ borderRadius: 999, overflow: 'hidden' }}>
        <Link href="/cart" asChild>
          <TouchableOpacity
            activeOpacity={0.9}
            className="flex-row items-center gap-3 px-5 py-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
          >
            <View className="bg-primary rounded-full w-7 h-7 items-center justify-center">
              <Text className="text-white text-xs font-bold">{count}</Text>
            </View>
            <Text className="text-foreground font-semibold">View Cart</Text>
            <View className="w-2" />
            <Text className="text-primary font-bold">€{total.toFixed(2)}</Text>
            <Icon name="chevronRight" size={18} color="#2675f5" />
          </TouchableOpacity>
        </Link>
      </BlurView>
    </View>
  );
}


