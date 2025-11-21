// components/FlightCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function FlightCard({ flight, onPress }) {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.primary,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.airline}>
          <Text
            style={[
              styles.airlineCode,
              { color: theme.colors.primary },
            ]}
          >
            {flight.airlineCode}
          </Text>
          <Text
            style={[
              styles.airlineName,
              { color: theme.colors.textSecondary },
            ]}
          >
            {flight.airline}
          </Text>
        </View>

        <Text
          style={[
            styles.price,
            { color: theme.colors.accent },
          ]}
        >
          ₹{flight.price}
        </Text>
      </View>

      <View style={[styles.row, { marginTop: 10 }]}>
        <View>
          <Text
            style={[
              styles.time,
              { color: theme.colors.text },
            ]}
          >
            {flight.departureTime}
          </Text>
          <Text
            style={[
              styles.airport,
              { color: theme.colors.textSecondary },
            ]}
          >
            {flight.from}
          </Text>
        </View>

        <View style={styles.center}>
          <View
            style={[
              styles.line,
              { backgroundColor: theme.colors.subtle },
            ]}
          />
          <Text
            style={[
              styles.duration,
              { color: theme.colors.textSecondary },
            ]}
          >
            {flight.duration}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={[
              styles.time,
              { color: theme.colors.text },
            ]}
          >
            {flight.arrivalTime}
          </Text>
          <Text
            style={[
              styles.airport,
              { color: theme.colors.textSecondary },
            ]}
          >
            {flight.to}
          </Text>
        </View>
      </View>

      <View style={[styles.row, { marginTop: 10 }]}>
        <Text
          style={[
            styles.badge,
            {
              backgroundColor: theme.colors.primarySoft,
              color: theme.colors.primary,
            },
          ]}
        >
          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
        </Text>
        <Text
          style={[
            styles.seats,
            { color: theme.colors.textSecondary },
          ]}
        >
          {flight.seatsLeft} seats left
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginVertical: 6,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airline: {},
  airlineCode: {
    fontSize: 16,
    fontWeight: '700',
  },
  airlineName: {
    fontSize: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
  },
  airport: {
    fontSize: 12,
    marginTop: 2,
  },
  center: {
    alignItems: 'center',
  },
  line: {
    width: 70,
    height: 2,
    borderRadius: 999,
  },
  duration: {
    fontSize: 11,
    marginTop: 4,
  },
  badge: {
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  seats: {
    fontSize: 11,
  },
});
