import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';
import * as Haptics from 'expo-haptics';
import Screen from '../components/ui/Screen';

interface RatingCategory {
  id: string;
  title: string;
  description: string;
  rating: number;
}

const ratingCategories: RatingCategory[] = [
  {
    id: 'overall',
    title: 'Overall Experience',
    description: 'How was your overall experience?',
    rating: 0
  },
  {
    id: 'quality',
    title: 'Service Quality',
    description: 'How satisfied are you with the cleaning quality?',
    rating: 0
  },
  {
    id: 'delivery',
    title: 'Delivery Service',
    description: 'How was the pickup and delivery experience?',
    rating: 0
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'How well did we keep you informed?',
    rating: 0
  }
];

export default function OrderRatingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [ratings, setRatings] = useState<RatingCategory[]>(ratingCategories);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRating = (categoryId: string, rating: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRatings(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, rating } : cat
      )
    );
  };

  const getAverageRating = () => {
    const total = ratings.reduce((sum, cat) => sum + cat.rating, 0);
    return total / ratings.length;
  };

  const canSubmit = () => {
    return ratings.every(cat => cat.rating > 0) && review.trim().length > 0;
  };

  const handleSubmit = async () => {
    if (!canSubmit()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    
    Alert.alert(
      'Thank You!',
      'Your review has been submitted successfully. We appreciate your feedback!',
      [
        {
          text: 'Continue',
          onPress: () => router.push('/order-history' as any)
        }
      ]
    );
  };

  const renderStars = (category: RatingCategory) => {
    return (
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRating(category.id, star)}
            className="p-1"
          >
            <Text className="text-2xl">
              {star <= category.rating ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Screen title="Rate Your Order">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Order Info */}
          <View className="bg-card rounded-2xl p-6 border border-border mb-6">
            <Text className="text-lg font-semibold text-foreground mb-2">
              Order #{orderId || 'EZ-2024-002'}
            </Text>
            <Text className="text-muted-foreground">
              We hope you enjoyed our service! Please share your experience to help us improve.
            </Text>
          </View>

          {/* Overall Rating */}
          <View className="bg-card rounded-2xl p-6 border border-border mb-6">
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground mb-2">
                {getAverageRating() > 0 ? getAverageRating().toFixed(1) : '0.0'}
              </Text>
              <View className="flex-row gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} className="text-2xl">
                    {star <= getAverageRating() ? '⭐' : '☆'}
                  </Text>
                ))}
              </View>
              <Text className="text-muted-foreground text-center">
                {getAverageRating() >= 4.5 ? 'Excellent!' : 
                 getAverageRating() >= 3.5 ? 'Good!' : 
                 getAverageRating() >= 2.5 ? 'Fair' : 
                 getAverageRating() > 0 ? 'Poor' : 'Rate your experience'}
              </Text>
            </View>
          </View>

          {/* Rating Categories */}
          <View className="gap-4 mb-6">
            {ratings.map((category) => (
              <View key={category.id} className="bg-card rounded-2xl p-6 border border-border">
                <Text className="font-semibold text-foreground mb-1">{category.title}</Text>
                <Text className="text-muted-foreground text-sm mb-4">{category.description}</Text>
                {renderStars(category)}
              </View>
            ))}
          </View>

          {/* Review Text */}
          <View className="bg-card rounded-2xl p-6 border border-border mb-6">
            <Text className="font-semibold text-foreground mb-3">Tell us more</Text>
            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Share your experience, suggestions, or any feedback..."
              multiline
              numberOfLines={6}
              className="bg-background rounded-xl p-4 text-foreground min-h-[120px]"
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-muted-foreground text-xs mt-2 text-right">
              {review.length}/500 characters
            </Text>
          </View>

          {/* Quick Feedback */}
          <View className="mb-6">
            <Text className="font-semibold text-foreground mb-3">What went well?</Text>
            <View className="flex-row flex-wrap gap-2">
              {[
                'Fast delivery',
                'Great quality',
                'Professional service',
                'Easy to use',
                'Good communication',
                'Clean packaging'
              ].map((tag) => (
                <TouchableOpacity
                  key={tag}
                  className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
                >
                  <Text className="text-primary font-medium text-sm">{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <Button
            variant="primary"
            size="lg"
            onPress={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="mb-4"
          >
            <Text className="font-semibold text-lg">
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Text>
          </Button>

          <TouchableOpacity
            onPress={() => router.push('/order-history' as any)}
            className="items-center py-4"
          >
            <Text className="text-muted-foreground">Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}
