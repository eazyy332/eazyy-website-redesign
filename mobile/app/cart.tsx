import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import QuantityStepper from '../components/ui/QuantityStepper';
import Button from '../components/ui/Button';
import StickyFooter from '../components/ui/StickyFooter';
import Icon from '../components/ui/Icon';
import { router } from 'expo-router';

export default function CartScreen() {
  const { items: cart, decrementItem, addItem, removeItem, total } = useCart();

  return (
    <Screen title="Your Cart" subtitle={cart.length ? `${cart.length} items` : undefined}>
      {cart.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6 py-20">
          <View className="w-16 h-16 rounded-2xl bg-accent items-center justify-center mb-4">
            <Icon name="cart" size={28} color="#2675f5" />
          </View>
          <Text className="text-xl font-semibold text-foreground mb-1">Your cart is empty</Text>
          <Text className="text-muted-foreground text-center mb-6">Add items from our services to get started.</Text>
          <Button variant="primary" size="lg" onPress={() => router.push('/services')}>Browse Services</Button>
        </View>
      ) : (
        <>
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
            <Section title="Items">
              <View className="gap-3">
                {cart.map((it) => (
                  <Card key={`${it.serviceCategory}:${it.id}`} className="p-0">
                    <View className="p-4 flex-row items-center">
                      <View className="flex-1 pr-3">
                        <Text className="text-foreground font-semibold mb-1">{it.name}</Text>
                        <Text className="text-muted-foreground text-xs">{it.serviceCategory}</Text>
                      </View>
                      <View className="items-center mr-3">
                        <QuantityStepper
                          value={it.quantity}
                          onDecrement={() => decrementItem(it.serviceCategory, it.id)}
                          onIncrement={() => addItem({ id: it.id, name: it.name, price: it.price, serviceCategory: it.serviceCategory })}
                        />
                      </View>
                      <View className="items-end">
                        <Text className="text-primary font-bold">€{(it.price * it.quantity).toFixed(2)}</Text>
                        <TouchableOpacity className="mt-2" onPress={() => removeItem(it.serviceCategory, it.id)}>
                          <Text className="text-destructive text-xs">Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            </Section>

            <Section title="Summary">
              <Card className="p-0">
                <View className="p-4 gap-3">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-muted-foreground">Subtotal</Text>
                    <Text className="text-foreground font-medium">€{total.toFixed(2)}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-muted-foreground">Delivery</Text>
                    <Text className="text-foreground font-medium">Calculated at scheduling</Text>
                  </View>
                  <View className="border-t border-border pt-3 flex-row justify-between items-center">
                    <Text className="text-foreground font-semibold">Total</Text>
                    <Text className="text-primary font-bold text-xl">€{total.toFixed(2)}</Text>
                  </View>
                </View>
              </Card>
            </Section>
          </ScrollView>

          <StickyFooter>
            <Button variant="primary" size="lg" fullWidth onPress={() => router.push('/order-address')}>
              Continue to Address
            </Button>
          </StickyFooter>
        </>
      )}
    </Screen>
  );
}


