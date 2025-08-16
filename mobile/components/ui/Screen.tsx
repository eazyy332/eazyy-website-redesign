import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceMetrics } from '../../hooks/useDeviceMetrics';
import Logo from './Logo';
import { Link, router } from 'expo-router';
import Icon from './Icon';

type ScreenProps = {
  title?: string;
  subtitle?: string;
  scroll?: boolean;
  children: React.ReactNode;
  headerHidden?: boolean;
  rightAction?: React.ReactNode;
  onBackPress?: () => void;
  footer?: React.ReactNode;
  className?: string;
};

export default function Screen({
  title,
  subtitle,
  scroll = true,
  children,
  headerHidden = false,
  rightAction,
  onBackPress,
  footer,
  className = '',
}: ScreenProps) {
  const Container = scroll ? ScrollView : View;
  const m = useDeviceMetrics();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {!headerHidden && (
        <View className="flex-row items-center justify-between border-b border-border bg-white/95"
          style={{ paddingHorizontal: m.gutter, paddingTop: 10, paddingBottom: 10 }}
        >
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => (onBackPress ? onBackPress() : router.back())}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="-ml-1 mr-1"
            >
              <Icon name="arrowLeft" size={m.iconBase + 2} color="#111" />
            </TouchableOpacity>
            <Link href="/" asChild>
              <TouchableOpacity>
                <Logo />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="flex-row items-center gap-3">
            <Link href="/help" asChild>
              <TouchableOpacity>
                <Icon name="help" size={m.iconBase} color="#2675f5" />
              </TouchableOpacity>
            </Link>
            <Link href="/cart" asChild>
              <TouchableOpacity>
                <Icon name="cart" size={m.iconBase} color="#2675f5" />
              </TouchableOpacity>
            </Link>
            {rightAction}
          </View>
        </View>
      )}

      {title && (
        <View style={{ paddingHorizontal: m.gutter, paddingTop: 14 }}>
          <Text style={{ fontSize: m.titleSize }} className="font-bold text-foreground">{title}</Text>
          {subtitle ? (
            <Text style={{ fontSize: m.subtitleSize }} className="text-muted-foreground mt-1">{subtitle}</Text>
          ) : null}
        </View>
      )}

      <Container
        className={`${scroll ? 'flex-1' : ''} ${className}`}
        {...(scroll ? { contentContainerStyle: { paddingBottom: 24, paddingHorizontal: title ? 0 : m.gutter } } : {})}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>

      {footer}
    </SafeAreaView>
  );
}


