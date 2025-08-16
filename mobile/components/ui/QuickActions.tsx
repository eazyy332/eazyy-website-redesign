import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from './Icon';
import * as Haptics from 'expo-haptics';

type Action = {
  id: string;
  title: string;
  icon: string;
  href: string;
  background?: string;
};

const actions: Action[] = [
  { id: 'reorder', title: 'Reorder', icon: 'history', href: '/services', background: '#E7F0FF' },
  { id: 'schedule', title: 'Schedule', icon: 'clock', href: '/order-scheduling', background: '#F3F4F6' },
  { id: 'support', title: 'Support', icon: 'help', href: '/contact', background: '#FCE7F3' },
];

export default function QuickActions() {
  return (
    <View className="flex-row gap-3 px-6 mb-8">
      {actions.map((a) => (
        <Link key={a.id} href={a.href as any} asChild>
          <TouchableOpacity
            className="flex-1 rounded-2xl items-center justify-center py-4"
            style={{ backgroundColor: a.background || '#F3F4F6' }}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.9}
          >
            <Icon name={a.icon as any} size={22} color="#2675f5" />
            <Text className="text-black font-semibold mt-2">{a.title}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}


