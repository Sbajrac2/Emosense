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
import SpeakerButton from '../components/SpeakerButton';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';

const getEmotionColor = (emotion) => {
  switch (emotion) {
    case 'happy': return COLORS.yellow;
    case 'sad': return COLORS.lightBlue;
    case 'angry': return '#FFB3B3';
    case 'surprised': return COLORS.pink;
    case 'ai': return '#E8F5E8';
    default: return COLORS.lightGreen;
  }
};

export default function ActivitiesScreen({ navigation }) {
  const emotionActivities = {
    happy: [
      {
        id: 1,
        title: 'H1',
        description: 'Happy Photos',
        fullDescription: 'Identify Happy emotions in photos',
        type: 'picture_emotion',
        emotion: 'happy',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 2,
        title: 'H2',
        description: 'Happy Videos',
        fullDescription: 'Watch videos and find happy moments',
        type: 'video_emotion',
        emotion: 'happy',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 3,
        title: 'H3',
        description: 'Happy Matching',
        fullDescription: 'Match happy faces with situations',
        type: 'emotion_matching',
        emotion: 'happy',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 4,
        title: 'H4',
        description: 'Happy Levels',
        fullDescription: 'Identify different levels of happiness',
        type: 'picture_emotion',
        emotion: 'happy',
        assignedBy: 'Mr. Mike',
        avatar: IMAGES.photo_man,
      },
    ],
    sad: [
      {
        id: 5,
        title: 'S1',
        description: 'Sad Photos',
        fullDescription: 'Recognize sad emotions in pictures',
        type: 'picture_emotion',
        emotion: 'sad',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 6,
        title: 'S2',
        description: 'Sad Videos',
        fullDescription: 'Identify sadness in video clips',
        type: 'video_emotion',
        emotion: 'sad',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 7,
        title: 'S3',
        description: 'Sad Situations',
        fullDescription: 'Match sad emotions with causes',
        type: 'emotion_matching',
        emotion: 'sad',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
    ],
    angry: [
      {
        id: 8,
        title: 'A1',
        description: 'Angry Photos',
        fullDescription: 'Spot angry expressions in photos',
        type: 'picture_emotion',
        emotion: 'angry',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 9,
        title: 'A2',
        description: 'Angry Videos',
        fullDescription: 'Recognize anger in video clips',
        type: 'video_emotion',
        emotion: 'angry',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 10,
        title: 'A3',
        description: 'Anger Management',
        fullDescription: 'Learn about managing angry feelings',
        type: 'emotion_matching',
        emotion: 'angry',
        assignedBy: 'Mr. Mike',
        avatar: IMAGES.photo_man,
      },
    ],
    surprised: [
      {
        id: 11,
        title: 'Su1',
        description: 'Surprise Photos',
        fullDescription: 'Find surprised faces in pictures',
        type: 'picture_emotion',
        emotion: 'surprised',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 12,
        title: 'Su2',
        description: 'Surprise Videos',
        fullDescription: 'Spot surprise reactions in videos',
        type: 'video_emotion',
        emotion: 'surprised',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
    ],
    mixed: [
      {
        id: 13,
        title: 'M1',
        description: 'Mixed Emotions',
        fullDescription: 'Identify various emotions together',
        type: 'picture_emotion',
        emotion: 'mixed',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 14,
        title: 'M2',
        description: 'Social Cues',
        fullDescription: 'Understand social emotional cues',
        type: 'video_emotion',
        emotion: 'mixed',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
    ],
    ai: [
      {
        id: 15,
        title: 'AI',
        description: 'AI Learning',
        fullDescription: 'Learn with AI personalized lessons',
        type: 'ai_learning',
        emotion: 'ai',
        assignedBy: 'AI Teacher',
        avatar: IMAGES.photo_girl,
      },
    ],
  };

  const completedActivities = [
    {
      id: 9,
      title: 'C1',
      description: 'Basic Emotions',
      fullDescription: 'Basic Emotion Recognition Activity',
      type: 'picture_emotion',
      emotion: 'mixed',
      assignedBy: 'Ms. Lisa',
      avatar: IMAGES.photo_girl,
    },
  ];

  const handleActivityPress = async (activity) => {
    await TTS.speak(`Starting ${activity.fullDescription}`);
    
    switch (activity.type) {
      case 'picture_emotion':
        navigation.navigate('PictureEmotionActivity', { emotion: activity.emotion });
        break;
      case 'video_emotion':
        navigation.navigate('VideoEmotionActivity', { emotion: activity.emotion });
        break;
      case 'swipe_emotion':
        navigation.navigate('SwipeEmotionActivity', { emotion: activity.emotion });
        break;
      case 'emotion_matching':
        navigation.navigate('EmotionMatchingActivity', { emotion: activity.emotion });
        break;
      case 'ai_learning':
        navigation.navigate('AILearningActivity');
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
            <View style={styles.titleRow}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <SpeakerButton 
                text={activity.fullDescription} 
                size={14} 
                style={styles.activitySpeaker}
              />
            </View>
            <Text style={styles.activityDescription}>{activity.description}</Text>
          </View>
        </View>
        <Text style={styles.activityDueDate}>{activity.dueDate}</Text>
      </View>
      <View style={styles.activityRight}>
        <Text style={styles.assignedByText}>By:</Text>
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

          {Object.entries(emotionActivities).map(([emotion, activities]) => (
            <View key={emotion} style={[styles.emotionSection, { backgroundColor: getEmotionColor(emotion) }]}>
              <Text style={styles.sectionTitle}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)} Activities</Text>
              {activities.map(renderActivityCard)}
            </View>
          ))}

          <View style={styles.completedSection}>
            <Text style={styles.sectionTitle}>Completed</Text>
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
  emotionSection: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.darkBlue,
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
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  activitySpeaker: { marginLeft: 8 },
});
