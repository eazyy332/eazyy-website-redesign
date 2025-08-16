import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export default function Input({ 
  label, 
  error, 
  containerClassName = '', 
  className = '',
  ...props 
}: InputProps) {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-foreground font-medium mb-2 text-base">
          {label}
        </Text>
      )}
      
      <TextInput
        className={`
          bg-input border border-border rounded-xl px-4 py-4
          text-foreground text-base
          focus:border-primary focus:bg-background
          ${error ? 'border-destructive' : ''}
          ${className}
        `}
        placeholderTextColor="#6B7280"
        {...props}
      />
      
      {error && (
        <Text className="text-destructive text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
