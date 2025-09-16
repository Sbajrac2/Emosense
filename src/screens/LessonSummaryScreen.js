import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function LessonSummaryScreen({ navigation, route }) {
  const { score, totalQuestions, lessonTitle } = route.params || { score: 4, totalQuestions: 4, lessonTitle: 'Feeling Words' };
  const percentage = Math.round((score / totalQuestions) * 100);
  const streak = 52; // This could be stored in app state

  const handleDone = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Lesson Summary</Text>

        {/* Main Summary Card */}
        <View style={styles.summaryCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👧</Text>
            </View>
          </View>

          {/* Congratulations */}
          <Text style={styles.congratulations}>Way to go!</Text>

          {/* Streak */}
          <Text style={styles.streak}>{streak} day streak</Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${percentage}%` }
                ]} 
               />
            </View>
            <View style={styles.progressText}>
              <Text style={styles.progressLabel}>{lessonTitle}: {score}</Text>
              <Text style={styles.progressPercentage}>{percentage}%</Text>
            </View>
          </View>

          {/* Achievement Button */}
          <TouchableOpacity style={styles.achievementButton}>
            <SimpleIcon name="star" size={20} color={COLORS.black}  />
            <Text style={styles.achievementText}>Achievement</Text>
          </TouchableOpacity>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xlarge,
    color: COLORS.black,
    marginBottom: SIZES.margin * 2,
    ...FONTS.bold,
  },
  summaryCard: {
    backgroundColor: COLORS.pink,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 2,
    width: width - SIZES.padding * 4,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatarContainer: {
    marginBottom: SIZES.margin,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.small,
  },
  avatarText: {
    fontSize: 32,
  },
  congratulations: {
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SIZES.margin / 2,
    ...FONTS.bold,
  },
  streak: {
    fontSize: SIZES.base,
    color: COLORS.black,
    marginBottom: SIZES.margin * 2,
    ...FONTS.medium,
  },
  progressContainer: {
    width: '100%',
    marginBottom: SIZES.margin * 2,
  },
  progressBar: {
    height: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: SIZES.margin,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
  },
  progressText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: SIZES.base,
    color: COLORS.black,
    ...FONTS.medium,
  },
  progressPercentage: {
    fontSize: SIZES.base,
    color: COLORS.black,
    ...FONTS.bold,
  },
  achievementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.pink,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  achievementText: {
    fontSize: SIZES.base,
    color: COLORS.black,
    marginLeft: SIZES.margin / 2,
    ...FONTS.medium,
  },
  doneButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 3,
    marginTop: SIZES.margin * 2,
    ...SHADOWS.small,
  },
  doneButtonText: {
    fontSize: SIZES.large,
    color: COLORS.darkBlue,
    ...FONTS.bold,
  },
});
