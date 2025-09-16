import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

export default function ProfileScreen({ navigation }) {
  const userStats = {
    name: 'Sarah',
    streak: 52,
    totalLessons: 8,
    averageScore: 85,
    totalTime: '12h 30m',
  };

  const achievements = [
    {
      id: 1,
      title: 'First Lesson',
      description: 'Completed your first lesson',
      icon: 'star',
      earned: true,
    },
    {
      id: 2,
      title: 'Perfect Score',
      description: 'Got 100% on a lesson',
      icon: 'trophy',
      earned: true,
    },
    {
      id: 3,
      title: '7 Day Streak',
      description: 'Learned for 7 days in a row',
      icon: 'flame',
      earned: true,
    },
    {
      id: 4,
      title: 'Emotion Master',
      description: 'Complete all emotion lessons',
      icon: 'medal',
      earned: false,
    },
  ];

  const settings = [
    {
      id: 1,
      title: 'Notifications',
      icon: 'notifications',
      action: 'toggle',
    },
    {
      id: 2,
      title: 'Sound Effects',
      icon: 'volume-high',
      action: 'toggle',
    },
    {
      id: 3,
      title: 'Help & Support',
      icon: 'help-circle',
      action: 'navigate',
    },
    {
      id: 4,
      title: 'About',
      icon: 'information-circle',
      action: 'navigate',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👧</Text>
              </View>
            </View>
            <Text style={styles.userName}>{userStats.name}</Text>
            <Text style={styles.userSubtitle}>Student</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsSection}>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <SimpleIcon name="flame" size={24} color={COLORS.orange}  />
                <Text style={styles.statNumber}>{userStats.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statCard}>
                <SimpleIcon name="book" size={24} color={COLORS.darkBlue}  />
                <Text style={styles.statNumber}>{userStats.totalLessons}</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statCard}>
                <SimpleIcon name="trophy" size={24} color={COLORS.yellow}  />
                <Text style={styles.statNumber}>{userStats.averageScore}%</Text>
                <Text style={styles.statLabel}>Average</Text>
              </View>
              <View style={styles.statCard}>
                <SimpleIcon name="time" size={24} color={COLORS.teal}  />
                <Text style={styles.statNumber}>{userStats.totalTime}</Text>
                <Text style={styles.statLabel}>Total Time</Text>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.earned && styles.lockedAchievement,
                  ]}
                >
                  <View style={[
                    styles.achievementIcon,
                    !achievement.earned && styles.lockedIcon,
                  ]}>
                    <SimpleIcon 
                      name={achievement.icon} 
                      size={24} 
                      color={achievement.earned ? COLORS.darkBlue : COLORS.grey} 
                     />
                  </View>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.earned && styles.lockedText,
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.lockedText,
                  ]}>
                    {achievement.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Settings */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {settings.map((setting) => (
              <TouchableOpacity
                key={setting.id}
                style={styles.settingItem}
                onPress={() => {
                  // Handle setting actions
                }}
              >
                <View style={styles.settingLeft}>
                  <SimpleIcon name={setting.icon} size={24} color={COLORS.darkBlue}  />
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                </View>
                <SimpleIcon name="chevron-forward" size={20} color={COLORS.grey}  />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace('Login')}
          >
            <SimpleIcon name="log-out" size={20} color={COLORS.white}  />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SIZES.padding,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  avatarContainer: {
    marginBottom: SIZES.margin,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: SIZES.xlarge,
    color: COLORS.black,
    marginBottom: SIZES.margin / 2,
    ...FONTS.bold,
  },
  userSubtitle: {
    fontSize: SIZES.base,
    color: COLORS.grey,
    ...FONTS.regular,
  },
  statsSection: {
    marginBottom: SIZES.margin * 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.margin / 4,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statNumber: {
    fontSize: SIZES.large,
    color: COLORS.darkBlue,
    marginVertical: SIZES.margin / 2,
    ...FONTS.bold,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.grey,
    textAlign: 'center',
    ...FONTS.regular,
  },
  achievementsSection: {
    marginBottom: SIZES.margin * 2,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SIZES.margin,
    ...FONTS.bold,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    marginBottom: SIZES.margin,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: SIZES.base,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
    ...FONTS.bold,
  },
  achievementDescription: {
    fontSize: SIZES.small,
    color: COLORS.grey,
    textAlign: 'center',
    ...FONTS.regular,
  },
  lockedText: {
    color: COLORS.grey,
  },
  settingsSection: {
    marginBottom: SIZES.margin * 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    ...SHADOWS.small,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: SIZES.base,
    color: COLORS.black,
    marginLeft: SIZES.margin,
    ...FONTS.medium,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    marginTop: SIZES.margin,
    ...SHADOWS.small,
  },
  logoutText: {
    fontSize: SIZES.base,
    color: COLORS.white,
    marginLeft: SIZES.margin / 2,
    ...FONTS.bold,
  },
});
