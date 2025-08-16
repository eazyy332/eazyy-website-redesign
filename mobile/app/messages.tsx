import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Screen from '../components/ui/Screen';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useToast } from '../components/ui/Toast';

type Message = { id: string; from: 'user' | 'support'; text: string; timestamp: string };

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', from: 'support', text: 'Hi! How can we help you today?', timestamp: '10:00' },
    { id: '2', from: 'user', text: 'I have a question about my order EZ-2024-002.', timestamp: '10:01' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const STORAGE_KEY = 'eazzy-messages';
  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try { setMessages(JSON.parse(raw)); } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)).catch(() => {});
  }, [messages]);
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    if (!input.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), from: 'user', text: input.trim(), timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInput('');
    setTyping(true);
    showToast('Message sent', 'success');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    setTimeout(() => {
      const replyTime = new Date();
      setMessages((prev) => [
        ...prev,
        { id: String(prev.length + 1), from: 'support', text: 'Thanks! We will get back to you shortly.', timestamp: replyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }, 1000);
  };

  const clearChat = async () => {
    setMessages([]);
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  };

  const rightAction = (
    <TouchableOpacity onPress={() => { Haptics.selectionAsync().catch(()=>{}); clearChat(); }} className="px-2 py-1">
      <Text className="text-primary font-medium">Clear</Text>
    </TouchableOpacity>
  );

  return (
    <Screen title="Messages" subtitle="Support conversations" rightAction={rightAction}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((m) => (
            <View key={m.id} className={`mb-3 ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
              <View className={`max-w-[80%] rounded-2xl px-4 py-3 border ${m.from === 'user' ? 'bg-primary text-white border-primary' : 'bg-card border-border'}`}>
                <Text className={`${m.from === 'user' ? 'text-white' : 'text-foreground'}`}>{m.text}</Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-1">{m.timestamp}</Text>
            </View>
          ))}
          {typing && (
            <View className="mb-3 items-start">
              <View className="max-w-[80%] rounded-2xl px-4 py-3 border bg-card border-border">
                <Text className="text-foreground">Support is typing…</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <Section className="pt-0">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => { /* attachment placeholder */ }} className="px-3 py-3 rounded-2xl bg-muted">
              <Text className="text-foreground">＋</Text>
            </TouchableOpacity>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
              className="flex-1 bg-background border border-border rounded-2xl px-4 py-3"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity onPress={send} disabled={!input.trim()} className={`px-4 py-3 rounded-2xl ${input.trim() ? 'bg-[#2675f5]' : 'bg-gray-300'}`}>
              <Text className="text-white font-medium">Send</Text>
            </TouchableOpacity>
          </View>
        </Section>
      </KeyboardAvoidingView>
    </Screen>
  );
}


