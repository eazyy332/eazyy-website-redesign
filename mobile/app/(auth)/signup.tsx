import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';
import Screen from '../../components/ui/Screen';
import Section from '../../components/ui/Section';
import * as Haptics from 'expo-haptics';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!email || !password) return Alert.alert('Sign up', 'Enter email and password');
    Haptics.selectionAsync().catch(()=>{});
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return Alert.alert('Sign up failed', error.message);
    Alert.alert('Check your email', 'Confirm your email to complete sign up');
    router.replace('/(auth)/login');
  };

  return (
    <Screen title="Create account" subtitle="Sign up to get started">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Section>
          <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Button variant="primary" size="lg" fullWidth loading={loading} onPress={onSignup}>
            Sign Up
          </Button>
        </Section>
        <Section>
          <View className="flex-row justify-center gap-1">
            <Text className="text-muted-foreground">Already have an account?</Text>
            <Link href="/(auth)/login" asChild>
              <Text className="text-primary">Sign in</Text>
            </Link>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  );
}


