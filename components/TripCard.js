// components/TripCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../theme/ThemeContext';

export default function TripCard({ trip, onPress }) {
  const { theme } = useThemeContext();

  const statusColors = {
    Upcoming: theme.colors.primarySoft,
    Completed: theme.colors.success,
    Cancelled: theme.colors.danger,
  };

  const statusTextColors = {
    Upcoming: theme.colors.primary,
    Completed: '#ffffff',
    Cancelled: '#ffffff',
  };

  const isCompleted = trip.status === 'Completed';
  const isCancelled = trip.status === 'Cancelled';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          opacity: isCancelled ? 0.7 : 1,
          shadowColor: theme.colors.primary,
        },
      ]}
    >
      {/* Top row: route + status */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="airplane"
            size={18}
            style={{ transform: [{ rotate: '45deg' }] }}
            color={theme.colors.accent}
          />
          <Text
            style={[
              styles.route,
              { color: theme.colors.text },
            ]}
          >
            {trip.from} → {trip.to}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                statusColors[trip.status] || theme.colors.subtle,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              color:
                statusTextColors[trip.status] ||
                theme.colors.textSecondary,
            }}
          >
            {trip.status}
          </Text>
        </View>
      </View>

      {/* Middle row: date + airline */}
      <View style={styles.middleRow}>
        <View>
          <Text
            style={[
              styles.label,
              { color: theme.colors.textSecondary },
            ]}
          >
            Date
          </Text>
          <Text
            style={[
              styles.value,
              { color: theme.colors.text },
            ]}
          >
            {trip.date} • {trip.departureTime}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={[
              styles.label,
              { color: theme.colors.textSecondary },
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
            {trip.airline} {trip.flightNumber && `• ${trip.flightNumber}`}
          </Text>
        </View>
      </View>

      {/* Bottom row: booking id + chevron */}
      <View style={styles.bottomRow}>
        <Text
          style={{
            fontSize: 11,
            color: theme.colors.textSecondary,
          }}
        >
          Booking ID: {trip.bookingId || 'FS-XXXXXX'}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={16}
          color={theme.colors.textSecondary}
        />
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  route: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  value: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
