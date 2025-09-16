

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import LessonsScreen from '../screens/LessonsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchingExerciseScreen from '../screens/MatchingExerciseScreen';
import LessonSummaryScreen from '../screens/LessonSummaryScreen';

import { COLORS, FONTS } from '../constants/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Simple icon component for web compatibility
const SimpleIcon = ({ name, size, color }) => {
  const getIconText = (iconName) => {
    switch (iconName) {
      case 'home':
      case 'home-outline':
        return '🏠';
      case 'document-text':
      case 'document-text-outline':
        return '📚';
      case 'person':
      case 'person-outline':
        return '👤';
      case 'chevron-back':
        return '←';
      case 'chevron-forward':
        return '→';
      case 'checkmark':
        return '✓';
      case 'play':
        return '▶';
      case 'lock-closed':
        return '🔒';
      case 'star':
        return '⭐';
      case 'bulb':
        return '💡';
      case 'help-circle':
        return '❓';
      case 'checkmark-circle':
        return '✅';
      case 'play-circle':
        return '▶️';
      case 'log-out':
        return '🚪';
      case 'notifications':
        return '🔔';
      case 'volume-high':
        return '🔊';
      case 'help-circle':
        return '❓';
      case 'information-circle':
        return 'ℹ️';
      case 'chevron-forward':
        return '→';
      case 'camera':
        return '📷';
      case 'book':
        return '📖';
      case 'color-palette':
        return '🎨';
      case 'flame':
        return '🔥';
      case 'trophy':
        return '🏆';
      case 'time':
        return '⏰';
      case 'medal':
        return '🏅';
      default:
        return '•';
    }
  };

  return (
    <Text style={{ fontSize: size, color: color, ...FONTS.regular }}>
      {getIconText(name)}
    </Text>
  );
};

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Lessons') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <SimpleIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.darkBlue,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: COLORS.lightBlue,
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesScreen}
        options={{
          tabBarLabel: 'Activities',
        }}
      />
      <Tab.Screen 
        name="Lessons" 
        component={LessonsScreen}
        options={{
          tabBarLabel: 'Lessons',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="MatchingExercise" component={MatchingExerciseScreen} />
        <Stack.Screen name="LessonSummary" component={LessonSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
