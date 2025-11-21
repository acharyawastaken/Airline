// screens/FlightSearchResultsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';
import flightsData from '../data/flights.json';
import FlightCard from '../components/FlightCard';

export default function FlightSearchResultsScreen({ route, navigation }) {
  const { from, to } = route.params || {};
  const { theme } = useThemeContext();

  const flights = flightsData.filter(f => {
    if (!from || !to) return true;
    return f.from === from && f.to === to;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Flights
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          {from} → {to}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>
        {flights.map(f => (
          <FlightCard
            key={f.id}
            flight={f}
            onPress={() => navigation.navigate('FlightDetail', { flight: f })}
          />
        ))}
        {flights.length === 0 && (
          <Text
            style={{
              marginTop: 40,
              textAlign: 'center',
              color: theme.colors.textSecondary,
            }}
          >
            No flights found for this route.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  title: { fontSize: 20, fontWeight: '700' },
});
