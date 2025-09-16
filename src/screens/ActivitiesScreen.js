import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

export default function ActivitiesScreen({ navigation }) {
  const toDoActivities = [
    {
      id: 1,
      title: 'Activity Name',
      dueDate: 'Due Date',
      assignedBy: 'Teacher Name',
      avatar: IMAGES.photo_girl, // 7.png - blonde hair
    },
    {
      id: 2,
      title: 'Activity Name',
      dueDate: 'Due Date',
      assignedBy: 'Teacher Name',
      avatar: IMAGES.photo_boy, // 8.png - reddish-brown hair
    },
  ];

  const completedActivities = [
    {
      id: 3,
      title: 'Activity Name',
      dueDate: 'Due Date',
      assignedBy: 'Teacher Name',
      avatar: IMAGES.photo_girl, // 7.png - blonde hair
    },
    {
      id: 4,
      title: 'Activity Name',
      dueDate: 'Due Date',
      assignedBy: 'Teacher Name',
      avatar: IMAGES.photo_man, // 10.png - brown curly hair
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Activities</Text>
            <Text style={styles.headerSubtitle}>To Do</Text>
          </View>

          {/* To Do Activities Section */}
          <View style={styles.toDoSection}>
            {toDoActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.activityCard}
                onPress={() => {
                  // Handle activity press
                }}
              >
                <View style={styles.activityLeft}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDueDate}>{activity.dueDate}</Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.assignedByText}>Assigned by:</Text>
                  <View style={styles.teacherInfo}>
                    <Image source={activity.avatar} style={styles.teacherAvatar} />
                    <Text style={styles.teacherName}>{activity.assignedBy}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Completed Activities Section */}
          <View style={styles.completedSection}>
            <Text style={styles.completedTitle}>Completed Activities</Text>
            {completedActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.activityCard}
                onPress={() => {
                  // Handle activity press
                }}
              >
                <View style={styles.activityLeft}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDueDate}>{activity.dueDate}</Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.assignedByText}>Assigned by:</Text>
                  <View style={styles.teacherInfo}>
                    <Image source={activity.avatar} style={styles.teacherAvatar} />
                    <Text style={styles.teacherName}>{activity.assignedBy}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  header: {
    backgroundColor: COLORS.lightGreen,
    paddingBottom: SIZES.padding,
  },
  headerTitle: {
    fontSize: 32,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  toDoSection: {
    backgroundColor: COLORS.pink,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E91E63',
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
    ...SHADOWS.medium,
  },
  completedSection: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
    ...SHADOWS.medium,
  },
  completedTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: SIZES.margin,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  activityLeft: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDueDate: {
    fontSize: 14,
    color: COLORS.grey,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  assignedByText: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  teacherInfo: {
    alignItems: 'center',
  },
  teacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '500',
  },
});
