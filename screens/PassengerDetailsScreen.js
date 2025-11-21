// screens/PassengerDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

export default function PassengerDetailsScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { flight, seats = [] } = route.params || {};

  const [passengers, setPassengers] = useState([
    { id: 1, name: '', age: '', gender: '', idNumber: '', phone: '' },
  ]);

  const updatePassenger = (index, field, value) => {
    const copy = [...passengers];
    copy[index] = { ...copy[index], [field]: value };
    setPassengers(copy);
  };

  const handleContinue = () => {
    navigation.navigate('AddOns', {
      flight,
      seats,
      passengers,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Passenger details
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        Enter information exactly as on your ID/passport.
      </Text>

      {passengers.map((p, index) => (
        <View
          key={p.id}
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
            Passenger {index + 1}
          </Text>

          <InputField
            label="Full name"
            placeholder="As per ID"
            value={p.name}
            onChangeText={t => updatePassenger(index, 'name', t)}
            style={{ marginTop: 8 }}
          />
          <View style={styles.row}>
            <InputField
              label="Age"
              placeholder="18"
              value={p.age}
              keyboardType="numeric"
              onChangeText={t => updatePassenger(index, 'age', t)}
              style={{ flex: 1, marginRight: 8, marginTop: 8 }}
            />
            <InputField
              label="Gender"
              placeholder="M / F / Other"
              value={p.gender}
              onChangeText={t => updatePassenger(index, 'gender', t)}
              style={{ flex: 1, marginLeft: 8, marginTop: 8 }}
            />
          </View>
          <InputField
            label="ID / Passport number"
            placeholder="Eg. A1234567"
            value={p.idNumber}
            onChangeText={t => updatePassenger(index, 'idNumber', t)}
            style={{ marginTop: 8 }}
          />
          <InputField
            label="Contact phone"
            placeholder="+91 9876543210"
            value={p.phone}
            onChangeText={t => updatePassenger(index, 'phone', t)}
            keyboardType="phone-pad"
            style={{ marginTop: 8 }}
          />
        </View>
      ))}

      <PrimaryButton title="Save & Continue" onPress={handleContinue} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 4 },
  card: {
    marginTop: 16,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 15, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});
