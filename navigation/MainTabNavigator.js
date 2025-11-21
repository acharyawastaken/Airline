// navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../theme/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import FlightSearchResultsScreen from '../screens/FlightSearchResultsScreen';
import FlightDetailScreen from '../screens/FlightDetailScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import PassengerDetailsScreen from '../screens/PassengerDetailsScreen';
import AddOnsScreen from '../screens/AddOnsScreen';
import ReviewAndPaymentScreen from '../screens/ReviewAndPaymentScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import ProfileAndSettingsScreen from '../screens/ProfileAndSettingsScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="FlightSearchResults" component={FlightSearchResultsScreen} />
      <Stack.Screen name="FlightDetail" component={FlightDetailScreen} />
      <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
      <Stack.Screen name="PassengerDetails" component={PassengerDetailsScreen} />
      <Stack.Screen name="AddOns" component={AddOnsScreen} />
      <Stack.Screen name="ReviewAndPayment" component={ReviewAndPaymentScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  const { theme } = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'airplane';

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'MyTrips') iconName = 'briefcase';
          if (route.name === 'Help') iconName = 'help-circle';
          if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="MyTrips" component={MyTripsScreen} />
      <Tab.Screen name="Help" component={HelpAndSupportScreen} />
      <Tab.Screen name="Profile" component={ProfileAndSettingsScreen} />
    </Tab.Navigator>
  );
}
