

import React from 'react';
import { Image } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import LessonsScreen from '../screens/LessonsScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchingExerciseScreen from '../screens/MatchingExerciseScreen';
import LessonSummaryScreen from '../screens/LessonSummaryScreen';

import { COLORS, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import SimpleIcon from '../components/SimpleIcon';

// Bottom Tab Navigator
function TabNavigator() {
  return (
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;

    //       if (route.name === 'Activities') {
    //         iconName = focused ? 'home' : 'home-outline';
    //       } else if (route.name === 'Lessons') {
    //         iconName = focused ? 'document-text' : 'document-text-outline';
    //       } else if (route.name === 'Profile') {
    //         iconName = focused ? 'person' : 'person-outline';
    //       }

    //       return <SimpleIcon name={iconName} size={size} color={color} />;
    //     },
    <Tab.Navigator
      initialRouteName="Lessons"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          // Use PNG images instead of emojis
          if (route.name === 'Activities') {
            iconSource = IMAGES.bottomNavActivities;
          } else if (route.name === 'Lessons') {
            iconSource = IMAGES.bottomNavLessons;
          } else if (route.name === 'Profile') {
            iconSource = IMAGES.bottomNavProfile;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                marginBottom: -3,
                opacity: focused ? 1 : 0.6,
              }}
            />
          );
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
