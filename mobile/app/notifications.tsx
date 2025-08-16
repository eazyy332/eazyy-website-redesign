import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Icon from '../components/ui/Icon';
import Badge from '../components/ui/Badge';
import Screen from '../components/ui/Screen';
import { RefreshControl } from 'react-native';

type NotificationType = 'order' | 'promotion' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  image?: string;
  actionText?: string;
  actionRoute?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Ready for Pickup',
    message: 'Your dry cleaning order #1234 is ready for pickup at our downtown location.',
    timestamp: '2 hours ago',
    read: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    actionText: 'View Order',
    actionRoute: '/cart'
  },
  {
    id: '2',
    type: 'promotion',
    title: '20% Off Next Order',
    message: 'Thank you for being a loyal customer! Enjoy 20% off your next laundry service.',
    timestamp: '1 day ago',
    read: false,
    actionText: 'Use Promo',
    actionRoute: '/services'
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your eazzy Bag order has been delivered to your address. Thank you!',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'New Service Area',
    message: 'We now offer pickup and delivery in your neighborhood! Schedule your first order today.',
    timestamp: '3 days ago',
    read: true,
    actionText: 'Schedule Now',
    actionRoute: '/services'
  }
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'order': return 'cart';
      case 'promotion': return 'tag';
      case 'system': return 'info';
      default: return 'bell';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'order': return '#2675f5';
      case 'promotion': return '#10B981';
      case 'system': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  };

  const rightAction = unreadCount > 0 ? (
    <TouchableOpacity onPress={markAllAsRead} className="px-2 py-1">
      <Text className="text-primary font-medium">Mark all</Text>
    </TouchableOpacity>
  ) : null;

  return (
    <Screen title="Notifications" subtitle={unreadCount > 0 ? `${unreadCount} unread` : undefined} rightAction={rightAction}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="px-4 py-2">
          {notifications.length === 0 ? (
            <View className="items-center py-20">
              <View className="w-24 h-24 bg-muted rounded-full items-center justify-center mb-4">
                <Icon name="bell" size={32} color="#9CA3AF" />
              </View>
              <Text className="text-xl font-semibold text-foreground mb-2">No notifications</Text>
              <Text className="text-muted-foreground text-center">
                We'll notify you about order updates, promotions, and important information.
              </Text>
            </View>
          ) : (
            <View className="gap-2">
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => {
                    markAsRead(notification.id);
                    if (notification.actionRoute) {
                      router.push(notification.actionRoute as any);
                    }
                  }}
                  className={`bg-card rounded-2xl p-4 border ${
                    notification.read ? 'border-border' : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  <View className="flex-row">
                    <View className="mr-3">
                      <View 
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${getNotificationColor(notification.type)}15` }}
                      >
                        <Icon 
                          name={getNotificationIcon(notification.type) as any} 
                          size={20} 
                          color={getNotificationColor(notification.type)} 
                        />
                      </View>
                      {!notification.read && (
                        <View className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                      )}
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-1">
                        <Text className={`font-semibold text-foreground flex-1 ${
                          !notification.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification.title}
                        </Text>
                        <Text className="text-xs text-muted-foreground ml-2">
                          {notification.timestamp}
                        </Text>
                      </View>

                      <Text className="text-muted-foreground text-sm leading-5 mb-3">
                        {notification.message}
                      </Text>

                      {notification.image && (
                        <Image 
                          source={{ uri: notification.image }}
                          className="w-16 h-16 rounded-lg mb-3"
                        />
                      )}

                      {notification.actionText && (
                        <View className="flex-row">
                          <Badge variant="primary">
                            {notification.actionText}
                          </Badge>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
