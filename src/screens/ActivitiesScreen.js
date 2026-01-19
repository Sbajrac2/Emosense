import React, { useState } from 'react';
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
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';

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
  const { isTTSEnabled } = useTTS();
  const [completedActivityIds, setCompletedActivityIds] = useState([]);
  const emotionActivities = {
    happy: [
      {
        id: 1,
        title: 'Photos',
        description: 'Happy Photos',
        fullDescription: 'Identify Happy emotions in photos',
        type: 'picture_emotion',
        emotion: 'happy',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 2,
        title: 'Videos',
        description: 'Happy Videos',
        fullDescription: 'Watch videos and find happy moments',
        type: 'video_emotion',
        emotion: 'happy',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 3,
        title: 'Matching',
        description: 'Happy Matching',
        fullDescription: 'Match happy faces with situations',
        type: 'emotion_matching',
        emotion: 'happy',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 4,
        title: 'Swipe',
        description: 'Happy Swipe',
        fullDescription: 'Swipe through happy emotions',
        type: 'swipe_emotion',
        emotion: 'happy',
        assignedBy: 'Mr. Mike',
        avatar: IMAGES.photo_man,
      },
    ],
    sad: [
      {
        id: 5,
        title: 'Photos',
        description: 'Sad Photos',
        fullDescription: 'Recognize sad emotions in pictures',
        type: 'picture_emotion',
        emotion: 'sad',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 6,
        title: 'Videos',
        description: 'Sad Videos',
        fullDescription: 'Identify sadness in video clips',
        type: 'video_emotion',
        emotion: 'sad',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 7,
        title: 'Matching',
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
        title: 'Photos',
        description: 'Angry Photos',
        fullDescription: 'Spot angry expressions in photos',
        type: 'picture_emotion',
        emotion: 'angry',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 9,
        title: 'Videos',
        description: 'Angry Videos',
        fullDescription: 'Recognize anger in video clips',
        type: 'video_emotion',
        emotion: 'angry',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 10,
        title: 'Swipe',
        description: 'Angry Swipe',
        fullDescription: 'Swipe through angry emotions',
        type: 'swipe_emotion',
        emotion: 'angry',
        assignedBy: 'Mr. Mike',
        avatar: IMAGES.photo_man,
      },
    ],
    surprised: [
      {
        id: 11,
        title: 'Photos',
        description: 'Surprise Photos',
        fullDescription: 'Find surprised faces in pictures',
        type: 'picture_emotion',
        emotion: 'surprised',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 12,
        title: 'Videos',
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
        title: 'Photos',
        description: 'Mixed Emotions',
        fullDescription: 'Identify various emotions together',
        type: 'picture_emotion',
        emotion: 'mixed',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 14,
        title: 'Videos',
        description: 'Social Cues',
        fullDescription: 'Understand social emotional cues',
        type: 'video_emotion',
        emotion: 'mixed',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 16,
        title: 'Sort Emotions',
        description: 'Emotion Sorting',
        fullDescription: 'Sort faces into emotion bins',
        type: 'emotion_sort',
        emotion: 'mixed',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 17,
        title: 'Story Time',
        description: 'Emotion Stories',
        fullDescription: 'Complete emotion story sequences',
        type: 'emotion_story',
        emotion: 'mixed',
        assignedBy: 'Ms. Lisa',
        avatar: IMAGES.photo_girl,
      },
      {
        id: 18,
        title: 'Body Detective',
        description: 'Body Language',
        fullDescription: 'Identify emotions from body language',
        type: 'body_language',
        emotion: 'mixed',
        assignedBy: 'Mr. John',
        avatar: IMAGES.photo_boy,
      },
      {
        id: 19,
        title: 'Intensity Order',
        description: 'Emotion Intensity',
        fullDescription: 'Order emotions by intensity',
        type: 'emotion_intensity',
        emotion: 'mixed',
        assignedBy: 'Mrs. Kate',
        avatar: IMAGES.photo_woman,
      },
      {
        id: 20,
        title: 'Build-A-Face',
        description: 'Face Builder',
        fullDescription: 'Build faces to match emotions',
        type: 'build_face',
        emotion: 'mixed',
        assignedBy: 'Mr. Mike',
        avatar: IMAGES.photo_man,
      },
    ],
    ai: [
      {
        id: 15,
        title: 'AI Learning',
        description: 'AI Learning',
        fullDescription: 'Learn with AI personalized lessons',
        type: 'ai_learning',
        emotion: 'ai',
        assignedBy: 'AI Teacher',
        avatar: IMAGES.photo_girl,
      },
    ],
  };

  const getAllActivities = () => {
    return Object.values(emotionActivities).flat();
  };

  const completedActivities = getAllActivities().filter(activity => 
    completedActivityIds.includes(activity.id)
  );

  const activeActivities = getAllActivities().filter(activity => 
    !completedActivityIds.includes(activity.id)
  );

  const handleActivityPress = async (activity) => {
    if (isTTSEnabled) await TTS.speak(`Starting ${activity.description}`);
    
    switch (activity.type) {
      case 'picture_emotion':
        navigation.navigate('PictureEmotionActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'video_emotion':
        navigation.navigate('VideoEmotionActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'swipe_emotion':
        navigation.navigate('SwipeEmotionActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'emotion_matching':
        navigation.navigate('EmotionMatchingActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'ai_learning':
        navigation.navigate('AILearningActivity', { activityId: activity.id });
        break;
      case 'slider_emotion':
        navigation.navigate('SliderEmotionActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'emotion_sort':
        navigation.navigate('EmotionSortActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'emotion_story':
        navigation.navigate('EmotionStoryActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'body_language':
        navigation.navigate('BodyLanguageActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'emotion_intensity':
        navigation.navigate('EmotionIntensityActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      case 'build_face':
        navigation.navigate('BuildAFaceActivity', { emotion: activity.emotion, activityId: activity.id });
        break;
      default:
        navigation.navigate('MatchingExercise', { lessonId: activity.id, activityId: activity.id });
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'picture_emotion': return '📷';
      case 'video_emotion': return '🎥';
      case 'swipe_emotion': return '👆';
      case 'emotion_matching': return '🔗';
      case 'emoji_matching': return '😊';
      case 'slider_emotion': return '🎚️';
      case 'emotion_sort': return '🗂️';
      case 'emotion_story': return '📖';
      case 'body_language': return '🕵️';
      case 'emotion_intensity': return '📊';
      case 'build_face': return '🎭';
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
      <TTSToggle />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Activities</Text>
          </View>

          {Object.entries(emotionActivities).map(([emotion, activities]) => {
            const activeEmotionActivities = activities.filter(activity => 
              !completedActivityIds.includes(activity.id)
            );
            if (activeEmotionActivities.length === 0) return null;
            
            return (
              <View key={emotion} style={[styles.emotionSection, { backgroundColor: getEmotionColor(emotion) }]}>
                <Text style={styles.sectionTitle}>{emotion.charAt(0).toUpperCase() + emotion.slice(1)} Activities</Text>
                {activeEmotionActivities.map(renderActivityCard)}
              </View>
            );
          })}

          {completedActivities.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.sectionTitle}>Completed ({completedActivities.length})</Text>
              {completedActivities.map(renderActivityCard)}
            </View>
          )}


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
