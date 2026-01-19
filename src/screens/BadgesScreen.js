import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { useRewards } from '../contexts/RewardContext';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';

export default function BadgesScreen({ navigation }) {
  const { badges, streak } = useRewards();
  const { isTTSEnabled } = useTTS();

  const allBadges = [
    { id: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: 'star' },
    { id: 'emotion_sorter', title: 'Emotion Sorter Master', description: 'Complete both sorting levels', icon: 'checkmark-circle' },
    { id: 'body_detective', title: 'Body Language Detective', description: 'Master body language reading', icon: 'eye' },
    { id: 'intensity_expert', title: 'Intensity Expert', description: 'Perfect emotion intensity ordering', icon: 'trending-up' },
    { id: 'story_master', title: 'Story Master', description: 'Complete all emotion stories', icon: 'book' },
    { id: 'streak_5', title: '5-Day Streak', description: 'Practice 5 days in a row', icon: 'flame' },
    { id: 'streak_10', title: '10-Day Streak', description: 'Practice 10 days in a row', icon: 'trophy' },
    { id: 'all_lessons', title: 'Lesson Master', description: 'Complete all available lessons', icon: 'school' }
  ];

  const handleBadgePress = async (badge) => {
    if (isTTSEnabled) {
      const earnedBadge = badges.find(b => b.id === badge.id);
      if (earnedBadge) {
        await TTS.speak(`${badge.title}: ${badge.description}. Earned on ${new Date(earnedBadge.earnedAt).toLocaleDateString()}`);
      } else {
        await TTS.speak(`${badge.title}: ${badge.description}. Not earned yet.`);
      }
    }
  };

  const getBadgeStyle = (badge) => {
    const earned = badges.find(b => b.id === badge.id);
    return earned ? styles.earnedBadge : styles.lockedBadge;
  };

  const getBadgeIconColor = (badge) => {
    const earned = badges.find(b => b.id === badge.id);
    return earned ? COLORS.yellow : COLORS.grey;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <SimpleIcon name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Badges</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.streakContainer}>
            <SimpleIcon name="flame" size={30} color={COLORS.orange} />
            <Text style={styles.streakText}>Current Streak: {streak} days</Text>
          </View>

          <Text style={styles.sectionTitle}>Earned Badges ({badges.length}/{allBadges.length})</Text>
          
          <View style={styles.badgesGrid}>
            {allBadges.map(badge => {
              const earned = badges.find(b => b.id === badge.id);
              return (
                <TouchableOpacity
                  key={badge.id}
                  style={getBadgeStyle(badge)}
                  onPress={() => handleBadgePress(badge)}
                >
                  <SimpleIcon 
                    name={badge.icon} 
                    size={40} 
                    color={getBadgeIconColor(badge)} 
                  />
                  <Text style={[styles.badgeTitle, !earned && styles.lockedText]}>
                    {badge.title}
                  </Text>
                  <Text style={[styles.badgeDescription, !earned && styles.lockedText]}>
                    {badge.description}
                  </Text>
                  {earned && (
                    <Text style={styles.earnedDate}>
                      {new Date(earned.earnedAt).toLocaleDateString()}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 5 
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 24, color: COLORS.black, ...FONTS.bold },
  placeholder: { width: 34 },
  scrollView: { flex: 1 },
  content: { padding: SIZES.padding },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    ...SHADOWS.small
  },
  streakText: { fontSize: SIZES.large, color: COLORS.black, marginLeft: 10, ...FONTS.bold },
  sectionTitle: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 15, ...FONTS.bold },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  earnedBadge: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.yellow,
    ...SHADOWS.medium
  },
  lockedBadge: {
    width: '48%',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    opacity: 0.6,
    ...SHADOWS.small
  },
  badgeTitle: { fontSize: SIZES.base, color: COLORS.black, textAlign: 'center', marginTop: 8, ...FONTS.bold },
  badgeDescription: { fontSize: SIZES.small, color: COLORS.grey, textAlign: 'center', marginTop: 4 },
  lockedText: { color: COLORS.grey },
  earnedDate: { fontSize: SIZES.small, color: COLORS.darkBlue, marginTop: 4 }
});