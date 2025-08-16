import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Screen from '../components/ui/Screen';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8082';

export default function ContactScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!firstName || !lastName || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, subject, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Submission failed');
      Alert.alert('Success', 'Message sent');
      setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen title="Contact">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-3">
        <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} className="border border-gray-300 rounded-xl px-4 py-3" />
        <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} className="border border-gray-300 rounded-xl px-4 py-3" />
        <TextInput placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} className="border border-gray-300 rounded-xl px-4 py-3" />
        <TextInput placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} className="border border-gray-300 rounded-xl px-4 py-3" />
        <TextInput placeholder="Subject" value={subject} onChangeText={setSubject} className="border border-gray-300 rounded-xl px-4 py-3" />
        <TextInput placeholder="Message" value={message} onChangeText={setMessage} multiline className="border border-gray-300 rounded-xl px-4 py-3" />
        <TouchableOpacity onPress={submit} disabled={loading} className="bg-[#2675f5] px-5 py-3 rounded-xl mt-2">
          <Text className="text-white text-center font-medium">{loading ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Screen>
  );
}


