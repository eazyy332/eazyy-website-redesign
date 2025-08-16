import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'neutral';

type Props = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  className?: string;
};

const variantStyles: Record<BadgeVariant, { bg: string; fg: string }> = {
  primary: { bg: 'bg-primary/10', fg: 'text-primary' },
  success: { bg: 'bg-green-100', fg: 'text-green-700' },
  warning: { bg: 'bg-yellow-100', fg: 'text-yellow-700' },
  neutral: { bg: 'bg-muted', fg: 'text-foreground' },
};

export default function Badge({ children, variant = 'primary', style, className = '' }: Props) {
  const styles = variantStyles[variant];
  return (
    <View className={`px-2.5 py-1 rounded-full ${styles.bg} ${className}`} style={style}>
      <Text className={`text-xs font-semibold ${styles.fg}`}>{children}</Text>
    </View>
  );
}


