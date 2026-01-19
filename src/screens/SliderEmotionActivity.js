import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Slider } from '@react-native-community/slider';
import SpeakerButton from '../components/SpeakerButton';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
// import { getRandomFeedback } from '../utils/feedbackMessages';

export default function SliderEmotionActivity({ navigation, route }) {
  const { emotion } = route.params || { emotion: 'happy' };
  const [currentTask, setCurrentTask] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const { isTTSEnabled } = useTTS();

  const getTasksForEmotion = (targetEmotion) => {
    const allTasks = {
      happy: [
        {
          image: IMAGES.happy_real,
          question: 'Rate happiness',
          fullQuestion: 'Use the slider to rate happiness level',
          correctRange: [60, 100],
          labels: ['😢', '😐', '😊']
        },
        {
          image: IMAGES.angry_female_1,
          question: 'Rate happiness',
          fullQuestion: 'Use the slider to rate happiness level',
          correctRange: [0, 40],
          labels: ['😢', '😐', '😊']
        },
        {
          image: IMAGES.angry_male_2,
          question: 'Rate happiness',
          fullQuestion: 'Use the slider to rate happiness level',
          correctRange: [10, 50],
          labels: ['😢', '😐', '😊']
        },
      ],
      angry: [
        {
          image: IMAGES.angry_male_1,
          question: 'Rate anger',
          fullQuestion: 'Use the slider to rate anger level',
          correctRange: [70, 100],
          labels: ['😌', '😠', '🤬']
        },
        {
          image: IMAGES.happy_real,
          question: 'Rate anger',
          fullQuestion: 'Use the slider to rate anger level',
          correctRange: [0, 30],
          labels: ['😌', '😠', '🤬']
        },
        {
          image: IMAGES.angry_female_2,
          question: 'Rate anger',
          fullQuestion: 'Use the slider to rate anger level',
          correctRange: [60, 90],
          labels: ['😌', '😠', '🤬']
        },
      ],
    };
    return allTasks[targetEmotion] || allTasks.happy;
  };

  const tasks = getTasksForEmotion(emotion);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleSubmit = async () => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    const [min, max] = tasks[currentTask].correctRange;
    const isCorrect = sliderValue >= min && sliderValue <= max;
    
    if (isCorrect) {
      setScore(score + 1);
      const feedback = ['Well done!', 'That\'s right!', 'Nice work!', 'Correct!', 'Great!'][Math.floor(Math.random() * 5)];
      if (isTTSEnabled) await TTS.speakFeedback(feedback, true);
    } else {
      if (attempts === 0) {
        if (isTTSEnabled) await TTS.speakFeedback('Try again', false);
        setAttempts(1);
        setHasAnswered(false);
        return;
      } else {
        if (isTTSEnabled) await TTS.speakFeedback('Nice try', false);
      }
    }
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSliderValue(50);
      setHasAnswered(false);
      setAttempts(0);
    } else {
      navigation.navigate('LessonSummary', {
        score,
        totalQuestions: tasks.length,
        lessonTitle: `${emotion} Slider`,
        source: 'activities',

      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.progress}>{currentTask + 1}/{tasks.length}</Text>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{tasks[currentTask].question}</Text>
            <SpeakerButton 
              text={tasks[currentTask].fullQuestion} 
              type="question" 
              size={16} 
              style={styles.speakerButton}
            />
          </View>

          <View style={styles.imageContainer}>
            <Image source={tasks[currentTask].image} style={styles.questionImage} resizeMode="contain" />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.labelsContainer}>
              {tasks[currentTask].labels.map((label, index) => (
                <Text key={index} style={styles.emojiLabel}>{label}</Text>
              ))}
            </View>
            
            <View style={[styles.slider, { backgroundColor: COLORS.lightGrey, height: 40, borderRadius: 20 }]}>
              <View style={[styles.sliderThumb, { left: `${sliderValue}%`, backgroundColor: COLORS.darkBlue }]} />
            </View>
            <TouchableOpacity onPress={() => setSliderValue(Math.max(0, sliderValue - 10))} style={styles.sliderButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSliderValue(Math.min(100, sliderValue + 10))} style={styles.sliderButton}>
              <Text>+</Text>
            </TouchableOpacity>
            
            <Text style={styles.valueText}>{Math.round(sliderValue) || 0}</Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, hasAnswered && styles.disabledButton]}
            onPress={hasAnswered ? handleNext : handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {hasAnswered ? (currentTask === tasks.length - 1 ? 'Finish' : 'Next') : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  scrollView: { flex: 1 },
  content: { padding: SIZES.padding, alignItems: 'center', paddingBottom: 50 },
  progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  title: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center', fontWeight: 'bold' },
  speakerButton: { marginLeft: 8 },
  imageContainer: { width: 250, height: 250, backgroundColor: COLORS.white, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, ...SHADOWS.medium },
  questionImage: { width: 230, height: 230, borderRadius: 15 },
  sliderContainer: { width: '100%', alignItems: 'center', marginBottom: 30 },
  labelsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 10 },
  emojiLabel: { fontSize: 24 },
  slider: { width: '80%', height: 40 },
  sliderThumb: { position: 'absolute', top: 5, width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.orange },
  sliderButton: { backgroundColor: COLORS.lightBlue, padding: 10, margin: 5, borderRadius: 5 },
  valueText: { fontSize: SIZES.large, color: COLORS.darkBlue, fontWeight: 'bold', marginTop: 10 },
  submitButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, ...SHADOWS.small },
  disabledButton: { backgroundColor: COLORS.darkBlue },
  submitButtonText: { fontSize: SIZES.large, color: COLORS.white, fontWeight: 'bold' },
});