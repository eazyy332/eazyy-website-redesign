import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Icon from './Icon';

type Props = { title?: string };

export default function Header({ title }: Props) {
  return (
    <View className="flex-row items-center justify-between py-4 px-4">
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text className="text-2xl font-semibold text-[#2675f5]">eazzy</Text>
        </TouchableOpacity>
      </Link>

      <View className="flex-row items-center gap-4">
        <Link href="/help" asChild>
          <TouchableOpacity>
            <Icon name="phone" size={22} color="#2675f5" />
          </TouchableOpacity>
        </Link>
        <Link href="/cart" asChild>
          <TouchableOpacity>
            <Icon name="cart" size={22} color="#2675f5" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}


