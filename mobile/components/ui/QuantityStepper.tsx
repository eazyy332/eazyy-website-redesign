import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

type Props = {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function QuantityStepper({ value, onDecrement, onIncrement }: Props) {
  return (
    <View className="flex-row items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
      <TouchableOpacity className="px-3 py-2" onPress={onDecrement} disabled={value <= 0}>
        <Icon name="chevronRight" size={18} color={value <= 0 ? '#9CA3AF' : '#111827'} style={{ transform: [{ rotate: '180deg' }] }} />
      </TouchableOpacity>
      <View className="px-3 py-2 min-w-[40] items-center">
        <Text className="text-black font-medium">{value}</Text>
      </View>
      <TouchableOpacity className="px-3 py-2" onPress={onIncrement}>
        <Icon name="chevronRight" size={18} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}


