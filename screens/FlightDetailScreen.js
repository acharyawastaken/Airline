// screens/FlightDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function FlightDetailScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { flight } = route.params || {};

  if (!flight) {
    return null;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {flight.from} → {flight.to}
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        {flight.airline} • {flight.flightNumber}
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary },
          ]}
        >
          Departure
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {flight.departureTime} • {flight.from}
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, marginTop: 14 },
          ]}
        >
          Arrival
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {flight.arrivalTime} • {flight.to}
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, marginTop: 14 },
          ]}
        >
          Duration & Stops
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {flight.duration} •{' '}
          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary },
          ]}
        >
          Price
        </Text>
        <Text
          style={[
            styles.price,
            { color: theme.colors.accent },
          ]}
        >
          ₹{flight.price}
        </Text>
        <Text
          style={{
            marginTop: 4,
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          Includes base fare, taxes & fees (mock).
        </Text>
      </View>

      <PrimaryButton
        title="Select seats"
        onPress={() => navigation.navigate('SeatSelection', { flight })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 2 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginTop: 18,
  },
  label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 15, marginTop: 2 },
  price: { fontSize: 22, fontWeight: '700', marginTop: 4 },
});
