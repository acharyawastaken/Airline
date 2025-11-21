// screens/MyTripsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';
import TripCard from '../components/TripCard';

const mockTrips = [
  {
    id: 1,
    from: 'BLR',
    to: 'DXB',
    date: '2025-01-12',
    departureTime: '04:30',
    airline: 'Emirates',
    flightNumber: 'EK565',
    status: 'Upcoming',
    bookingId: 'FS892311',
    duration: '3h 50m',
    stops: 0,
    price: 24500,
  },
  {
    id: 2,
    from: 'BLR',
    to: 'DEL',
    date: '2024-11-20',
    departureTime: '09:30',
    airline: 'IndiGo',
    flightNumber: '6E123',
    status: 'Completed',
    bookingId: 'FS771024',
    duration: '2h 40m',
    stops: 0,
    price: 6200,
  },
];

export default function MyTripsScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [tab, setTab] = useState('Upcoming');

  const filtered = mockTrips.filter(t => t.status === tab);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 18,
          paddingBottom: 8,
        }}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          My trips
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
            marginTop: 2,
          }}
        >
          View all your upcoming and past journeys.
        </Text>

        <View
          style={[
            styles.tabRow,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {['Upcoming', 'Completed'].map(name => (
            <TouchableOpacity
              key={name}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    tab === name ? theme.colors.primarySoft : 'transparent',
                },
              ]}
              onPress={() => setTab(name)}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: tab === name ? '700' : '500',
                  color:
                    tab === name
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                }}
              >
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {filtered.map(trip => (
          <TripCard
            key={trip.id}
            trip={trip}
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'FlightDetail',
                params: { flight: trip },
              })
            }
          />
        ))}

        {filtered.length === 0 && (
          <Text
            style={{
              marginTop: 40,
              textAlign: 'center',
              fontSize: 13,
              color: theme.colors.textSecondary,
            }}
          >
            No {tab.toLowerCase()} trips yet.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  tabRow: {
    flexDirection: 'row',
    borderRadius: 999,
    borderWidth: 1,
    padding: 4,
    marginTop: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
});
