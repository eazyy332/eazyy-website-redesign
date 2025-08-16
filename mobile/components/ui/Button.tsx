import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({ 
  children,
  title,
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  style,
  textStyle,
  fullWidth = false
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const content = children || title;
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 5, tension: 200 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 200 }).start();
  };

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={async () => { await Haptics.selectionAsync(); onPress?.(); }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.8}
        className={`${fullWidth ? 'w-full' : ''} ${className}`}
        style={style}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={['#2675f5', '#4F8AFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ 
            borderRadius: 16, 
            paddingHorizontal: getSizePadding(size).horizontal,
            paddingVertical: getSizePadding(size).vertical,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDisabled ? 0.5 : 1
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text 
              className={`text-white font-semibold ${getSizeText(size)}`}
              style={textStyle}
            >
              {content}
            </Text>
          )}
        </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={async () => { await Haptics.selectionAsync(); onPress?.(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`
        ${getButtonClasses(variant, size)}
        ${isDisabled ? 'opacity-50' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : '#2675f5'} 
          size="small" 
        />
      ) : (
        <Text 
          className={`${getTextClasses(variant, size)}`}
          style={textStyle}
        >
          {content}
        </Text>
      )}
      </Animated.View>
    </TouchableOpacity>
  );
}

function getSizePadding(size: string) {
  const sizes = {
    sm: { horizontal: 12, vertical: 8 },
    md: { horizontal: 16, vertical: 12 },
    lg: { horizontal: 24, vertical: 16 }
  };
  return sizes[size as keyof typeof sizes];
}

function getSizeText(size: string): string {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  return sizes[size as keyof typeof sizes];
}

function getButtonClasses(variant: string, size: string): string {
  const base = 'rounded-2xl items-center justify-center shadow-sm';
  const sizes = {
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4'
  };
  
  const variants = {
    primary: 'bg-primary',
    secondary: 'bg-secondary border border-border',
    outline: 'bg-transparent border-2 border-primary',
    ghost: 'bg-transparent'
  };
  
  return `${base} ${sizes[size as keyof typeof sizes]} ${variants[variant as keyof typeof variants]}`;
}

function getTextClasses(variant: string, size: string): string {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  const variants = {
    primary: 'text-primary-foreground font-semibold',
    secondary: 'text-secondary-foreground font-medium',
    outline: 'text-primary font-semibold',
    ghost: 'text-primary font-medium'
  };
  
  return `${sizes[size as keyof typeof sizes]} ${variants[variant as keyof typeof variants]}`;
}


