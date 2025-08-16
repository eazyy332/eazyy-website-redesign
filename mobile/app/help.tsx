import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import * as Haptics from 'expo-haptics';
import Screen from '../components/ui/Screen';
import StickyFooter from '../components/ui/StickyFooter';
import { RefreshControl } from 'react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'ordering' | 'delivery' | 'billing';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How does the pickup and delivery work?',
    answer: 'We offer convenient pickup and delivery at your doorstep. Simply schedule a pickup time, leave your items outside, and we\'ll collect them. Delivery is available at the same address or a different location of your choice.',
    category: 'delivery'
  },
  {
    id: '2',
    question: 'What types of items can you clean?',
    answer: 'We handle all types of clothing including shirts, pants, dresses, suits, coats, and delicate items. We also offer dry cleaning for items that require special care.',
    category: 'general'
  },
  {
    id: '3',
    question: 'How long does the service take?',
    answer: 'Standard service takes 24-48 hours. Express service is available for same-day or next-day delivery at an additional cost.',
    category: 'ordering'
  },
  {
    id: '4',
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with our service, we\'ll re-clean your items for free or provide a full refund.',
    category: 'general'
  },
  {
    id: '5',
    question: 'How do I track my order?',
    answer: 'You can track your order in real-time through the app. We\'ll send you notifications at each step of the process.',
    category: 'ordering'
  },
  {
    id: '6',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. Payment is processed securely at the time of order.',
    category: 'billing'
  }
];

const supportOptions = [
  {
    id: 'chat',
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: 'message',
    action: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Alert.alert('Live Chat', 'Connecting you to our support team...');
    }
  },
  {
    id: 'phone',
    title: 'Call Us',
    description: 'Speak with a customer service representative',
    icon: 'phone',
    action: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Alert.alert('Call Support', 'Calling +1 (555) 123-4567...');
    }
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: 'mail',
    action: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Alert.alert('Email Support', 'Opening email client...');
    }
  }
];

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'ordering' | 'delivery' | 'billing'>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'ordering', label: 'Ordering' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'billing', label: 'Billing' }
  ];

  const filteredFAQ = faqData.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
  };

  return (
    <Screen title="Help & Support">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="px-4 py-6">
          {/* Quick Support Options */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-foreground mb-4">Get Help Quickly</Text>
            <View className="gap-3">
              {supportOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={option.action}
                  className="bg-card rounded-2xl p-4 border border-border"
                >
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
                      <Icon name={option.icon as any} size={24} color="#2675f5" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold text-foreground text-lg">{option.title}</Text>
                      <Text className="text-muted-foreground">{option.description}</Text>
                    </View>
                    <Icon name="chevronRight" size={20} color="#9CA3AF" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Search FAQ */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</Text>
            
            <View className="bg-muted rounded-2xl px-4 py-3 mb-4 flex-row items-center">
              <Icon name="search" size={20} color="#9CA3AF" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search for answers..."
                className="flex-1 ml-3 text-foreground"
                placeholderTextColor="#9CA3AF"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Icon name="close" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row gap-2">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id as any)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === category.id
                        ? 'bg-primary border-primary'
                        : 'bg-transparent border-border'
                    }`}
                  >
                    <Text className={`font-medium ${
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'text-muted-foreground'
                    }`}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* FAQ List */}
          <View className="gap-3 mb-6">
            {filteredFAQ.length === 0 ? (
              <View className="items-center py-12">
                <View className="w-16 h-16 bg-muted rounded-full items-center justify-center mb-4">
                  <Icon name="help" size={32} color="#9CA3AF" />
                </View>
                <Text className="text-lg font-semibold text-foreground mb-2">No results found</Text>
                <Text className="text-muted-foreground text-center">
                  Try adjusting your search or contact our support team for help.
                </Text>
              </View>
            ) : (
              filteredFAQ.map((faq) => (
                <Card key={faq.id} variant="default" className="p-0">
                  <TouchableOpacity
                    onPress={() => toggleFAQ(faq.id)}
                    className="p-4"
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-foreground flex-1 mr-4">
                        {faq.question}
                      </Text>
                      <Icon 
                        name={expandedFAQ === faq.id ? 'chevronUp' : 'chevronDown'} 
                        size={20} 
                        color="#9CA3AF" 
                      />
                    </View>
                    
                    {expandedFAQ === faq.id && (
                      <View className="mt-4 pt-4 border-t border-border">
                        <Text className="text-muted-foreground leading-6">
                          {faq.answer}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </Card>
              ))
            )}
          </View>

          {/* Contact Information */}
          <View className="bg-card rounded-2xl p-6 border border-border">
            <Text className="text-lg font-semibold text-foreground mb-4">Contact Information</Text>
            
            <View className="gap-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Icon name="phone" size={20} color="#2675f5" />
                </View>
                <View>
                  <Text className="font-medium text-foreground">Phone Support</Text>
                  <Text className="text-muted-foreground">+1 (555) 123-4567</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Icon name="mail" size={20} color="#2675f5" />
                </View>
                <View>
                  <Text className="font-medium text-foreground">Email Support</Text>
                  <Text className="text-muted-foreground">support@eazzy.com</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                  <Icon name="clock" size={20} color="#2675f5" />
                </View>
                <View>
                  <Text className="font-medium text-foreground">Support Hours</Text>
                  <Text className="text-muted-foreground">Mon-Fri: 8AM-8PM, Sat: 9AM-6PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StickyFooter>
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={supportOptions[0].action} className="flex-1 bg-primary/10 py-3 rounded-2xl border border-primary/20">
            <Text className="text-primary text-center font-medium">Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={supportOptions[1].action} className="flex-1 bg-primary/10 py-3 rounded-2xl border border-primary/20">
            <Text className="text-primary text-center font-medium">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={supportOptions[2].action} className="flex-1 bg-primary/10 py-3 rounded-2xl border border-primary/20">
            <Text className="text-primary text-center font-medium">Email</Text>
          </TouchableOpacity>
        </View>
      </StickyFooter>
    </Screen>
  );
}


