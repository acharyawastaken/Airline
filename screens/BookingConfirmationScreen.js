// screens/BookingConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function BookingConfirmationScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { booking } = route.params || {};

  if (!booking) return null;

  const goHome = () => {
    navigation.navigate('Home');
  };

  const goTrips = () => {
    navigation.navigate('MyTrips');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <View style={styles.center}>
        <View
          style={[
            styles.checkCircle,
            { backgroundColor: theme.colors.success },
          ]}
        >
          <Ionicons name="checkmark" size={26} color="#fff" />
        </View>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text },
          ]}
        >
          Booking successful
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          Your e-ticket and trip details have been generated (mock).
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
          Booking ID
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {booking.bookingId}
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, marginTop: 12 },
          ]}
        >
          Route
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {booking.from} → {booking.to}
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, marginTop: 12 },
          ]}
        >
          Airline
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {booking.airline} • {booking.flightNumber}
        </Text>

        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, marginTop: 12 },
          ]}
        >
          Seats
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text },
          ]}
        >
          {booking.seats && booking.seats.length > 0
            ? booking.seats.join(', ')
            : 'Not specified'}
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
          Passengers
        </Text>
        {booking.passengers?.map((p, idx) => (
          <Text
            key={idx}
            style={{
              fontSize: 13,
              marginTop: 4,
              color: theme.colors.text,
            }}
          >
            • {p.name || `Passenger ${idx + 1}`}
          </Text>
        ))}
      </View>

      <PrimaryButton title="View trip" onPress={goTrips} />
      <PrimaryButton
        title="Back to home"
        onPress={goHome}
        style={{ marginTop: 8 }}
      />

      <TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            textAlign: 'center',
            marginTop: 14,
            color: theme.colors.textSecondary,
          }}
        >
          Download ticket (mock) • Share (mock)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  checkCircle: {
    width: 70,
    height: 70,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
  },
  label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  value: { fontSize: 15, marginTop: 2 },
});
