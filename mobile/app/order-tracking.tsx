import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../components/ui/Icon';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import * as Haptics from 'expo-haptics';
import Screen from '../components/ui/Screen';
import StickyFooter from '../components/ui/StickyFooter';

type OrderStatus = 'pending' | 'confirmed' | 'pickup_scheduled' | 'picked_up' | 'processing' | 'ready' | 'out_for_delivery' | 'delivered';

interface OrderStep {
  status: OrderStatus;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  timestamp?: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  estimatedDelivery: string;
  pickupAddress: string;
  deliveryAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  driver?: {
    name: string;
    phone: string;
    photo: string;
  };
}

const orderSteps: OrderStep[] = [
  {
    status: 'pending',
    title: 'Order Placed',
    description: 'Your order has been received',
    icon: 'check',
    completed: true,
    timestamp: '2024-01-20 10:30 AM'
  },
  {
    status: 'confirmed',
    title: 'Order Confirmed',
    description: 'We\'ve confirmed your order details',
    icon: 'check',
    completed: true,
    timestamp: '2024-01-20 10:35 AM'
  },
  {
    status: 'pickup_scheduled',
    title: 'Pickup Scheduled',
    description: 'Pickup scheduled for tomorrow',
    icon: 'clock',
    completed: true,
    timestamp: '2024-01-20 11:00 AM'
  },
  {
    status: 'picked_up',
    title: 'Picked Up',
    description: 'Your items have been collected',
    icon: 'bag',
    completed: true,
    timestamp: '2024-01-21 09:15 AM'
  },
  {
    status: 'processing',
    title: 'In Processing',
    description: 'Your items are being cleaned',
    icon: 'iron',
    completed: true,
    timestamp: '2024-01-21 10:00 AM'
  },
  {
    status: 'ready',
    title: 'Ready for Delivery',
    description: 'Your order is ready',
    icon: 'check',
    completed: true,
    timestamp: '2024-01-21 02:30 PM'
  },
  {
    status: 'out_for_delivery',
    title: 'Out for Delivery',
    description: 'Your order is on its way',
    icon: 'home',
    completed: false,
    timestamp: '2024-01-21 03:00 PM'
  },
  {
    status: 'delivered',
    title: 'Delivered',
    description: 'Your order has been delivered',
    icon: 'check',
    completed: false
  }
];

const mockOrder: OrderDetails = {
  id: '1',
  orderNumber: 'EZ-2024-002',
  status: 'out_for_delivery',
  estimatedDelivery: 'Today, 4:00 PM - 6:00 PM',
  pickupAddress: '456 Oak Ave, New York, NY 10002',
  deliveryAddress: '456 Oak Ave, New York, NY 10002',
  items: [
    { name: 'Suit Jacket', quantity: 1, price: 15.99 },
    { name: 'Trousers', quantity: 2, price: 6.99 }
  ],
  total: 29.97,
  driver: {
    name: 'Mike Johnson',
    phone: '+1 (555) 987-6543',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
  }
};

