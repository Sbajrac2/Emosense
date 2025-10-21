import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

export default function PictureEmotionActivity({ navigation }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showHintMessage, setShowHintMessage] = useState(false);
  
  const tasks = [
    {
      image: require('../../assets/images/Happy_real.png'),
      question: 'What emotion is shown?',
      correctAnswer: 'Happy',
      options: ['Happy', 'Sad', 'Angry', 'Surprised'],
      hint: 'Look at the smile and bright eyes!'
    },
    {
      image: require('../../assets/images/Angry_real.png'),
      question: 'How does this person feel?',
      correctAnswer: 'Angry',
      options: ['Happy', 'Sad', 'Angry', 'Tired'],
      hint: 'Notice the frown and tense face muscles.'
    },
    {
      image: require('../../assets/images/Surprised_real.png'),
      question: 'What emotion do you see?',
      correctAnswer: 'Surprised',
      options: ['Excited', 'Worried', 'Happy', 'Surprised'],
      hint: 'Look at the wide open eyes and mouth!'
    },
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === tasks[currentTask].correctAnswer) {
      setScore(score + 1);
    }

    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelectedAnswer(null);
    } else {
      navigation.navigate('LessonSummary', { 
        score, 
        totalQuestions: tasks.length, 
        lessonTitle: 'Picture Emotions' 
      });
    }
  };

  const handleHome = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setShowHintMessage(true)}>
            <Image source={IMAGES.hint} style={styles.topBarIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleHome} style={styles.homeButton}>
            <Text style={styles.homeIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowHelpMessage(true)}>
            <Image source={IMAGES.help} style={styles.topBarIcon} />
          </TouchableOpacity>
        </View>

        {showHintMessage && (
          <View style={[styles.popupWrapper, { top: 60, left: 20 }]}>
            <Text style={styles.helpText}>{tasks[currentTask].hint}</Text>
            <TouchableOpacity onPress={() => setShowHintMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {showHelpMessage && (
          <View style={[styles.popupWrapper, { top: 60, right: 20 }]}>
            <Text style={styles.helpText}>Look at facial expressions to identify emotions.</Text>
            <TouchableOpacity onPress={() => setShowHelpMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.progress}>Task {currentTask + 1} of {tasks.length}</Text>
        <Text style={styles.title}>{tasks[currentTask].question}</Text>
        
        <View style={styles.imageContainer}>
          <Image source={tasks[currentTask].image} style={styles.questionImage} resizeMode="contain" />
        </View>

        <View style={styles.optionsContainer}>
          {tasks[currentTask].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option && option === tasks[currentTask].correctAnswer && styles.correctOption,
                selectedAnswer === option && option !== tasks[currentTask].correctAnswer && styles.incorrectOption,
              ]}
              onPress={() => handleAnswerSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedAnswer}
        >
          <Text style={styles.nextButtonText}>
            {currentTask === tasks.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  content: { flex: 1, padding: SIZES.padding, position: 'relative' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.margin },
  homeButton: { backgroundColor: COLORS.white, borderRadius: 20, padding: 8 },
  homeIcon: { fontSize: 20 },
  topBarIcon: { width: 28, height: 28, resizeMode: 'contain' },
  popupWrapper: {
    position: 'absolute',
    maxWidth: width * 0.7,
    backgroundColor: '#ffe6f0',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    zIndex: 999,
  },
  helpText: { fontSize: SIZES.base, color: COLORS.black, textAlign: 'center' },
  closeButton: { marginTop: 10, padding: 5 },
  closeText: { color: COLORS.darkBlue, fontWeight: 'bold' },
  progress: { fontSize: SIZES.base, color: COLORS.grey, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 30, textAlign: 'center' },
  imageContainer: { width: 250, height: 250, backgroundColor: COLORS.white, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, alignSelf: 'center' },
  questionImage: { width: 230, height: 230, borderRadius: 15 },
  optionsContainer: { width: '100%', maxWidth: 300, alignSelf: 'center' },
  optionButton: { backgroundColor: COLORS.lightBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, marginBottom: SIZES.margin, alignItems: 'center' },
  correctOption: { backgroundColor: '#4CAF50' },
  incorrectOption: { backgroundColor: '#F44336' },
  optionText: { fontSize: SIZES.large, color: COLORS.darkBlue },
  nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, alignSelf: 'center' },
  disabledButton: { opacity: 0.5 },
  nextButtonText: { fontSize: SIZES.large, color: COLORS.white },
});
