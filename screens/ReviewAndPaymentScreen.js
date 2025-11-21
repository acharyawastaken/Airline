// screens/ReviewAndPaymentScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function ReviewAndPaymentScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { flight, seats = [], passengers = [], addons = {}, totalPrice } =
    route.params || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const booking = {
        id: Date.now(),
        bookingId: `FS-${Math.floor(Math.random() * 999999)}`,
        status: 'Upcoming',
        date: '2025-01-12',
        departureTime: flight?.departureTime,
        airline: flight?.airline,
        flightNumber: flight?.flightNumber,
        from: flight?.from,
        to: flight?.to,
        totalPrice,
        seats,
        passengers,
      };

      navigation.navigate('BookingConfirmation', { booking });
    }, 1000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Review & payment
      </Text>

      {/* Flight summary */}
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
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          {flight.from} → {flight.to}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.textSecondary,
          }}
        >
          {flight.airline} • {flight.flightNumber}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.textSecondary,
            marginTop: 6,
          }}
        >
          Seats: {seats.length === 0 ? 'Not selected' : seats.join(', ')}
        </Text>
      </View>

      {/* Passenger summary */}
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
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Passengers
        </Text>
        {passengers.map((p, idx) => (
          <Text
            key={idx}
            style={{
              fontSize: 13,
              marginTop: 4,
              color: theme.colors.textSecondary,
            }}
          >
            {p.name || `Passenger ${idx + 1}`} • {p.age || '?'} •{' '}
            {p.gender || '-'}
          </Text>
        ))}
      </View>

      {/* Add-ons summary */}
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
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Add-ons
        </Text>
        {Object.entries(addons).every(([_, v]) => !v) ? (
          <Text
            style={{
              fontSize: 13,
              marginTop: 4,
              color: theme.colors.textSecondary,
            }}
          >
            No add-ons selected.
          </Text>
        ) : (
          Object.entries(addons).map(
            ([key, value]) =>
              value && (
                <Text
                  key={key}
                  style={{
                    fontSize: 13,
                    marginTop: 4,
                    color: theme.colors.textSecondary,
                  }}
                >
                  • {key}
                </Text>
              )
          )
        )}
      </View>

      {/* Total */}
      <View
        style={[
          styles.totalCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 13,
            color: theme.colors.textSecondary,
          }}
        >
          Total to pay
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: theme.colors.accent,
          }}
        >
          ₹{totalPrice}
        </Text>
      </View>

      {/* Payment form */}
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
            styles.cardTitle,
            { color: theme.colors.text },
          ]}
        >
          Card details (mock)
        </Text>
        <InputField
          label="Name on card"
          placeholder="Tanishq Jain"
          value={name}
          onChangeText={setName}
          style={{ marginTop: 10 }}
        />
        <InputField
          label="Card number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
          style={{ marginTop: 10 }}
        />
        <View style={styles.row}>
          <InputField
            label="Expiry"
            placeholder="12/28"
            value={expiry}
            onChangeText={setExpiry}
            keyboardType="numbers-and-punctuation"
            style={{ flex: 1, marginRight: 8, marginTop: 10 }}
          />
          <InputField
            label="CVV"
            placeholder="123"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            style={{ flex: 1, marginLeft: 8, marginTop: 10 }}
          />
        </View>

        <PrimaryButton
          title="Confirm & pay"
          onPress={handlePay}
          loading={loading}
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  card: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  totalCard: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
