// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import flights from '../data/flights.json';

export default function HomeScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [from, setFrom] = useState('BLR');
  const [to, setTo] = useState('DXB');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Header
        title="Hi, Tanishq 👋"
        subtitle="Where are you flying next?"
        right={<ThemeToggle />}
      />

      <View
        style={[
          styles.searchCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.searchTitle,
            { color: theme.colors.text },
          ]}
        >
          Flight search
        </Text>

        <InputField
          label="From"
          value={from}
          onChangeText={setFrom}
          placeholder="BLR"
          style={{ marginTop: 10 }}
        />
        <InputField
          label="To"
          value={to}
          onChangeText={setTo}
          placeholder="DXB"
          style={{ marginTop: 10 }}
        />
        <InputField
          label="Departure"
          placeholder="2025-12-24"
          style={{ marginTop: 10 }}
        />
        <InputField
          label="Travellers & Class"
          placeholder="1 Adult • Economy"
          style={{ marginTop: 10 }}
        />

        <PrimaryButton
          title="Search flights"
          style={{ marginTop: 16 }}
          onPress={() =>
            navigation.navigate('FlightSearchResults', {
              from,
              to,
            })
          }
        />
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: theme.colors.text },
        ]}
      >
        Best deals today
      </Text>

      {flights.slice(0, 3).map(f => (
        <TouchableOpacity
          key={f.id}
          onPress={() => navigation.navigate('FlightDetail', { flight: f })}
          activeOpacity={0.8}
          style={[
            styles.dealCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: theme.colors.text,
            }}
          >
            {f.from} → {f.to}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.textSecondary,
            }}
          >
            {f.airline}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              marginTop: 4,
              color: theme.colors.accent,
            }}
          >
            ₹{f.price}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  searchTitle: { fontSize: 16, fontWeight: '700' },
  sectionTitle: { marginTop: 24, fontSize: 16, fontWeight: '700' },
  dealCard: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    marginTop: 10,
  },
});
