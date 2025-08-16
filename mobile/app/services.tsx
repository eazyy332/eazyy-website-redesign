import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingCart from '../components/ui/FloatingCart';
import Screen from '../components/ui/Screen';
import { ServiceCardSkeleton } from '../components/ui/LoadingSkeleton';

const categories = [
  { 
    id: 'eazzy-bag', 
    name: 'eazzy Bag Service', 
    desc: "Fill our premium bag with mixed laundry. We sort, clean, and return everything perfectly organized.",
    icon: 'bag',
    price: 'From $15',
    features: ['Mixed items accepted', 'Professional sorting', 'Premium care']
  },
  { 
    id: 'wash-iron', 
    name: 'Wash & Iron', 
    desc: 'Complete wash and iron service with professional finishing for everyday garments.',
    icon: 'shirt',
    price: 'From $8',
    features: ['Machine wash', 'Professional ironing', 'Crisp finish']
  },
  { 
    id: 'dry-cleaning', 
    name: 'Dry Cleaning', 
    desc: 'Gentle dry cleaning for delicate fabrics and special garments requiring expert care.',
    icon: 'hanger',
    price: 'From $12',
    features: ['Delicate fabrics', 'Stain removal', 'Expert care']
  },
  { 
    id: 'repairs', 
    name: 'Repairs & Alterations', 
    desc: 'Professional tailoring services including hemming, repairs, and custom alterations.',
    icon: 'scissors',
    price: 'Quote on request',
    features: ['Hemming & alterations', 'Zipper replacement', 'Tear repairs']
  },
];

export default function ServicesScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = React.useState('');
  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories.filter((c) => q === '' || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  }, [search]);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <Screen title="Our Services" subtitle="Choose the perfect service for your needs">
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ], { useNativeDriver: true })}
      >
        <LinearGradient colors={["#2675f5", "#4F8AFF"]} start={{x:0,y:0}} end={{x:1,y:1}} style={{ margin: 16, borderRadius: 20, padding: 16 }}>
          <Text className="text-white/90 text-sm">Explore</Text>
          <Text className="text-white text-2xl font-semibold mt-1">Professional Laundry Care</Text>
          <View className="bg-white/15 rounded-2xl px-4 py-2 mt-3 flex-row items-center">
            <Text className="text-white/80">🔎</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search services..."
              placeholderTextColor="#E5E7EB"
              className="flex-1 ml-2 text-white"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text className="text-white/80">✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        <Animated.View className="gap-5 px-4 pt-3" style={{ opacity: scrollY.interpolate({ inputRange: [0, 150], outputRange: [1, 0.9], extrapolate: 'clamp' }), transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 150], outputRange: [0, -8], extrapolate: 'clamp' }) }] }}>
          <LinearGradient colors={["#ffffff", "#f3f4f6"]} start={{x:0,y:0}} end={{x:1,y:0}} style={{ height: 1, borderRadius: 8 }} />
          {loading ? (
            <View className="gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </View>
          ) : filtered.length === 0 ? (
            <View className="items-center py-20">
              <Text className="text-lg font-semibold text-foreground mb-2">No services found</Text>
              <Text className="text-muted-foreground">Try a different search term</Text>
            </View>
          ) : (
          filtered.map(service => (
            <Card 
              key={service.id}
              title={service.name}
              description={service.desc}
              icon={service.icon}
              variant="service"
            >
              <View className="mt-4">
                <Text className="text-primary font-bold text-xl mb-3">{service.price}</Text>
                
                <View className="gap-2 mb-4">
                  {service.features.map((feature, index) => (
                    <View key={index} className="flex-row items-center">
                      <View className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      <Text className="text-muted-foreground text-sm">{feature}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row gap-3">
                  <Link 
                    href={{ pathname: '/items/[category]', params: { category: service.id } }} 
                    asChild
                    className="flex-1"
                  >
                    <Button variant="primary" size="lg" fullWidth>
                      Select Items
                    </Button>
                  </Link>
                  
                  <Link href={{ pathname: '/services/[id]', params: { id: service.id } }} asChild>
                    <Button variant="outline" size="lg" className="px-4">
                      <Icon name="info" size={18} color="#2675f5" />
                    </Button>
                  </Link>
                </View>
              </View>
            </Card>
          ))}
          )}
        </Animated.View>

        {/* Bottom CTA */}
        <View className="mt-8 p-6 bg-accent/20 rounded-3xl border border-border">
          <View className="items-center">
            <Icon name="help" size={32} color="#2675f5" className="mb-3" />
            <Text className="text-lg font-semibold text-foreground mb-2">Need Help Choosing?</Text>
            <Text className="text-muted-foreground text-center mb-4">
              Our experts are here to help you select the perfect service for your needs.
            </Text>
            <Link href="/contact" asChild>
              <Button variant="primary" size="lg">
                Contact Support
              </Button>
            </Link>
          </View>
        </View>
      </Animated.ScrollView>
      <FloatingCart />
    </Screen>
  );
}


