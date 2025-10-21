import React from 'react';
import { Image } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import LessonsScreen from '../screens/LessonsScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchingExerciseScreen from '../screens/MatchingExerciseScreen';
import LessonSummaryScreen from '../screens/LessonSummaryScreen';
import PictureEmotionActivity from '../screens/PictureEmotionActivity';
import VideoEmotionActivity from '../screens/VideoEmotionActivity';
import SwipeEmotionActivity from '../screens/SwipeEmotionActivity';
import EmotionMatchingActivity from '../screens/EmotionMatchingActivity';
import AILearningActivity from '../screens/AILearningActivity';

import { COLORS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ActivityStack = createStackNavigator();

function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
      <ActivityStack.Screen name="ActivitiesMain" component={ActivitiesScreen} />
      <ActivityStack.Screen name="MatchingExercise" component={MatchingExerciseScreen} />
      <ActivityStack.Screen name="PictureEmotionActivity" component={PictureEmotionActivity} />
      <ActivityStack.Screen name="VideoEmotionActivity" component={VideoEmotionActivity} />
      <ActivityStack.Screen name="SwipeEmotionActivity" component={SwipeEmotionActivity} />
      <ActivityStack.Screen name="EmotionMatchingActivity" component={EmotionMatchingActivity} />
      <ActivityStack.Screen name="AILearningActivity" component={AILearningActivity} />
      <ActivityStack.Screen name="LessonSummary" component={LessonSummaryScreen} />
    </ActivityStack.Navigator>
  );
}

const LessonStack = createStackNavigator();

function LessonStackNavigator() {
  return (
    <LessonStack.Navigator screenOptions={{ headerShown: false }}>
      <LessonStack.Screen name="LessonsMain" component={LessonsScreen} />
      <LessonStack.Screen name="MatchingExercise" component={MatchingExerciseScreen} />
      <LessonStack.Screen name="PictureEmotionActivity" component={PictureEmotionActivity} />
      <LessonStack.Screen name="VideoEmotionActivity" component={VideoEmotionActivity} />
      <LessonStack.Screen name="SwipeEmotionActivity" component={SwipeEmotionActivity} />
      <LessonStack.Screen name="EmotionMatchingActivity" component={EmotionMatchingActivity} />
      <LessonStack.Screen name="AILearningActivity" component={AILearningActivity} />
      <LessonStack.Screen name="LessonSummary" component={LessonSummaryScreen} />
    </LessonStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Lessons"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

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
              fadeDuration={0}
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
      <Tab.Screen name="Activities" component={ActivityStackNavigator} options={{ tabBarLabel: 'Activities' }} />
      <Tab.Screen name="Lessons" component={LessonStackNavigator} options={{ tabBarLabel: 'Lessons' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