export default function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetails>(mockOrder);
  const [currentStepIndex, setCurrentStepIndex] = useState(6); // out_for_delivery

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would fetch from API
      console.log('Checking for order updates...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return '#10B981';
      case 'out_for_delivery': return '#2675f5';
      case 'ready': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const handleCallDriver = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would open phone dialer
    console.log('Calling driver:', order.driver?.phone);
  };

  const handleRateOrder = () => {
    router.push('/order-rating' as any);
  };

  return (
    <Screen title="Order Tracking" subtitle={order.orderNumber}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Status Banner */}
        <View className="mx-4 mt-6">
          <LinearGradient
            colors={['#2675f5', '#4F8AFF']}
            className="rounded-2xl p-6"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-white text-lg font-semibold mb-1">
                  {order.status === 'out_for_delivery' ? 'On the Way!' : 'Order Status'}
                </Text>
                <Text className="text-white/90 text-sm">
                  Estimated delivery: {order.estimatedDelivery}
                </Text>
              </View>
              <Badge variant="neutral" className="bg-white/20">
                <Text className="text-white font-semibold">
                  {order.status.replace('_', ' ').toUpperCase()}
                </Text>
              </Badge>
            </View>

            {order.driver && order.status === 'out_for_delivery' && (
              <View className="bg-white/10 rounded-xl p-4">
                <Text className="text-white font-semibold mb-2">Your Driver</Text>
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: order.driver.photo }}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-white font-medium">{order.driver.name}</Text>
                    <Text className="text-white/80 text-sm">{order.driver.phone}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleCallDriver}
                    className="bg-white/20 rounded-full p-3"
                  >
                    <Icon name="phone" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Progress Timeline */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-semibold text-foreground mb-4">Order Progress</Text>
          
          <View className="gap-4">
            {orderSteps.map((step, index) => (
              <View key={step.status} className="flex-row">
                {/* Timeline Line */}
                <View className="items-center mr-4">
                  <View className={`w-8 h-8 rounded-full items-center justify-center ${
                    step.completed ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={step.icon as any} 
                      size={16} 
                      color={step.completed ? 'white' : '#9CA3AF'} 
                    />
                  </View>
                  {index < orderSteps.length - 1 && (
                    <View className={`w-0.5 h-12 mt-2 ${
                      step.completed ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </View>

                {/* Step Content */}
                <View className="flex-1 pb-4">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className={`font-semibold ${
                      step.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </Text>
                    {step.timestamp && (
                      <Text className="text-muted-foreground text-xs">
                        {step.timestamp}
                      </Text>
                    )}
                  </View>
                  <Text className="text-muted-foreground text-sm">
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Details */}
        <View className="px-4 mt-6 mb-6">
          <Text className="text-lg font-semibold text-foreground mb-4">Order Details</Text>
          
          <View className="bg-card rounded-2xl p-4 border border-border">
            <View className="gap-3 mb-4">
              {order.items.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Text className="text-foreground font-medium">{item.quantity}×</Text>
                    <Text className="text-foreground ml-2">{item.name}</Text>
                  </View>
                  <Text className="text-foreground font-semibold">€{item.price.toFixed(2)}</Text>
                </View>
              ))}
            </View>
            
            <View className="border-t border-border pt-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-foreground">Total</Text>
                <Text className="text-lg font-bold text-foreground">€{order.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Addresses */}
          <View className="mt-4 gap-4">
            <View className="bg-card rounded-2xl p-4 border border-border">
              <Text className="font-semibold text-foreground mb-2">Pickup Address</Text>
              <Text className="text-muted-foreground">{order.pickupAddress}</Text>
            </View>
            
            <View className="bg-card rounded-2xl p-4 border border-border">
              <Text className="font-semibold text-foreground mb-2">Delivery Address</Text>
              <Text className="text-muted-foreground">{order.deliveryAddress}</Text>
            </View>
          </View>

          {/* Actions */}
          <View className="mt-6 gap-3">
            {order.status === 'delivered' ? (
              <Button variant="primary" size="lg" onPress={handleRateOrder}>
                <Text className="font-semibold text-lg">Rate Your Order</Text>
              </Button>
            ) : (
              <Button variant="outline" size="lg" onPress={() => router.push('/help' as any)}>
                <Text className="font-semibold text-lg">Need Help?</Text>
              </Button>
            )}
            
            <Button variant="outline" size="lg" onPress={() => router.push('/order-history' as any)}>
              <Text className="font-semibold text-lg">View All Orders</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <StickyFooter>
        <View className="flex-row gap-2">
          <Button variant="outline" size="lg" onPress={() => router.push('/help' as any)}>
            <Text className="font-semibold">Need Help</Text>
          </Button>
          <Button variant="primary" size="lg" onPress={handleRateOrder}>
            <Text className="font-semibold text-white">Rate Order</Text>
          </Button>
        </View>
      </StickyFooter>
    </Screen>
  );
}
