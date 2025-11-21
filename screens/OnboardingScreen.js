// screens/OnboardingScreen.js
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useThemeContext } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Easy booking',
    subtitle: 'Search, compare and book flights in a few taps.',
  },
  {
    id: '2',
    title: 'Best deals',
    subtitle: 'Premium experience with wallet-friendly fares.',
  },
  {
    id: '3',
    title: 'Manage trips',
    subtitle: 'Keep all your trips, tickets and info in one place.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const { theme } = useThemeContext();
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const goNext = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <FlatList
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(newIndex);
        }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.circle} />
            <Text
              style={[
                styles.title,
                { color: theme.colors.text },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === index
                      ? theme.colors.primary
                      : theme.colors.subtle,
                },
              ]}
            />
          ))}
        </View>

        <PrimaryButton
          title={index === slides.length - 1 ? 'Continue' : 'Next'}
          onPress={goNext}
        />

        <Text
          onPress={() => navigation.navigate('Login')}
          style={{
            marginTop: 6,
            fontSize: 13,
            textAlign: 'center',
            color: theme.colors.textSecondary,
          }}
        >
          Skip for now
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: {
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(56,189,248,0.14)',
    marginBottom: 40,
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center' },
  bottom: { padding: 24 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 999,
    marginHorizontal: 4,
  },
});
