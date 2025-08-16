import { useRef, useState } from 'react';
import { View, Text, ScrollView, Dimensions, Switch } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Premium Laundry, Effortless',
    subtitle: 'Pickup and delivery at your convenience with professional care.',
    icon: 'bag',
  },
  {
    title: 'Fast & Reliable',
    subtitle: 'Same-day and express options to fit your schedule.',
    icon: 'clock',
  },
  {
    title: 'Eco-Friendly Care',
    subtitle: 'Sustainable methods without compromising quality.',
    icon: 'eco',
  },
];

export default function Onboarding() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const [allowNotifications, setAllowNotifications] = useState(true);

  const onNext = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
      setIndex(prev => prev + 1);
    } else {
      complete();
    }
  };

  const skip = () => complete();

  const complete = async () => {
    try {
      if (allowNotifications) {
        await Notifications.requestPermissionsAsync();
      }
    } catch {}
    await AsyncStorage.setItem('onboarded', 'true');
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-end p-4">
        <Button variant="ghost" onPress={skip}>
          Skip
        </Button>
      </View>
      <ScrollView 
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
      >
        {slides.map((s, i) => (
          <View key={i} style={{ width }} className="items-center justify-center">
            <LinearGradient colors={["#2675f5", "#4F8AFF"]} start={{x:0,y:0}} end={{x:1,y:1}} style={{ width, height: 280, borderBottomLeftRadius: 48, borderBottomRightRadius: 48, paddingTop: 40, alignItems: 'center', justifyContent: 'center' }}>
              <View className="w-24 h-24 bg-white/20 rounded-3xl items-center justify-center">
                <Icon name={s.icon as any} size={40} color="#ffffff" />
              </View>
            </LinearGradient>
            <View className="px-6 mt-8">
              <Text className="text-3xl font-bold text-foreground text-center mb-3">{s.title}</Text>
              <Text className="text-muted-foreground text-center text-base leading-6 mb-8">{s.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="items-center mb-6">
        <View className="flex-row gap-2">
          {slides.map((_, i) => (
            <View key={i} className={`w-2 h-2 rounded-full ${i===index ? 'bg-primary' : 'bg-muted'} `} />
          ))}
        </View>
      </View>

      <View className="px-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-foreground">Enable notifications</Text>
          <Switch value={allowNotifications} onValueChange={setAllowNotifications} />
        </View>
      </View>

      <View className="px-6 pb-10">
        <Button variant="primary" size="lg" fullWidth onPress={onNext}>
          {index < slides.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </View>
    </View>
  );
}


