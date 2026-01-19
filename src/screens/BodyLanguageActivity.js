import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
import { generateVisualCues, getCueStyle } from '../utils/visualCueHelper';

export default function BodyLanguageActivity({ navigation, route }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { isTTSEnabled } = useTTS();

  const tasks = [
    {
      image: require('../../assets/images/Happy_real.png'),
      question: 'What emotion from body language?',
      correctAnswer: 'Happy',
      options: ['Happy', 'Sad', 'Angry', 'Tired'],
      hint: 'Look at the posture and shoulders - they are relaxed and open'
    },
    {
      image: IMAGES.angry_female_1,
      question: 'What do you see in the posture?',
      correctAnswer: 'Angry',
      options: ['Calm', 'Angry', 'Happy', 'Surprised'],
      hint: 'Notice the tense shoulders and closed posture'
    },
    {
      image: require('../../assets/images/TIred_real.png'),
      question: 'How does the body show feeling?',
      correctAnswer: 'Tired',
      options: ['Energetic', 'Tired', 'Excited', 'Alert'],
      hint: 'Look at how the shoulders droop and the overall posture'
    },
    {
      image: require('../../assets/images/Sad.png'),
      question: 'What does this posture tell us?',
      correctAnswer: 'Sad',
      options: ['Happy', 'Sad', 'Excited', 'Confident'],
      hint: 'Notice the slumped shoulders and downward body position'
    },
    {
      image: require('../../assets/images/Surprised.png'),
      question: 'How is the body reacting?',
      correctAnswer: 'Surprised',
      options: ['Bored', 'Surprised', 'Sleepy', 'Calm'],
      hint: 'Look at the sudden, alert body position'
    },
    {
      image: require('../../assets/images/Worried_real.png'),
      question: 'What emotion shows in the stance?',
      correctAnswer: 'Worried',
      options: ['Confident', 'Worried', 'Relaxed', 'Joyful'],
      hint: 'Notice the tense, protective body language'
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) return;
    
    setAttempts(attempts + 1);
    
    if (selectedAnswer === tasks[currentTask].correctAnswer) {
      setScore(score + 1);
      if (isTTSEnabled) await TTS.speakFeedback('Excellent work!', true);
      handleNext();
    } else {
      if (attempts === 0) {
        if (isTTSEnabled) await TTS.speakFeedback('Look closer at the body language', false);
        setShowHint(true);
        setTimeout(() => {
          setSelectedAnswer(null);
          setShowHint(false);
        }, 4000);
      } else {
        if (isTTSEnabled) await TTS.speakFeedback('Good try! Let\'s continue', false);
        handleNext();
      }
    }
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setShowHint(false);
    } else {
      navigation.navigate('LessonSummary', {
        score,
        totalQuestions: tasks.length,
        lessonTitle: 'Body Language Detective',
        source: route.params?.source || 'activities'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.progress}>Task {currentTask + 1} of {tasks.length}</Text>
          <Text style={styles.title}>Body Language Detective</Text>
          <Text style={styles.subtitle}>Look at the body, not the face!</Text>

          <View style={styles.imageContainer}>
            <Image 
              source={tasks[currentTask].image} 
              style={styles.image} 
              resizeMode="contain" 
            />
            <View style={styles.faceBlur}>
              <Text style={styles.blurText}>?</Text>
            </View>
            {showHint && generateVisualCues(tasks[currentTask].hint).map((cue, index) => (
              <View key={index} style={getCueStyle(cue)} />
            ))}
          </View>

          <Text style={styles.question}>{tasks[currentTask].question}</Text>

          <View style={styles.optionsContainer}>
            {tasks[currentTask].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && option === tasks[currentTask].correctAnswer && styles.correctOption,
                  selectedAnswer === option && option !== tasks[currentTask].correctAnswer && styles.incorrectOption
                ]}
                onPress={() => handleAnswerSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedAnswer && attempts === 0 && (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}

          {attempts > 0 && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentTask === tasks.length - 1 ? 'Finish' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  scrollView: { flex: 1 },
  content: { padding: SIZES.padding, alignItems: 'center' },
  progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
  title: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center', marginBottom: 5, ...FONTS.bold },
  subtitle: { fontSize: SIZES.base, color: COLORS.darkBlue, textAlign: 'center', marginBottom: 20 },
  imageContainer: { position: 'relative', marginBottom: 20 },
  image: { width: 200, height: 200, borderRadius: 15 },
  faceBlur: {
    position: 'absolute',
    top: 10,
    left: 40,
    width: 120,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blurText: {
    color: COLORS.white,
    fontSize: SIZES.base,
    fontWeight: 'bold'
  },
  question: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center', marginBottom: 20, ...FONTS.bold },
  optionsContainer: { width: '100%', maxWidth: 300 },
  optionButton: { backgroundColor: COLORS.lightBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, marginBottom: SIZES.margin, alignItems: 'center', ...SHADOWS.small },
  correctOption: { backgroundColor: '#4CAF50' },
  incorrectOption: { backgroundColor: '#F44336' },
  optionText: { fontSize: SIZES.large, color: COLORS.darkBlue, ...FONTS.bold },
  submitButton: { backgroundColor: COLORS.darkBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  submitButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold },
  nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  nextButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold }
});