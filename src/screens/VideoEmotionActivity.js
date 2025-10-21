import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

export default function VideoEmotionActivity({ navigation }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [score, setScore] = useState(0);
  
  const tasks = [
    {
      videoPlaceholder: require('../../assets/images/7.png'),
      question: 'What emotion does this person show?',
      correctAnswer: 'Happy',
      options: ['Happy', 'Sad', 'Angry', 'Surprised'],
    },
    {
      videoPlaceholder: require('../../assets/images/8.png'),
      question: 'How is this person feeling?',
      correctAnswer: 'Excited',
      options: ['Bored', 'Excited', 'Tired', 'Sad'],
    },
    {
      videoPlaceholder: require('../../assets/images/9.png'),
      question: 'What emotion do you observe?',
      correctAnswer: 'Calm',
      options: ['Angry', 'Worried', 'Calm', 'Surprised'],
    },
  ];

  const handlePlayVideo = () => {
    setVideoPlayed(true);
  };

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
      setVideoPlayed(false);
    } else {
      navigation.navigate('LessonSummary', { 
        score, 
        totalQuestions: tasks.length, 
        lessonTitle: 'Video Emotions' 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.progress}>Task {currentTask + 1} of {tasks.length}</Text>
        <Text style={styles.title}>Watch and identify the emotion</Text>
        
        <View style={styles.videoContainer}>
          <Image source={tasks[currentTask].videoPlaceholder} style={styles.videoPlaceholder} resizeMode="contain" />
          {!videoPlayed && (
            <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
              <Text style={styles.playIcon}>▶️</Text>
            </TouchableOpacity>
          )}
          {videoPlayed && <Text style={styles.videoStatus}>Video played!</Text>}
        </View>

        {videoPlayed && (
          <>
            <Text style={styles.questionText}>{tasks[currentTask].question}</Text>
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  content: { flex: 1, padding: SIZES.padding, alignItems: 'center', justifyContent: 'center' },
  progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
  title: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 30, textAlign: 'center', ...FONTS.bold },
  videoContainer: { width: 250, height: 200, backgroundColor: COLORS.black, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 30, ...SHADOWS.medium },
  videoPlaceholder: { width: 230, height: 180, borderRadius: 10 },
  playButton: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 30, padding: 15 },
  playIcon: { fontSize: 30 },
  videoStatus: { color: COLORS.white, fontSize: SIZES.base },
  questionText: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 20, textAlign: 'center', ...FONTS.bold },
  optionsContainer: { width: '100%', maxWidth: 300 },
  optionButton: { backgroundColor: COLORS.lightBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, marginBottom: SIZES.margin, alignItems: 'center', ...SHADOWS.small },
  correctOption: { backgroundColor: '#4CAF50' },
  incorrectOption: { backgroundColor: '#F44336' },
  optionText: { fontSize: SIZES.large, color: COLORS.darkBlue, ...FONTS.bold },
  nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  disabledButton: { opacity: 0.5 },
  nextButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold },
});
