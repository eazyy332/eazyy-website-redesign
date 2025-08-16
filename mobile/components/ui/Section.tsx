import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ title, subtitle, children, className = '' }: Props) {
  return (
    <View className={`px-5 py-5 ${className}`}>
      {(title || subtitle) && (
        <View className="mb-3">
          {title ? (
            <Text className="text-xl font-semibold text-foreground">{title}</Text>
          ) : null}
          {subtitle ? (
            <Text className="text-muted-foreground mt-1">{subtitle}</Text>
          ) : null}
        </View>
      )}
      {children}
    </View>
  );
}


