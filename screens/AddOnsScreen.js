// screens/AddOnsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

const ADDON_PRICES = {
  extraBaggage: 1500,
  meal: 600,
  insurance: 400,
  priorityBoarding: 800,
};

export default function AddOnsScreen({ route, navigation }) {
  const { theme } = useThemeContext();
  const { flight, seats = [], passengers = [] } = route.params || {};

  const [addons, setAddons] = useState({
    extraBaggage: false,
    meal: false,
    insurance: false,
    priorityBoarding: false,
  });

  const toggle = key => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addonsTotal = Object.entries(addons).reduce((sum, [key, value]) => {
    if (!value) return sum;
    return sum + (ADDON_PRICES[key] || 0);
  }, 0);

  const basePrice = flight?.price || 0;
  const totalPrice = basePrice + addonsTotal;

  const handleContinue = () => {
    navigation.navigate('ReviewAndPayment', {
      flight,
      seats,
      passengers,
      addons,
      totalPrice,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Add-ons
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors.textSecondary },
        ]}
      >
        Customize your experience with extras.
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
        <AddonRow
          label="Extra baggage"
          description="Add 15kg to your baggage allowance."
          price={ADDON_PRICES.extraBaggage}
          value={addons.extraBaggage}
          onValueChange={() => toggle('extraBaggage')}
          theme={theme}
        />
        <AddonRow
          label="Meals"
          description="Pre-book your in-flight meal."
          price={ADDON_PRICES.meal}
          value={addons.meal}
          onValueChange={() => toggle('meal')}
          theme={theme}
        />
        <AddonRow
          label="Travel insurance"
          description="Cover delays, cancellations & baggage."
          price={ADDON_PRICES.insurance}
          value={addons.insurance}
          onValueChange={() => toggle('insurance')}
          theme={theme}
        />
        <AddonRow
          label="Priority boarding"
          description="Board first and skip long queues."
          price={ADDON_PRICES.priorityBoarding}
          value={addons.priorityBoarding}
          onValueChange={() => toggle('priorityBoarding')}
          theme={theme}
        />
      </View>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.summaryTitle,
            { color: theme.colors.text },
          ]}
        >
          Price summary
        </Text>
        <Row
          label="Base fare"
          value={`₹${basePrice}`}
          color={theme.colors.textSecondary}
        />
        <Row
          label="Add-ons"
          value={`₹${addonsTotal}`}
          color={theme.colors.textSecondary}
        />
        <View style={styles.separator} />
        <Row
          label="Total"
          value={`₹${totalPrice}`}
          color={theme.colors.accent}
          bold
        />
      </View>

      <PrimaryButton title="Review & Pay" onPress={handleContinue} />
    </ScrollView>
  );
}

function AddonRow({ label, description, price, value, onValueChange, theme }) {
  return (
    <View style={styles.addonRow}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.addonLabel,
            { color: theme.colors.text },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.addonDesc,
            { color: theme.colors.textSecondary },
          ]}
        >
          {description}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: theme.colors.accent,
          }}
        >
          +₹{price}
        </Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    </View>
  );
}

function Row({ label, value, color, bold }) {
  return (
    <View style={styles.row}>
      <Text
        style={{
          fontSize: 13,
          color,
          fontWeight: bold ? '700' : '400',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 13,
          color,
          fontWeight: bold ? '700' : '500',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 4 },
  card: {
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  addonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  addonLabel: { fontSize: 14, fontWeight: '600' },
  addonDesc: { fontSize: 12, marginTop: 2 },
  summaryCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  summaryTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  separator: {
    height: 1,
    marginVertical: 8,
    opacity: 0.4,
  },
});
