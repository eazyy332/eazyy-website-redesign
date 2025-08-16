import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, className = '' }: SkeletonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const numericWidth = typeof width === 'string' ? (width.endsWith('%') ? width : undefined) : width;
  return (
    <Animated.View
      className={`bg-muted ${className}`}
      style={{
        // React Native allows percentage strings for width; cast to any to satisfy TS
        width: numericWidth as any,
        height,
        borderRadius,
        opacity,
      }}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <View className="bg-card rounded-2xl p-6 border border-border">
      <View className="flex-row items-start">
        <Skeleton width={64} height={64} borderRadius={16} className="mr-4" />
        <View className="flex-1">
          <Skeleton width="60%" height={24} className="mb-2" />
          <Skeleton width="100%" height={16} className="mb-1" />
          <Skeleton width="80%" height={16} className="mb-3" />
          <View className="flex-row items-center justify-between">
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={36} borderRadius={18} />
          </View>
        </View>
      </View>
    </View>
  );
}

export function OrderCardSkeleton() {
  return (
    <View className="bg-card rounded-2xl p-4 border border-border">
      <View className="flex-row items-center justify-between mb-3">
        <Skeleton width={120} height={20} />
        <Skeleton width={80} height={24} borderRadius={12} />
      </View>
      <Skeleton width="100%" height={16} className="mb-2" />
      <Skeleton width="70%" height={16} className="mb-3" />
      <View className="flex-row items-center justify-between">
        <Skeleton width={60} height={20} />
        <Skeleton width={100} height={32} borderRadius={16} />
      </View>
    </View>
  );
}
