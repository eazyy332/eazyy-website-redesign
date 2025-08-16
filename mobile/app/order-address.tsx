import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';
import StickyFooter from '../components/ui/StickyFooter';
import { useToast } from '../components/ui/Toast';

export default function OrderAddress() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      showToast('Please complete all required fields', 'error');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    showToast('Address saved', 'success');
    
    router.push('/order-scheduling');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Screen title="Delivery Address" subtitle="Where should we pick up and deliver your items?">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Progress Indicator */}
        <Section>
          <View className="flex-row items-center">
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                <Icon name="check" size={16} color="white" />
              </View>
              <View className="flex-1 h-0.5 bg-primary mx-2" />
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                <Text className="text-white font-bold text-sm">2</Text>
              </View>
              <View className="flex-1 h-0.5 bg-border mx-2" />
              <View className="w-8 h-8 bg-border rounded-full items-center justify-center">
                <Text className="text-muted-foreground font-bold text-sm">3</Text>
              </View>
            </View>
          </View>
        </Section>

        {/* Contact Information */}
        <Section>
          <Card title="Contact Information" variant="feature">
            <View className="mt-4">
            <Input
              label="Full Name *"
              value={formData.fullName}
              onChangeText={(value) => updateField('fullName', value)}
              placeholder="Enter your full name"
            />
            <Input
              label="Phone Number *"
              value={formData.phone}
              onChangeText={(value) => updateField('phone', value)}
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
            />
            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            </View>
          </Card>
        </Section>

        {/* Pickup Address */}
        <Section>
          <Card title="Pickup & Delivery Address" variant="feature">
            <View className="mt-4">
            <Input
              label="Street Address *"
              value={formData.address}
              onChangeText={(value) => updateField('address', value)}
              placeholder="123 Main Street"
            />
            <Input
              label="Apartment, Suite, etc."
              value={formData.apartment}
              onChangeText={(value) => updateField('apartment', value)}
              placeholder="Apt 4B (optional)"
            />
            <View className="flex-row gap-3">
              <Input
                label="City *"
                value={formData.city}
                onChangeText={(value) => updateField('city', value)}
                placeholder="New York"
                containerClassName="flex-1"
              />
              <Input
                label="ZIP Code *"
                value={formData.zipCode}
                onChangeText={(value) => updateField('zipCode', value)}
                placeholder="10001"
                containerClassName="flex-1"
                keyboardType="numeric"
              />
            </View>
            </View>
          </Card>
        </Section>

        {/* Delivery Instructions */}
        <Section>
          <Card title="Special Instructions" variant="feature">
            <View className="mt-4">
            <Input
              label="Delivery Instructions (Optional)"
              value={formData.instructions}
              onChangeText={(value) => updateField('instructions', value)}
              placeholder="e.g., Leave at front door, Ring doorbell twice..."
              multiline
              numberOfLines={3}
            />
            </View>
          </Card>
        </Section>

        {/* Quick Address Options */}
        <Section title="Quick Options">
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 p-4 bg-accent/20 rounded-2xl border border-border items-center">
              <Icon name="home" size={24} color="#2675f5" className="mb-2" />
              <Text className="text-foreground font-medium">Use Current Location</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 p-4 bg-accent/20 rounded-2xl border border-border items-center">
              <Icon name="bookmark" size={24} color="#2675f5" className="mb-2" />
              <Text className="text-foreground font-medium">Saved Address</Text>
            </TouchableOpacity>
          </View>
        </Section>

        
      </ScrollView>
      <StickyFooter>
        <Button variant="primary" size="lg" fullWidth loading={loading} onPress={handleSubmit}>
          Continue to Scheduling
        </Button>
      </StickyFooter>
    </Screen>
  );
}


