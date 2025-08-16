import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  email?: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    brand: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2028,
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    brand: 'mastercard',
    last4: '8888',
    expiryMonth: 6,
    expiryYear: 2027,
    isDefault: false
  },
  {
    id: '3',
    type: 'paypal',
    email: 'user@example.com',
    isDefault: false
  }
];

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const setAsDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const removePaymentMethod = (id: string) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          }
        }
      ]
    );
  };

  const getCardIcon = (brand?: string) => {
    switch (brand) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'paypal': return '🅿️';
      case 'apple_pay': return '🍎';
      case 'google_pay': return '🔵';
      default: return '💳';
    }
  };

  const formatCardNumber = (last4?: string) => {
    return last4 ? `•••• •••• •••• ${last4}` : '';
  };

  return (
    <Screen title="Payment Methods">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Section>
          {/* Add Payment Method */}
          <TouchableOpacity 
            className="bg-card rounded-2xl p-4 border-2 border-dashed border-primary/30 mb-6"
            onPress={() => {
              // Navigate to add payment method screen
              Alert.alert('Add Payment Method', 'This would open the add payment method flow');
            }}
          >
            <View className="flex-row items-center justify-center py-4">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
                <Icon name="plus" size={24} color="#2675f5" />
              </View>
              <Text className="text-primary font-semibold text-lg">Add Payment Method</Text>
            </View>
          </TouchableOpacity>

          {/* Payment Methods List */}
          <View className="gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} variant="default" className="p-0">
                <View className="p-4">
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Text className="text-2xl mr-3">
                        {method.type === 'card' 
                          ? getCardIcon(method.brand)
                          : getPaymentMethodIcon(method.type)
                        }
                      </Text>
                      <View>
                        {method.type === 'card' ? (
                          <>
                            <Text className="font-semibold text-foreground capitalize">
                              {method.brand} Card
                            </Text>
                            <Text className="text-muted-foreground text-sm">
                              {formatCardNumber(method.last4)}
                            </Text>
                            <Text className="text-muted-foreground text-xs">
                              Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                            </Text>
                          </>
                        ) : method.type === 'paypal' ? (
                          <>
                            <Text className="font-semibold text-foreground">PayPal</Text>
                            <Text className="text-muted-foreground text-sm">{method.email}</Text>
                          </>
                        ) : (
                          <Text className="font-semibold text-foreground capitalize">
                            {method.type.replace('_', ' ')}
                          </Text>
                        )}
                      </View>
                    </View>

                    {method.isDefault && (
                      <View className="bg-primary/10 px-3 py-1 rounded-full">
                        <Text className="text-primary text-xs font-semibold">Default</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row gap-2">
                    {!method.isDefault && (
                      <TouchableOpacity
                        onPress={() => setAsDefault(method.id)}
                        className="flex-1 bg-primary/10 py-2 rounded-lg"
                      >
                        <Text className="text-primary text-center font-medium text-sm">
                          Set as Default
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      onPress={() => removePaymentMethod(method.id)}
                      className="flex-1 bg-destructive/10 py-2 rounded-lg"
                    >
                      <Text className="text-destructive text-center font-medium text-sm">
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {paymentMethods.length === 0 && (
            <View className="items-center py-20">
              <View className="w-24 h-24 bg-muted rounded-full items-center justify-center mb-4">
                <Icon name="creditCard" size={32} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-semibold text-foreground mb-2">No payment methods</Text>
              <Text className="text-muted-foreground text-center mb-6">
                Add a payment method to make ordering quick and easy.
              </Text>
              <Button variant="primary" onPress={() => {}}>
                Add Payment Method
              </Button>
            </View>
          )}
        </Section>
      </ScrollView>
    </Screen>
  );
}
