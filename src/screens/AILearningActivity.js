import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import SpeakerButton from '../components/SpeakerButton';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import TTS from '../utils/textToSpeech';

export default function AILearningActivity({ navigation, route }) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState(null);

  const predefinedTopics = [
    'Understanding facial expressions',
    'Body language basics',
    'Social situations',
    'Managing emotions',
    'Communication skills',
    'Friendship building'
  ];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCustomTopic('');
  };

  const generateLesson = async () => {
    const topic = selectedTopic || customTopic;
    if (!topic.trim()) {
      Alert.alert('Please select or enter a topic');
      return;
    }

    setIsGenerating(true);
    await TTS.speak(`Generating lesson about ${topic}`);

    // Generate actual activities based on topic
    setTimeout(() => {
      const lesson = createLessonActivities(topic);
      setGeneratedLesson(lesson);
      setIsGenerating(false);
    }, 2000);
  };

  const createLessonActivities = (topic) => {
    const topicLower = topic.toLowerCase();
    let activities = [];

    if (topicLower.includes('happiness') || topicLower.includes('happy')) {
      activities = [
        {
          id: 1,
          type: 'picture_emotion',
          title: 'Identify Happy Faces',
          description: 'Look at photos and identify happy expressions',
          emotion: 'happy'
        },
        {
          id: 2,
          type: 'video_emotion', 
          title: 'Happy Video Analysis',
          description: 'Watch videos showing happiness',
          emotion: 'happy'
        },
        {
          id: 3,
          type: 'matching',
          title: 'Match Happy Situations',
          description: 'Connect happy faces with situations that cause happiness'
        }
      ];
    } else if (topicLower.includes('sad') || topicLower.includes('sadness')) {
      activities = [
        {
          id: 1,
          type: 'picture_emotion',
          title: 'Recognize Sadness',
          description: 'Identify sad expressions in photos',
          emotion: 'sad'
        },
        {
          id: 2,
          type: 'video_emotion',
          title: 'Understanding Sadness',
          description: 'Watch and analyze sad emotions in videos',
          emotion: 'sad'
        }
      ];
    } else if (topicLower.includes('angry') || topicLower.includes('anger')) {
      activities = [
        {
          id: 1,
          type: 'picture_emotion',
          title: 'Spot Anger Signs',
          description: 'Learn to identify angry facial expressions',
          emotion: 'angry'
        },
        {
          id: 2,
          type: 'video_emotion',
          title: 'Anger in Action',
          description: 'Observe anger expressions in video clips',
          emotion: 'angry'
        }
      ];
    } else {
      // Default mixed activities
      activities = [
        {
          id: 1,
          type: 'picture_emotion',
          title: `Learn about ${topic}`,
          description: `Practice identifying ${topic} in images`,
          emotion: 'mixed'
        },
        {
          id: 2,
          type: 'video_emotion',
          title: `${topic} in Videos`,
          description: `Watch videos related to ${topic}`,
          emotion: 'mixed'
        }
      ];
    }

    return {
      title: `Learning: ${topic}`,
      topic: topic,
      activities: activities
    };
  };

  const startActivity = (activity) => {
    switch (activity.type) {
      case 'picture_emotion':
        navigation.navigate('PictureEmotionActivity', { emotion: activity.emotion });
        break;
      case 'video_emotion':
        navigation.navigate('VideoEmotionActivity', { emotion: activity.emotion });
        break;
      default:
        navigation.navigate('PictureEmotionActivity', { emotion: 'mixed' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>AI Learning</Text>
            <SpeakerButton 
              text="Choose what you want to learn and AI will create a personalized lesson for you" 
              type="instruction" 
              size={18} 
              style={styles.speakerButton}
            />
          </View>

          <Text style={styles.sectionTitle}>Choose a topic:</Text>
          
          <View style={styles.topicsContainer}>
            {predefinedTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topicButton,
                  selectedTopic === topic && styles.selectedTopic
                ]}
                onPress={() => handleTopicSelect(topic)}
              >
                <Text style={[
                  styles.topicText,
                  selectedTopic === topic && styles.selectedTopicText
                ]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.orText}>Or enter your own:</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="What would you like to learn about?"
            value={customTopic}
            onChangeText={setCustomTopic}
            multiline
          />

          <TouchableOpacity
            style={[styles.generateButton, isGenerating && styles.disabledButton]}
            onPress={generateLesson}
            disabled={isGenerating}
          >
            <Text style={styles.generateButtonText}>
              {isGenerating ? 'Generating...' : 'Generate Lesson'}
            </Text>
          </TouchableOpacity>

          {generatedLesson && (
            <View style={styles.lessonContainer}>
              <Text style={styles.lessonTitle}>{generatedLesson.title}</Text>
              
              <Text style={styles.activitiesTitle}>Choose an activity:</Text>
              {generatedLesson.activities.map((activity, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.activityButton}
                  onPress={() => startActivity(activity)}
                >
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </TouchableOpacity>
              ))}
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
  content: { padding: SIZES.padding },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, color: COLORS.black, fontWeight: 'bold', marginBottom: 10 },
  speakerButton: { marginLeft: 10 },
  sectionTitle: { fontSize: 20, color: COLORS.black, fontWeight: 'bold', marginBottom: 15 },
  topicsContainer: { marginBottom: 20 },
  topicButton: { 
    backgroundColor: COLORS.lightBlue, 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10,
    ...SHADOWS.small 
  },
  selectedTopic: { backgroundColor: COLORS.darkBlue },
  topicText: { fontSize: 16, color: COLORS.darkBlue, textAlign: 'center' },
  selectedTopicText: { color: COLORS.white },
  orText: { fontSize: 16, color: COLORS.grey, textAlign: 'center', marginVertical: 15 },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
    ...SHADOWS.small
  },
  generateButton: {
    backgroundColor: COLORS.orange,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOWS.medium
  },
  disabledButton: { opacity: 0.5 },
  generateButtonText: { fontSize: 18, color: COLORS.white, fontWeight: 'bold' },
  lessonContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    ...SHADOWS.medium
  },
  lessonTitle: { fontSize: 22, color: COLORS.black, fontWeight: 'bold', marginBottom: 15 },
  lessonContent: { fontSize: 16, color: COLORS.black, marginBottom: 20, lineHeight: 24 },
  activitiesTitle: { fontSize: 18, color: COLORS.black, fontWeight: 'bold', marginBottom: 10 },
  activityItem: { fontSize: 16, color: COLORS.black, marginBottom: 5, marginLeft: 10 },
  activityButton: {
    backgroundColor: COLORS.lightBlue,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    ...SHADOWS.small
  },
  activityTitle: { fontSize: 16, color: COLORS.darkBlue, fontWeight: 'bold', marginBottom: 5 },
  activityDescription: { fontSize: 14, color: COLORS.darkBlue },
});