import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import * as AuthSession from 'expo-auth-session';
import Screen from '../../components/ui/Screen';
import Section from '../../components/ui/Section';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useToast } from '../../components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const enabled = await AsyncStorage.getItem('eazzy-biometrics-enabled');
      if (enabled === 'true') {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware && enrolled) {
          const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Unlock eazzy' });
          if (result.success) {
            router.replace('/');
          }
        }
      }
    })();
  }, []);

  const onLogin = async () => {
    if (!email || !password) return Alert.alert('Login', 'Enter email and password');
    Haptics.selectionAsync().catch(()=>{});
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return Alert.alert('Login failed', error.message);
    showToast('Signed in', 'success');
    // Offer to enable biometrics after first login
    // Do not auto-enable. Respect user toggle in Settings.
    router.replace('/');
  };

  const onOAuth = async (provider: 'apple' | 'google') => {
    try {
      const redirectTo = AuthSession.makeRedirectUri({ scheme: 'eazzy' });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, skipBrowserRedirect: false },
      });
      if (error) throw error;
      // Supabase will handle redirect back and session; router replacement handled by layout effect
    } catch (e: any) {
      Alert.alert('Sign in failed', e?.message ?? 'Please try again');
    }
  };

  const onForgot = async () => {
    if (!email) return Alert.alert('Reset Password', 'Enter your email to receive a reset link.');
    const redirectTo = AuthSession.makeRedirectUri({ scheme: 'eazzy' });
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) return Alert.alert('Reset failed', error.message);
    Alert.alert('Check your email', 'We sent a password reset link.');
  };

  return (
    <Screen title="Welcome back" subtitle="Sign in to continue">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Section>
          <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Button variant="primary" size="lg" fullWidth loading={loading} onPress={onLogin}>
            Sign In
          </Button>
        </Section>

        <Section>
          <View className="flex-row justify-between gap-3">
            <Button variant="outline" size="md" fullWidth onPress={() => onOAuth('apple')}>
              Continue with Apple
            </Button>
            <Button variant="outline" size="md" fullWidth onPress={() => onOAuth('google')}>
              Continue with Google
            </Button>
          </View>
          <View className="items-center mt-4">
            <Button variant="ghost" size="md" onPress={onForgot}>
              Forgot password?
            </Button>
          </View>
        </Section>

        <Section>
          <View className="flex-row justify-center gap-1">
            <Text className="text-muted-foreground">No account?</Text>
            <Link href="/(auth)/signup" asChild>
              <Text className="text-primary">Create one</Text>
            </Link>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
}


