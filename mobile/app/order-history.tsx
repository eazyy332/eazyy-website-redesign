import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/ui/Icon';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';

type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  orderDate: string;
  deliveryDate?: string;
  pickupAddress: string;
  deliveryAddress: string;
  paymentMethod: string;
  specialInstructions?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'EZ-2024-001',
    status: 'delivered',
    items: [
      { id: '1', name: 'Regular Bag (up to 10 lbs)', quantity: 1, price: 24.99, category: 'eazzy-bag' },
      { id: '2', name: 'Dress Shirt', quantity: 3, price: 4.99, category: 'wash-iron' }
    ],
    total: 39.96,
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    pickupAddress: '123 Main St, New York, NY 10001',
    deliveryAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: '2',
    orderNumber: 'EZ-2024-002',
    status: 'processing',
    items: [
      { id: '3', name: 'Suit Jacket', quantity: 1, price: 15.99, category: 'dry-cleaning' },
      { id: '4', name: 'Trousers', quantity: 2, price: 6.99, category: 'wash-iron' }
    ],
    total: 29.97,
    orderDate: '2024-01-20',
    pickupAddress: '456 Oak Ave, New York, NY 10002',
    deliveryAddress: '456 Oak Ave, New York, NY 10002',
    paymentMethod: 'Mastercard •••• 8888',
    specialInstructions: 'Please handle with extra care'
  },
  {
    id: '3',
    orderNumber: 'EZ-2024-003',
    status: 'ready',
    items: [
      { id: '5', name: 'Large Bag (up to 15 lbs)', quantity: 1, price: 34.99, category: 'eazzy-bag' }
    ],
    total: 34.99,
    orderDate: '2024-01-22',
    pickupAddress: '789 Pine St, New York, NY 10003',
    deliveryAddress: '789 Pine St, New York, NY 10003',
    paymentMethod: 'PayPal'
  }
];

export default function OrderHistoryScreen() {
  const [orders] = useState(mockOrders);
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: OrderStatus): 'primary' | 'success' | 'warning' | 'neutral' => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'ready': return 'success';
      case 'delivered': return 'success';
      case 'cancelled': return 'neutral';
      default: return 'neutral';
    }
  };

  const getStatusText = (status: OrderStatus): string => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'processing': return 'In Progress';
      case 'ready': return 'Ready for Pickup';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const filteredOrders = orders
    .filter(order => selectedFilter === 'all' || order.status === selectedFilter)
    .filter(order => 
      searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const filters: Array<{label: string, value: OrderStatus | 'all'}> = [
    { label: 'All', value: 'all' },
    { label: 'Processing', value: 'processing' },
    { label: 'Ready', value: 'ready' },
    { label: 'Delivered', value: 'delivered' }
  ];

  return (
    <Screen title="Order History">
      <Section>
        {/* Search Bar */}
        <View className="bg-muted rounded-2xl px-4 py-3 mb-4 flex-row items-center">
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search orders by number or items..."
            className="flex-1 ml-3 text-foreground"
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          <View className="flex-row gap-2 pb-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                onPress={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full border ${
                  selectedFilter === filter.value
                    ? 'bg-primary border-primary'
                    : 'bg-transparent border-border'
                }`}
              >
                <Text className={`font-medium ${
                  selectedFilter === filter.value
                    ? 'text-white'
                    : 'text-muted-foreground'
                }`}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Section>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {filteredOrders.length === 0 ? (
            <View className="items-center py-20">
              <View className="w-24 h-24 bg-muted rounded-full items-center justify-center mb-4">
                <Icon name="history" size={32} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-semibold text-foreground mb-2">No orders found</Text>
              <Text className="text-muted-foreground text-center mb-6">
                {selectedFilter === 'all' 
                  ? "You haven't placed any orders yet. Start your first order today!"
                  : `No ${selectedFilter} orders found.`
                }
              </Text>
              {selectedFilter === 'all' && (
                <Button variant="primary" onPress={() => router.push('/services')}>
                  Start First Order
                </Button>
              )}
            </View>
          ) : (
            <View className="gap-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} variant="default" className="p-0">
                  <TouchableOpacity 
                    onPress={() => {
                      // Navigate to order tracking
                      router.push({ pathname: '/order-tracking', params: { orderId: order.id } });
                    }}
                    className="p-4"
                  >
                    {/* Order Header */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View>
                        <Text className="font-bold text-foreground text-lg">
                          {order.orderNumber}
                        </Text>
                        <Text className="text-muted-foreground text-sm">
                          Ordered {new Date(order.orderDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </View>

                    {/* Order Items Summary */}
                    <View className="mb-4">
                      <Text className="text-muted-foreground text-sm mb-2">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </Text>
                      <View className="gap-1">
                        {order.items.slice(0, 2).map((item) => (
                          <Text key={item.id} className="text-foreground text-sm">
                            {item.quantity}× {item.name}
                          </Text>
                        ))}
                        {order.items.length > 2 && (
                          <Text className="text-muted-foreground text-sm">
                            +{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Order Total */}
                    <View className="flex-row items-center justify-between mb-4">
                      <Text className="text-muted-foreground">Total</Text>
                      <Text className="font-bold text-foreground text-lg">
                        €{order.total.toFixed(2)}
                      </Text>
                    </View>

                    {/* Delivery Info */}
                    {order.deliveryDate && (
                      <View className="bg-accent/20 rounded-lg p-3 mb-4">
                        <Text className="text-accent-foreground text-sm font-medium">
                          Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                        </Text>
                      </View>
                    )}

                    {/* Quick Actions */}
                    <View className="flex-row gap-2 pt-2 border-t border-border">
                      <TouchableOpacity 
                        className="flex-1 bg-primary/10 py-2 rounded-lg"
                        onPress={() => {
                          // Reorder functionality
                          router.push('/services');
                        }}
                      >
                        <Text className="text-primary text-center font-medium text-sm">
                          Reorder
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        className="flex-1 bg-muted py-2 rounded-lg"
                        onPress={() => {
                          // View receipt
                        }}
                      >
                        <Text className="text-foreground text-center font-medium text-sm">
                          View Receipt
                        </Text>
                      </TouchableOpacity>

                      {order.status === 'delivered' && (
                        <TouchableOpacity 
                          className="flex-1 bg-accent/20 py-2 rounded-lg"
                          onPress={() => {
                            router.push({ pathname: '/order-rating', params: { orderId: order.id } });
                          }}
                        >
                          <Text className="text-accent-foreground text-center font-medium text-sm">
                            Rate Order
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                </Card>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
