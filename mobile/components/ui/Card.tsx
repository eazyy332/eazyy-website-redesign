import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from './Icon';
import { useDeviceMetrics } from '../../hooks/useDeviceMetrics';

interface CardProps {
  title?: string;
  description?: string;
  price?: string;
  icon?: string;
  image?: string;
  onPress?: () => void;
  variant?: 'default' | 'service' | 'feature' | 'gradient' | 'glass';
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export default function Card({ 
  title, 
  description, 
  price, 
  icon, 
  onPress, 
  variant = 'default',
  className = '',
  style,
  children
}: CardProps) {
  const m = useDeviceMetrics();
  const CardContent = () => (
    <View className={`${getCardClasses(variant)} ${className}`} style={[{ borderRadius: m.cornerRadius, padding:  m.cornerRadius - 4 }, style]}>
      {icon && (
        <View className="mb-3">
          <Icon name={icon as any} size={m.iconBase + 12} color="#2675f5" />
        </View>
      )}
      
      <View className="flex-1">
        {title ? (
           <Text className={`font-semibold mb-1 ${getTitleClasses(variant)}`} style={{ fontSize: variant === 'service' ? m.titleSize - 2 : m.titleSize - 4 }}>
            {title}
          </Text>
        ) : null}
        
        {description && (
          <Text className={`${getDescriptionClasses(variant)} mb-2`}>
            {description}
          </Text>
        )}
        
        {price && (
           <Text className="text-primary font-bold" style={{ fontSize: m.titleSize - 6 }}>
            {price}
          </Text>
        )}
        
        {children}
      </View>
    </View>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={['#2675f5', '#4F8AFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, padding: 20 }}
        >
          <View>
            {icon && (
              <View className="mb-3">
                <Icon name={icon as any} size={32} color="white" />
              </View>
            )}
            {title ? <Text className="text-white font-bold text-xl mb-2">{title}</Text> : null}
            {description && (
              <Text className="text-white/90 mb-3">{description}</Text>
            )}
            {children}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'glass') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={!onPress}>
        <BlurView intensity={30} tint="light" style={{ borderRadius: 20, overflow: 'hidden' }}>
          <View className={`${getCardClasses(variant)} ${className}`} style={[{ backgroundColor: 'rgba(255,255,255,0.6)' }, style]}>
            <CardContent />
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

function getCardClasses(variant: string): string {
  const base = 'bg-card rounded-2xl p-5 border border-border';
  
  switch (variant) {
    case 'service':
      return `${base} shadow-sm mb-4`;
    case 'feature':
      return `${base} shadow-lg`;
    case 'glass':
      return 'rounded-2xl p-5 border border-white/40';
    default:
      return base;
  }
}

function getTitleClasses(variant: string): string {
  const base = 'text-card-foreground';
  
  switch (variant) {
    case 'service':
      return `${base} text-xl`;
    case 'feature':
      return `${base} text-lg`;
    default:
      return `${base} text-lg`;
  }
}

function getDescriptionClasses(variant: string): string {
  return 'text-muted-foreground text-sm leading-5';
}
