import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: any };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.warn('UI error boundary caught:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold text-foreground mb-2">Something went wrong</Text>
          <Text className="text-muted-foreground text-center mb-4">Please try again. If the problem persists, contact support.</Text>
          <TouchableOpacity onPress={this.handleRetry} className="bg-primary px-5 py-3 rounded-2xl">
            <Text className="text-white font-medium">Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children as any;
  }
}

import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-background items-center justify-center px-6">
          <View className="items-center">
            <View className="w-20 h-20 bg-destructive/10 rounded-full items-center justify-center mb-6">
              <Icon name="info" size={32} color="#EF4444" />
            </View>
            
            <Text className="text-2xl font-bold text-foreground mb-3 text-center">
              Oops! Something went wrong
            </Text>
            
            <Text className="text-muted-foreground text-center mb-8 leading-6">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </Text>

            <TouchableOpacity
              onPress={this.handleRetry}
              className="bg-primary rounded-2xl px-8 py-4"
            >
              <Text className="text-white font-semibold text-lg">Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // Navigate to support
              }}
              className="mt-4"
            >
              <Text className="text-primary font-medium">Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}
