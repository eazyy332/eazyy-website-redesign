import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Screen from '../components/ui/Screen';

interface Address {
  id: string;
  label: string;
  name: string;
  address: string;
  apartment?: string;
  city: string;
  zipCode: string;
  phone: string;
  instructions?: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    label: 'Home',
    name: 'John Doe',
    address: '123 Main Street',
    apartment: 'Apt 4B',
    city: 'New York',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    instructions: 'Ring doorbell twice',
    isDefault: true
  },
  {
    id: '2',
    label: 'Work',
    name: 'John Doe',
    address: '456 Business Ave',
    city: 'New York',
    zipCode: '10002',
    phone: '+1 (555) 123-4567',
    instructions: 'Leave with reception',
    isDefault: false
  }
];

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState(mockAddresses);

  const setAsDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
  };

  const removeAddress = (id: string) => {
    Alert.alert(
      'Remove Address',
      'Are you sure you want to remove this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(address => address.id !== id));
          }
        }
      ]
    );
  };

  const formatAddress = (address: Address) => {
    return `${address.address}${address.apartment ? `, ${address.apartment}` : ''}, ${address.city}, ${address.zipCode}`;
  };

  return (
    <Screen title="Saved Addresses">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Add Address */}
          <TouchableOpacity 
            className="bg-card rounded-2xl p-4 border-2 border-dashed border-primary/30 mb-6"
            onPress={() => {
              // Navigate to add address screen
              Alert.alert('Add Address', 'This would open the add address form');
            }}
          >
            <View className="flex-row items-center justify-center py-4">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
                <Icon name="plus" size={24} color="#2675f5" />
              </View>
              <Text className="text-primary font-semibold text-lg">Add New Address</Text>
            </View>
          </TouchableOpacity>

          {/* Addresses List */}
          <View className="gap-4">
            {addresses.map((address) => (
              <Card key={address.id} variant="default" className="p-0">
                <View className="p-4">
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-row items-start">
                      <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3 mt-1">
                        <Icon name="home" size={20} color="#2675f5" />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="font-bold text-foreground text-lg">{address.label}</Text>
                          {address.isDefault && (
                            <View className="bg-primary/10 px-2 py-1 rounded-full ml-2">
                              <Text className="text-primary text-xs font-semibold">Default</Text>
                            </View>
                          )}
                        </View>
                        <Text className="font-semibold text-foreground mb-1">{address.name}</Text>
                        <Text className="text-muted-foreground text-sm leading-5 mb-1">
                          {formatAddress(address)}
                        </Text>
                        <Text className="text-muted-foreground text-sm">{address.phone}</Text>
                        {address.instructions && (
                          <View className="bg-accent/20 rounded-lg p-2 mt-2">
                            <Text className="text-accent-foreground text-xs">
                              📝 {address.instructions}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                  <View className="flex-row gap-2 pt-3 border-t border-border">
                    <TouchableOpacity
                      onPress={() => {
                        // Edit address
                        Alert.alert('Edit Address', 'This would open the edit address form');
                      }}
                      className="flex-1 bg-muted py-2 rounded-lg"
                    >
                      <Text className="text-foreground text-center font-medium text-sm">
                        Edit
                      </Text>
                    </TouchableOpacity>

                    {!address.isDefault && (
                      <TouchableOpacity
                        onPress={() => setAsDefault(address.id)}
                        className="flex-1 bg-primary/10 py-2 rounded-lg"
                      >
                        <Text className="text-primary text-center font-medium text-sm">
                          Set as Default
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      onPress={() => removeAddress(address.id)}
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

          {addresses.length === 0 && (
            <View className="items-center py-20">
              <View className="w-24 h-24 bg-muted rounded-full items-center justify-center mb-4">
                <Icon name="home" size={32} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-semibold text-foreground mb-2">No saved addresses</Text>
              <Text className="text-muted-foreground text-center mb-6">
                Add an address to make ordering quick and easy.
              </Text>
              <Button variant="primary" onPress={() => {}}>
                Add Your First Address
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
