// components/SeatGrid.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

export default function SeatGrid({ rows = 8, cols = 6, selectedSeats, onToggleSeat }) {
  const { theme } = useThemeContext();
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <View>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({ length: cols }).map((_, colIndex) => {
            const seatId = `${rowIndex + 1}${letters[colIndex]}`;
            const isSelected = selectedSeats.includes(seatId);
            const isPremium = rowIndex < 2; // first 2 rows premium

            return (
              <TouchableOpacity
                key={seatId}
                onPress={() => onToggleSeat(seatId)}
                style={[
                  styles.seat,
                  {
                    borderColor: theme.colors.border,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.card,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: isSelected ? '#fff' : theme.colors.textSecondary,
                    fontWeight: isPremium ? '700' : '500',
                  }}
                >
                  {seatId}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 6,
  },
  seat: {
    width: 38,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
