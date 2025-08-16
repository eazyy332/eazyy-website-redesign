import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Screen from '../components/ui/Screen';
import { RefreshControl } from 'react-native';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    orders: 12,
    savings: 245
  });
  const [counters] = useState({ addresses: 2, paymentMethods: 3, unread: 2 });
  const recentOrders = [
    { id: 'EZ-2024-003', date: '2024-01-22', total: 34.99, status: 'Ready' },
    { id: 'EZ-2024-002', date: '2024-01-20', total: 29.97, status: 'Processing' },
  ];

  const menuItems = [
    { id: 'orders', title: 'Order History', icon: 'history', subtitle: `${user.orders} orders completed`, route: '/order-history' },
    { id: 'addresses', title: 'Saved Addresses', icon: 'home', subtitle: 'Manage pickup locations', route: '/addresses' },
    { id: 'payment', title: 'Payment Methods', icon: 'creditCard', subtitle: 'Cards and billing', route: '/payment-methods' },
    { id: 'notifications', title: 'Notifications', icon: 'bell', subtitle: 'Order updates & offers', route: '/notifications' },
    { id: 'messages', title: 'Messages', icon: 'message', subtitle: 'Support conversations', route: '/messages' },
    { id: 'help', title: 'Help & Support', icon: 'help', subtitle: 'FAQ and contact us', route: '/help' },
    { id: 'about', title: 'About eazzy', icon: 'info', subtitle: 'Learn more about us', route: '/about' },
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          // Handle sign out
        }}
      ]
    );
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  };
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen title="Profile" subtitle="Manage your account and preferences">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Quick summary */}
        <Section>
          <View className="flex-row gap-3 mb-2">
            <Card variant="feature" className="flex-1">
              <View className="items-center py-2">
                <Text className="text-2xl font-bold text-primary mb-1">{counters.addresses}</Text>
                <Text className="text-muted-foreground text-sm">Addresses</Text>
              </View>
            </Card>
            <Card variant="feature" className="flex-1">
              <View className="items-center py-2">
                <Text className="text-2xl font-bold text-primary mb-1">{counters.paymentMethods}</Text>
                <Text className="text-muted-foreground text-sm">Payment</Text>
              </View>
            </Card>
            <Card variant="feature" className="flex-1">
              <View className="items-center py-2">
                <Text className="text-2xl font-bold text-primary mb-1">{counters.unread}</Text>
                <Text className="text-muted-foreground text-sm">Unread</Text>
              </View>
            </Card>
          </View>
        </Section>

        {/* Recent Orders */}
        <Section title="Recent orders" subtitle="Quick access to your latest orders">
          <View className="gap-3">
            {loading ? (
              <>
                <Card variant="default" className="p-0"><View className="p-4"><View className="h-5 bg-muted rounded mb-2" /><View className="h-4 bg-muted rounded w-2/3" /></View></Card>
                <Card variant="default" className="p-0"><View className="p-4"><View className="h-5 bg-muted rounded mb-2" /><View className="h-4 bg-muted rounded w-1/2" /></View></Card>
              </>
            ) : (
              recentOrders.map((o) => (
                <Card key={o.id} variant="default" className="p-0">
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: '/order-tracking', params: { orderId: o.id } } as any)}
                    className="p-4"
                  >
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-bold text-foreground">{o.id}</Text>
                      <Badge variant="primary">{o.status}</Badge>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-muted-foreground">{new Date(o.date).toLocaleDateString()}</Text>
                      <Text className="font-semibold text-foreground">€{o.total.toFixed(2)}</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              ))
            )}
          </View>
        </Section>

        {/* User Info Card */}
        <Card variant="feature" className="mb-6">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mr-4">
              <Icon name="user" size={32} color="#2675f5" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-foreground mb-1">{user.name}</Text>
              <Text className="text-muted-foreground mb-1">{user.email}</Text>
              <Text className="text-muted-foreground">{user.phone}</Text>
            </View>
            <TouchableOpacity className="p-2">
              <Icon name="edit" size={20} color="#2675f5" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Stats Cards */}
        <View className="flex-row gap-3 mb-8">
          <Card variant="feature" className="flex-1">
            <View className="items-center py-2">
              <Text className="text-2xl font-bold text-primary mb-1">{user.orders}</Text>
              <Text className="text-muted-foreground text-sm">Orders</Text>
            </View>
          </Card>
          
          <Card variant="feature" className="flex-1">
            <View className="items-center py-2">
              <Text className="text-2xl font-bold text-primary mb-1">${user.savings}</Text>
              <Text className="text-muted-foreground text-sm">Saved</Text>
            </View>
          </Card>
        </View>

        {/* Menu Items */}
        <Section>
        <View className="gap-3">
          {menuItems.map(item => (
            <TouchableOpacity 
              key={item.id}
              className="bg-card rounded-2xl p-4 border border-border flex-row items-center"
              onPress={() => router.push(item.route as any)}
            >
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Icon name={item.icon as any} size={20} color="#2675f5" />
              </View>
              <View className="flex-1">
                <Text className="text-foreground font-semibold mb-1">{item.title}</Text>
                <Text className="text-muted-foreground text-sm">{item.subtitle}</Text>
              </View>
              <Icon name="chevronRight" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
        </Section>

        {/* Quick Actions */}
        <View className="gap-3 mb-8">
          <Link href="/services" asChild>
            <Button variant="primary" size="lg" fullWidth>
              Start New Order
            </Button>
          </Link>
          
          <Link href="/contact" asChild>
            <Button variant="outline" size="lg" fullWidth>
              Contact Support
            </Button>
          </Link>
        </View>

        {/* Sign Out */}
        <Button 
          variant="ghost" 
          size="lg" 
          fullWidth 
          onPress={handleSignOut}
          className="border border-destructive/20"
        >
          <Text className="text-destructive font-semibold">Sign Out</Text>
        </Button>

        {/* App Version */}
        <View className="items-center mt-8 pt-4 border-t border-border">
          <Text className="text-muted-foreground text-sm">eazzy v1.0.0</Text>
          <Text className="text-muted-foreground text-xs mt-1">Premium laundry service</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
