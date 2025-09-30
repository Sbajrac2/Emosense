import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User avatar */}
        <View style={styles.avatarContainer}>
          <Image source={IMAGES.userAvatar} style={styles.avatar} />
          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.username}>@janedoe</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>52</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Buttons / actions */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={styles.actionText}>Achievements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={() => {
            // Add your sign-out logic here
            navigation.replace('Login');
          }}
        >
          <Text style={[styles.actionText, { color: COLORS.red }]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  avatar: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  name: {
    marginTop: SIZES.margin,
    fontSize: SIZES.large,
    color: COLORS.black,
    ...FONTS.bold,
  },
  username: {
    fontSize: SIZES.base,
    color: COLORS.grey,
    ...FONTS.medium,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: SIZES.margin * 2,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: SIZES.xlarge,
    color: COLORS.darkBlue,
    ...FONTS.bold,
  },
  statLabel: {
    fontSize: SIZES.base,
    color: COLORS.black,
    ...FONTS.medium,
  },
  actionButton: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding * 1.2,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    marginVertical: SIZES.margin / 2,
    ...SHADOWS.small,
  },
  actionText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    ...FONTS.medium,
  },
  logoutButton: {
    backgroundColor: COLORS.pink,
  },
});
