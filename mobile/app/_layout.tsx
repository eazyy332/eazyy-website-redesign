import { Stack, Tabs, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text as RNText, TextInput as RNTextInput, View, useWindowDimensions } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import '../global.css';
import { CartProvider } from '../context/CartContext';
import Icon from '../components/ui/Icon';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { BlurView } from 'expo-blur';
import { ToastProvider } from '../components/ui/Toast';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import CaptureOverlay from '../components/dev/CaptureOverlay';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

            useEffect(() => {
              const boot = async () => {
                try {
                  // Skip onboarding/auth routing when capture overlay is enabled
                  if (process.env.EXPO_PUBLIC_ENABLE_CAPTURE === '1') {
                    return;
                  }
                  const onboarded = await AsyncStorage.getItem('onboarded');
                  if (!onboarded && segments[0] !== 'onboarding') {
                    router.replace('/onboarding');
                    return;
                  }

                  // If onboarded, enforce auth routing
                  const { data } = await supabase.auth.getSession();
                  const session = data.session;
                  const inAuth = segments[0] === '(auth)';
                  const inOnboarding = segments[0] === 'onboarding';

                  if (!session && !inAuth && !inOnboarding) {
                    router.replace('/(auth)/login');
                    return;
                  }
                  if (session && (inAuth || inOnboarding)) {
                    router.replace('/');
                    return;
                  }
                } catch {}
              };

              if (fontsLoaded) {
                // Apply font globally without relying on defaultProps typings
                try {
                  // @ts-expect-error - defaultProps exists at runtime on RN components
                  RNText.defaultProps = RNText.defaultProps || {};
                  // @ts-expect-error
                  RNText.defaultProps.style = [RNText.defaultProps.style, { fontFamily: 'Inter_400Regular' }];
                  // @ts-expect-error
                  RNTextInput.defaultProps = RNTextInput.defaultProps || {};
                  // @ts-expect-error
                  RNTextInput.defaultProps.style = [RNTextInput.defaultProps.style, { fontFamily: 'Inter_400Regular' }];
                } catch {}
                boot();
              }
            }, [fontsLoaded, segments]);

  if (!fontsLoaded) return null;

  function TabsWithIcons() {
    const { count } = useCart();
    const { width } = useWindowDimensions();
    const isSmallPhone = width < 360;
    const isLargePhone = width >= 430;
    const leftRight = isSmallPhone ? 12 : isLargePhone ? 22 : 16;
    const bottom = isSmallPhone ? 12 : 16;
    const height = isSmallPhone ? 60 : isLargePhone ? 74 : 68;
    return (
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2675f5',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            position: 'absolute',
            left: leftRight,
            right: leftRight,
            bottom: bottom,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            height,
          },
          tabBarBackground: () => (
            <BlurView intensity={50} tint="light" style={{ flex: 1, borderRadius: 24, overflow: 'hidden' }} />
          ),
          tabBarLabelStyle: {
            fontSize: isSmallPhone ? 11 : 12,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = 'home';
            
            if (route.name === 'index') iconName = 'home';
            else if (route.name === 'services') iconName = 'hanger';
            else if (route.name === 'cart') iconName = 'cart';
            else if (route.name === 'profile') iconName = 'user';

            const iconSize = focused ? (isSmallPhone ? 24 : 26) : (isSmallPhone ? 18 : 20);
            const minWidth = isSmallPhone ? 54 : 64;
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4, paddingHorizontal: isSmallPhone ? 12 : 16, borderRadius: 20, backgroundColor: focused ? '#E7F0FF' : 'transparent', minWidth, height: 40 }}>
                <Icon name={iconName as any} color={color as string} size={iconSize} />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Home',
            tabBarLabel: 'Home'
          }} 
        />
        <Tabs.Screen 
          name="services" 
          options={{ 
            title: 'Services',
            tabBarLabel: 'Services'
          }} 
        />
        <Tabs.Screen 
          name="cart" 
          options={{ 
            title: 'Cart',
            tabBarLabel: 'Cart',
            tabBarBadge: count > 0 ? (count > 99 ? '99+' : count.toString()) : undefined,
            tabBarBadgeStyle: {
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 'bold',
              minWidth: 18,
              height: 18,
              borderRadius: 9,
              marginLeft: 12,
              marginTop: -8,
            }
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{ 
            title: 'Profile',
            tabBarLabel: 'Profile'
          }} 
        />
        
        {/* Hidden screens */}
        <Tabs.Screen name="welcome" options={{ href: null }} />
        <Tabs.Screen name="about" options={{ href: null }} />
        <Tabs.Screen name="help" options={{ href: null }} />
        <Tabs.Screen name="contact" options={{ href: null }} />
        <Tabs.Screen name="settings" options={{ href: null }} />
         <Tabs.Screen name="messages" options={{ href: null }} />
        <Tabs.Screen name="order-start" options={{ href: null }} />
        <Tabs.Screen name="order-address" options={{ href: null }} />
        <Tabs.Screen name="order-scheduling" options={{ href: null }} />
         <Tabs.Screen name="order-payment" options={{ href: null }} />
        <Tabs.Screen name="order-confirmation" options={{ href: null }} />

      </Tabs>
    );
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <ToastProvider>
          <ErrorBoundary>
            <TabsWithIcons />
          </ErrorBoundary>
          <StatusBar style="auto" />
          {process.env.EXPO_PUBLIC_ENABLE_CAPTURE === '1' ? <CaptureOverlay /> : null}
        </ToastProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}


