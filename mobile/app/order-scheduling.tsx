import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import Screen from '../components/ui/Screen';
import StickyFooter from '../components/ui/StickyFooter';
import Section from '../components/ui/Section';
import { useToast } from '../components/ui/Toast';

const timeSlots = [
  { id: '9-12', label: '9:00 AM - 12:00 PM', popular: false },
  { id: '12-15', label: '12:00 PM - 3:00 PM', popular: true },
  { id: '15-18', label: '3:00 PM - 6:00 PM', popular: false },
  { id: '18-21', label: '6:00 PM - 9:00 PM', popular: false },
];

const services = [
  { id: 'standard', name: 'Standard Service', time: '2-3 days', price: 0, description: 'Regular processing time' },
  { id: 'express', name: 'Express Service', time: '24 hours', price: 5, description: 'Rush processing', popular: true },
  { id: 'same-day', name: 'Same Day Service', time: 'Same day', price: 15, description: 'Pick up and deliver today' },
];

export default function OrderScheduling() {
  const [selectedPickupDate, setSelectedPickupDate] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [selectedService, setSelectedService] = useState('standard');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        id: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
        full: date.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }),
        disabled: i === 0 && new Date().getHours() > 18 // Disable today if after 6 PM
      });
    }
    return days;
  };

  const handleSubmit = async () => {
    if (!selectedPickupDate || !selectedPickupTime) {
      Alert.alert('Missing Information', 'Please select pickup date and time.');
      showToast('Select pickup date and time', 'error');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    showToast('Schedule saved', 'success');
    
    router.push('/order-payment');
  };

  const nextDays = getNextDays();

  return (
    <Screen title="Schedule Pickup" subtitle="When would you like us to collect and deliver your items?">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Section>
        {/* Progress Indicator */}
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center flex-1">
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Icon name="check" size={16} color="white" />
            </View>
            <View className="flex-1 h-0.5 bg-primary mx-2" />
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Icon name="check" size={16} color="white" />
            </View>
            <View className="flex-1 h-0.5 bg-primary mx-2" />
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <Text className="text-white font-bold text-sm">3</Text>
            </View>
          </View>
        </View>
        </Section>

        {/* Service Type Selection */}
        <Section title="Service Speed">
        <Card variant="feature" className="mb-6">
          <View className="mt-4 gap-3">
            {services.map(service => (
              <TouchableOpacity
                key={service.id}
                onPress={() => setSelectedService(service.id)}
                className={`p-4 rounded-2xl border-2 ${
                  selectedService === service.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card'
                }`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className={`font-semibold ${
                        selectedService === service.id ? 'text-primary' : 'text-foreground'
                      }`}>
                        {service.name}
                      </Text>
                      {service.popular && (
                        <View className="bg-primary/10 px-2 py-1 rounded-full ml-2">
                          <Text className="text-primary text-xs font-medium">Popular</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-muted-foreground text-sm mb-1">{service.description}</Text>
                    <Text className="text-foreground font-medium">{service.time}</Text>
                  </View>
                  <Text className="text-primary font-bold text-lg">
                    {service.price === 0 ? 'Free' : `+$${service.price}`}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        </Section>

        {/* Pickup Date Selection */}
        <Section title="Pickup Date">
        <Card variant="feature" className="mb-6">
          <View className="mt-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
              <View className="flex-row gap-3 pr-4">
                {nextDays.map(day => (
                  <TouchableOpacity
                    key={day.id}
                    onPress={() => !day.disabled && setSelectedPickupDate(day.id)}
                    disabled={day.disabled}
                    className={`px-4 py-3 rounded-2xl border-2 min-w-[100] items-center ${
                      day.disabled
                        ? 'border-border bg-muted opacity-50'
                        : selectedPickupDate === day.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <Text className={`font-medium text-sm ${
                      day.disabled
                        ? 'text-muted-foreground'
                        : selectedPickupDate === day.id
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}>
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Card>
        </Section>

        {/* Pickup Time Selection */}
        <Section title="Pickup Time">
        <Card variant="feature" className="mb-6">
          <View className="mt-4 gap-3">
            {timeSlots.map(slot => (
              <TouchableOpacity
                key={slot.id}
                onPress={() => setSelectedPickupTime(slot.id)}
                className={`p-4 rounded-2xl border-2 flex-row justify-between items-center ${
                  selectedPickupTime === slot.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card'
                }`}
              >
                <View className="flex-row items-center">
                  <Icon 
                    name="clock" 
                    size={20} 
                    color={selectedPickupTime === slot.id ? '#2675f5' : '#9CA3AF'} 
                    className="mr-3" 
                  />
                  <Text className={`font-medium ${
                    selectedPickupTime === slot.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {slot.label}
                  </Text>
                </View>
                {slot.popular && (
                  <View className="bg-primary/10 px-2 py-1 rounded-full">
                    <Text className="text-primary text-xs font-medium">Popular</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        </Section>

        {/* Order Summary */}
        <Section title="Order Summary">
        <Card variant="feature" className="mb-8">
          <View className="mt-4">
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-muted-foreground">Service Type:</Text>
              <Text className="text-foreground font-medium">
                {services.find(s => s.id === selectedService)?.name}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-muted-foreground">Pickup Date:</Text>
              <Text className="text-foreground font-medium">
                {selectedPickupDate ? nextDays.find(d => d.id === selectedPickupDate)?.full : 'Not selected'}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-2">
              <Text className="text-muted-foreground">Pickup Time:</Text>
              <Text className="text-foreground font-medium">
                {selectedPickupTime ? timeSlots.find(t => t.id === selectedPickupTime)?.label : 'Not selected'}
              </Text>
            </View>
            <View className="border-t border-border mt-3 pt-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground font-semibold">Express Fee:</Text>
                <Text className="text-primary font-bold text-lg">
                  {services.find(s => s.id === selectedService)?.price === 0 ? 'Free' : `$${services.find(s => s.id === selectedService)?.price}`}
                </Text>
              </View>
            </View>
          </View>
        </Card>
        </Section>

      </ScrollView>
      <StickyFooter>
        <Button 
          variant="primary" 
          size="lg" 
          fullWidth 
          loading={loading}
          onPress={handleSubmit}
        >
          Continue to Payment
        </Button>
      </StickyFooter>
    </Screen>
  );
}


