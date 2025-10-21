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
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

export default function ActivitiesScreen({ navigation }) {
  const toDoActivities = [
    {
      id: 1,
      title: 'Activity 1',
      description: 'Real Photo Emotions',
      type: 'picture_emotion',
      dueDate: 'Sept 20',
      assignedBy: 'Ms. Lisa',
      avatar: IMAGES.photo_girl,
    },
    {
      id: 2,
      title: 'Activity 2',
      description: 'Video Emotion Recognition',
      type: 'video_emotion',
      dueDate: 'Sept 22',
      assignedBy: 'Mr. John',
      avatar: IMAGES.photo_boy,
    },
    {
      id: 3,
      title: 'Activity 3',
      description: 'Swipe Emotion Cards',
      type: 'swipe_emotion',
      dueDate: 'Sept 25',
      assignedBy: 'Mrs. Kate',
      avatar: IMAGES.photo_woman,
    },
    {
      id: 4,
      title: 'Activity 4',
      description: 'Match Real & Cartoon Emotions',
      type: 'emotion_matching',
      dueDate: 'Sept 28',
      assignedBy: 'Mr. Mike',
      avatar: IMAGES.photo_man,
    },
    {
      id: 5,
      title: 'Activity 5',
      description: 'Emoji Quiz Challenge',
      type: 'emoji_matching',
      dueDate: 'Oct 1',
      assignedBy: 'Ms. Lisa',
      avatar: IMAGES.photo_girl,
    },
  ];

  const completedActivities = [
    {
      id: 6,
      title: 'Activity 6',
      description: 'Basic Emotion Recognition',
      type: 'picture_emotion',
      dueDate: 'Sept 15',
      assignedBy: 'Ms. Lisa',
      avatar: IMAGES.photo_girl,
    },
    {
      id: 7,
      title: 'Activity 7',
      description: 'Emotion Scenarios',
      type: 'video_emotion',
      dueDate: 'Sept 18',
      assignedBy: 'Mr. John',
      avatar: IMAGES.photo_boy,
    },
  ];

  const handleActivityPress = (activity) => {
    switch (activity.type) {
      case 'picture_emotion':
        navigation.navigate('PictureEmotionActivity');
        break;
      case 'video_emotion':
        navigation.navigate('VideoEmotionActivity');
        break;
      case 'swipe_emotion':
        navigation.navigate('SwipeEmotionActivity');
        break;
      case 'emotion_matching':
        navigation.navigate('EmotionMatchingActivity');
        break;
      case 'emoji_matching':
        navigation.navigate('MatchingExercise', { lessonId: activity.id });
        break;
      default:
        navigation.navigate('MatchingExercise', { lessonId: activity.id });
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'picture_emotion': return '📷';
      case 'video_emotion': return '🎥';
      case 'swipe_emotion': return '👆';
      case 'emotion_matching': return '🔗';
      case 'emoji_matching': return '😊';
      default: return '📝';
    }
  };

  const renderActivityCard = (activity) => (
    <TouchableOpacity
      key={activity.id}
      style={styles.activityCard}
      onPress={() => handleActivityPress(activity)}
    >
      <View style={styles.activityLeft}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityIcon}>{getActivityIcon(activity.type)}</Text>
          <View style={styles.activityTitleContainer}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
          </View>
        </View>
        <Text style={styles.activityDueDate}>Due: {activity.dueDate}</Text>
      </View>
      <View style={styles.activityRight}>
        <Text style={styles.assignedByText}>Assigned by:</Text>
        <View style={styles.teacherInfo}>
          <Image source={activity.avatar} style={styles.teacherAvatar} />
          <Text style={styles.teacherName}>{activity.assignedBy}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Activities</Text>
          </View>

          <View style={styles.toDoSection}>
            <Text style={styles.sectionTitle}>To Do</Text>
            {toDoActivities.map(renderActivityCard)}
          </View>

          <View style={styles.completedSection}>
            <Text style={styles.sectionTitle}>Completed Activities</Text>
            {completedActivities.map(renderActivityCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  scrollView: { flex: 1 },
  content: { flex: 1, paddingHorizontal: SIZES.padding, paddingTop: SIZES.padding, paddingBottom: SIZES.padding },
  header: { backgroundColor: COLORS.lightGreen, paddingBottom: SIZES.padding },
  headerTitle: { fontSize: 32, color: COLORS.black, fontWeight: 'bold', marginBottom: 8 },
  sectionTitle: { fontSize: 22, color: COLORS.black, fontWeight: 'bold', marginBottom: SIZES.margin },
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
  activityLeft: { flex: 1 },
  activityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  activityIcon: { fontSize: 24, marginRight: 12 },
  activityTitleContainer: { flex: 1 },
  activityTitle: { fontSize: 16, color: COLORS.black, fontWeight: '500', marginBottom: 2 },
  activityDescription: { fontSize: 12, color: COLORS.grey },
  activityDueDate: { fontSize: 14, color: COLORS.grey },
  activityRight: { alignItems: 'flex-end' },
  assignedByText: { fontSize: 12, color: COLORS.grey, marginBottom: 4 },
  teacherInfo: { alignItems: 'center' },
  teacherAvatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 4 },
  teacherName: { fontSize: 12, color: COLORS.black, fontWeight: '500' },
});
