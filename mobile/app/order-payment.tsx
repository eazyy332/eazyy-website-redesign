import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';
import StickyFooter from '../components/ui/StickyFooter';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import * as Haptics from 'expo-haptics';
import { useToast } from '../components/ui/Toast';

type Method = 'card' | 'apple' | 'google' | 'paypal' | 'cash';

export default function OrderPayment() {
  const [method, setMethod] = useState<Method>('card');
  const [agree, setAgree] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { showToast } = useToast();

  const pay = () => {
    if (!agree) {
      Alert.alert('Terms', 'Please agree to the terms to continue.');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(()=>{});
      Alert.alert('Payment', 'Payment processed. Thank you!');
      showToast('Payment successful', 'success');
      // Navigate to confirmation after toast
      setTimeout(() => {
        // @ts-expect-error route exists
        router.push('/order-confirmation');
      }, 200);
    }, 1200);
  };

  return (
    <Screen title="Payment" subtitle="Choose how you want to pay">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Section>
          <Card title="Select Method" variant="feature">
            <View className="mt-3 gap-3">
              {([
                { key: 'card', label: 'Credit/Debit Card', icon: 'creditCard' },
                { key: 'apple', label: 'Apple Pay', icon: 'phone' },
                { key: 'google', label: 'Google Pay', icon: 'phone' },
                { key: 'paypal', label: 'PayPal', icon: 'mail' },
                { key: 'cash', label: 'Cash on Delivery', icon: 'home' },
              ] as Array<{ key: Method; label: string; icon: any }>).map((m) => (
                <TouchableOpacity
                  key={m.key}
                  onPress={() => setMethod(m.key)}
                  className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${
                    method === m.key ? 'border-primary bg-primary/5' : 'border-border bg-card'
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                      <Icon name={m.icon} size={20} color="#2675f5" />
                    </View>
                    <Text className="text-foreground font-medium">{m.label}</Text>
                  </View>
                  {method === m.key && (
                    <View className="bg-primary/10 px-3 py-1 rounded-full">
                      <Text className="text-primary text-xs font-semibold">Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </Section>

        <Section title="Summary">
          <Card variant="feature">
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-muted-foreground">Items</Text>
                <Text className="text-foreground font-medium">€97.95</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-muted-foreground">Delivery</Text>
                <Text className="text-foreground font-medium">Free</Text>
              </View>
              <View className="border-t border-border pt-3 flex-row items-center justify-between">
                <Text className="text-foreground font-bold">Total</Text>
                <Text className="text-foreground font-bold">€97.95</Text>
              </View>
            </View>
          </Card>
        </Section>

        <Section>
          <TouchableOpacity
            onPress={() => setAgree((a) => !a)}
            className="flex-row items-center"
          >
            <View className={`w-5 h-5 mr-3 rounded border ${agree ? 'bg-primary border-primary' : 'border-border'}`} />
            <Text className="text-muted-foreground text-sm">I agree to the Terms and Privacy Policy</Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>
      <StickyFooter>
        <Button variant="primary" size="lg" fullWidth onPress={pay} loading={processing} disabled={processing}>
          {processing ? 'Processing…' : 'Pay Now'}
        </Button>
      </StickyFooter>
    </Screen>
  );
}


