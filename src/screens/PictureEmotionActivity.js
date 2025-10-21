import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import SpeakerButton from '../components/SpeakerButton';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';

const { width } = Dimensions.get('window');

export default function PictureEmotionActivity({ navigation, route }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showHintMessage, setShowHintMessage] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showSecondChance, setShowSecondChance] = useState(false);
  
  const getTasksForEmotion = (targetEmotion) => {
    const allTasks = {
      happy: [
        {
          image: require('../../assets/images/Happy_real.png'),
          question: 'What emotion?',
          fullQuestion: 'What emotion is shown in this picture?',
          correctAnswer: 'Happy',
          options: ['Happy', 'Sad', 'Angry', 'Surprised'],
          hint: 'Look at the smile and bright eyes!'
        },
        {
          image: require('../../assets/images/Happ2_real.png'),
          question: 'How happy?',
          fullQuestion: 'How happy does this person look?',
          correctAnswer: 'Very Happy',
          options: ['Slightly Happy', 'Very Happy', 'Not Happy', 'Sad'],
          hint: 'Notice the big smile and joyful expression'
        },
        {
          image: require('../../assets/images/Excited_real.png'),
          question: 'What type of happiness?',
          fullQuestion: 'What type of happy feeling is this?',
          correctAnswer: 'Excited',
          options: ['Calm', 'Excited', 'Tired', 'Bored'],
          hint: 'Look at the energy in their expression'
        },
      ],
      sad: [
        {
          image: require('../../assets/images/TIred_real.png'),
          question: 'What emotion?',
          fullQuestion: 'What emotion do you see here?',
          correctAnswer: 'Tired',
          options: ['Happy', 'Tired', 'Angry', 'Surprised'],
          hint: 'Notice the droopy eyes and low energy'
        },
        {
          image: require('../../assets/images/Worried_real.png'),
          question: 'How do they feel?',
          fullQuestion: 'How does this person feel?',
          correctAnswer: 'Worried',
          options: ['Happy', 'Worried', 'Angry', 'Excited'],
          hint: 'Look at the concerned expression'
        },
      ],
      angry: [
        {
          image: IMAGES.angry_female_1,
          question: 'What emotion?',
          fullQuestion: 'What emotion is displayed here?',
          correctAnswer: 'Angry',
          options: ['Happy', 'Sad', 'Angry', 'Tired'],
          hint: 'Notice the frown and tense face muscles'
        },
        {
          image: IMAGES.angry_female_2,
          question: 'How angry?',
          fullQuestion: 'How angry does this person appear?',
          correctAnswer: 'Very Angry',
          options: ['Slightly Angry', 'Very Angry', 'Not Angry', 'Happy'],
          hint: 'Look at the intensity of the angry expression'
        },
        {
          image: IMAGES.angry_male_1,
          question: 'Male anger?',
          fullQuestion: 'What type of anger is this male showing?',
          correctAnswer: 'Frustrated',
          options: ['Calm', 'Frustrated', 'Happy', 'Confused'],
          hint: 'Look at the facial tension and expression'
        },
        {
          image: IMAGES.angry_male_2,
          question: 'Anger level?',
          fullQuestion: 'What level of anger do you see?',
          correctAnswer: 'Moderate',
          options: ['None', 'Mild', 'Moderate', 'Extreme'],
          hint: 'Notice the controlled but tense expression'
        },
        {
          image: IMAGES.angry_female_3,
          question: 'Expression type?',
          fullQuestion: 'What type of angry expression is this?',
          correctAnswer: 'Irritated',
          options: ['Pleasant', 'Irritated', 'Sleepy', 'Excited'],
          hint: 'Look at the eyebrows and mouth position'
        },
      ],
      surprised: [
        {
          image: require('../../assets/images/Surprised_real.png'),
          question: 'What emotion?',
          fullQuestion: 'What emotion do you see in this face?',
          correctAnswer: 'Surprised',
          options: ['Excited', 'Worried', 'Happy', 'Surprised'],
          hint: 'Look at the wide open eyes and mouth!'
        },
        {
          image: require('../../assets/images/Surprised2_real.png'),
          question: 'What kind of surprise?',
          fullQuestion: 'What kind of surprise is this?',
          correctAnswer: 'Shocked',
          options: ['Pleasant Surprise', 'Shocked', 'Happy', 'Confused'],
          hint: 'Notice the intensity of the surprised look'
        },
      ],
      mixed: [
        {
          image: require('../../assets/images/Happy_real.png'),
          question: 'What emotion?',
          fullQuestion: 'What emotion is shown in this picture?',
          correctAnswer: 'Happy',
          options: ['Happy', 'Sad', 'Angry', 'Surprised'],
          hint: 'Look at the smile and bright eyes!'
        },
        {
          image: require('../../assets/images/Disgusted_real.png'),
          question: 'What feeling?',
          fullQuestion: 'What feeling does this person show?',
          correctAnswer: 'Disgusted',
          options: ['Happy', 'Disgusted', 'Surprised', 'Tired'],
          hint: 'Look at the facial expression showing dislike'
        },
        {
          image: require('../../assets/images/Bored_real.png'),
          question: 'How engaged?',
          fullQuestion: 'How engaged does this person look?',
          correctAnswer: 'Bored',
          options: ['Very Interested', 'Bored', 'Excited', 'Happy'],
          hint: 'Notice the lack of interest in their expression'
        },
      ]
    };
    return allTasks[targetEmotion] || allTasks.mixed;
  };
  
  const tasks = getTasksForEmotion(route.params?.emotion);

  const handleAnswerSelect = async (answer) => {
    if (selectedAnswer !== null && !showSecondChance) return;
    
    setSelectedAnswer(answer);
    setAttempts(attempts + 1);
    
    if (answer === tasks[currentTask].correctAnswer) {
      await TTS.speakFeedback('Excellent choice!', true);
      setShowSecondChance(false);
    } else {
      if (attempts === 0) {
        await TTS.speakFeedback('Not quite right. Here\'s a hint!', false);
        setShowHintMessage(true);
        setShowSecondChance(true);
        setTimeout(() => {
          setSelectedAnswer(null);
        }, 2000);
      } else {
        await TTS.speakFeedback('Good try! Let\'s move on', false);
        setShowSecondChance(false);
      }
    }
  };

  const handleNext = () => {
    if (selectedAnswer === tasks[currentTask].correctAnswer) {
      setScore(score + 1);
    }

    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelectedAnswer(null);
      setAttempts(0);
      setShowSecondChance(false);
      setShowHintMessage(false);
      setShowHelpMessage(false);
    } else {
      navigation.navigate('LessonSummary', { 
        score, 
        totalQuestions: tasks.length, 
        lessonTitle: 'Picture Emotions',
        source: route.params?.emotion ? 'activities' : 'lessons'
      });
    }
  };

  const handleHome = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <View style={styles.hintContainer}>
              <Text style={styles.helpText}>{tasks[currentTask].hint}</Text>
              <SpeakerButton 
                text={tasks[currentTask].hint} 
                type="hint" 
                size={16} 
                style={styles.speakerButton}
              />
            </View>
            <TouchableOpacity onPress={() => setShowHintMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {showHelpMessage && (
          <View style={[styles.popupWrapper, { top: 60, right: 20 }]}>
            <View style={styles.hintContainer}>
              <Text style={styles.helpText}>Look at faces</Text>
              <SpeakerButton 
                text="Look at facial expressions to identify emotions" 
                type="instruction" 
                size={16} 
                style={styles.speakerButton}
              />
            </View>
            <TouchableOpacity onPress={() => setShowHelpMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.progress}>{currentTask + 1}/{tasks.length}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{tasks[currentTask].question}</Text>
          <SpeakerButton 
            text={tasks[currentTask].fullQuestion} 
            type="question" 
            size={18} 
            style={styles.speakerButton}
          />
        </View>
        
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
              disabled={selectedAnswer !== null && !showSecondChance}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, (!selectedAnswer || showSecondChance) && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedAnswer || showSecondChance}
        >
          <Text style={styles.nextButtonText}>
            {currentTask === tasks.length - 1 ? 'Finish' : 'Next'}
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
  content: { padding: SIZES.padding, position: 'relative', paddingBottom: 50 },
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
  hintContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  speakerButton: { marginLeft: 8 },

});
