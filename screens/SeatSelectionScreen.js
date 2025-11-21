    // screens/SeatSelectionScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SeatGrid from '../components/SeatGrid';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function SeatSelectionScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { flight } = route.params || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = seatId => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const proceed = () => {
    if (selectedSeats.length === 0) return;
    navigation.navigate('PassengerDetails', {
      flight,
      seats: selectedSeats,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Select your seats
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        Tap to choose seats. First rows are premium.
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
        <SeatGrid
          selectedSeats={selectedSeats}
          onToggleSeat={toggleSeat}
        />
      </View>

      <View style={styles.summary}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>
          Selected:
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: '600',
          }}
        >
          {selectedSeats.length === 0
            ? 'None'
            : selectedSeats.join(', ')}
        </Text>
      </View>

      <PrimaryButton
        title="Continue"
        onPress={proceed}
        style={{ opacity: selectedSeats.length === 0 ? 0.6 : 1 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 4 },
  card: {
    marginTop: 18,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  summary: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
