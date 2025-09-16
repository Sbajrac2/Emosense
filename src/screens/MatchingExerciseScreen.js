import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';


const { width } = Dimensions.get('window');
// export const IMAGES = {
//   hint: require('../assets/hint.png'),
//   help: require('../assets/help.png'),
//   // …other images
// };

export default function MatchingExerciseScreen({ navigation, route }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);

  // Sample questions - you can replace these with your actual data
  const questions = [
    {
      id: 1,
      type: 'emoji',
      image: '😠', // Angry emoji
      correctAnswer: 'Angry',
      options: ['Angry', 'Happy', 'Sad'],
      lessonTitle: 'Feeling Words',
    },
    {
      id: 2,
      type: 'emoji',
      image: '😰', // Worried emoji
      correctAnswer: 'Sad',
      options: ['Angry', 'Happy', 'Sad'],
      lessonTitle: 'Feeling Words',
    },
    {
      id: 3,
      type: 'emoji',
      image: '😄', // Happy emoji
      correctAnswer: 'Happy',
      options: ['Angry', 'Happy', 'Sad'],
      lessonTitle: 'Feeling Words',
    },
    {
      id: 4,
      type: 'emoji',
      image: '😴', // Tired emoji
      correctAnswer: 'Tired',
      options: ['Tired', 'Sad', 'Angry'],
      lessonTitle: 'Feeling Words',
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to summary
      navigation.replace('LessonSummary', { 
        score, 
        totalQuestions: questions.length,
        lessonTitle: currentQuestion.lessonTitle 
      });
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {/* <TouchableOpacity style={styles.topBarButton}>
            <SimpleIcon name="bulb" size={24} color={COLORS.darkBlue} />
          </TouchableOpacity> */}
           <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => console.log('Hint tapped')}
          >
            <Image source={IMAGES.hint} style={styles.topBarIcon} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.topBarButton}>
            <SimpleIcon name="help-circle" size={24} color={COLORS.darkBlue} />
          </TouchableOpacity> */}
            <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => setShowHelpMessage(true)}
          >
            <Image source={IMAGES.help} style={styles.topBarIcon} />
          </TouchableOpacity>
        </View>

        {showHelpMessage && (
          <View style={styles.helpBox}>
            <Text style={styles.helpText}>
              Tap the word that shows how the picture feels.
            </Text>
          </View>
        )}

        {/* Lesson Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.lessonTitle}>{currentQuestion.lessonTitle}</Text>
          <View style={styles.progressDots}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index <= currentQuestionIndex && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Question Image */}
          <View style={styles.imageContainer}>
            <Text style={styles.questionImage}>{currentQuestion.image}</Text>
          </View>

          {/* Instruction */}
          <Text style={styles.instruction}>
            Click on the feeling word that matches the picture.
          </Text>

          {/* Answer Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption,
                  selectedAnswer === option && 
                  option === currentQuestion.correctAnswer && 
                  styles.correctOption,
                  selectedAnswer === option && 
                  option !== currentQuestion.correctAnswer && 
                  styles.incorrectOption,
                ]}
                onPress={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.selectedOptionText,
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabledButton,
            ]}
            onPress={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            <SimpleIcon name="chevron-back" size={24} color={COLORS.darkBlue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              selectedAnswer === null && styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={selectedAnswer === null}
          >
            {isLastQuestion ? (
              <Text style={styles.doneButtonText}>Done</Text>
            ) : (
              <SimpleIcon name="chevron-forward" size={24} color={COLORS.darkBlue} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.margin,
  },
  topBarButton: {
    padding: SIZES.padding / 2,
  },
  topBarIcon: { width: 28, height: 28, resizeMode: 'contain' }, 
  helpBox: {
    backgroundColor: '#ffe6f0',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin * 2,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  helpText: {
    fontSize: SIZES.base,
    color: COLORS.black,
    textAlign: 'center',
    ...FONTS.medium,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  lessonTitle: {
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: SIZES.margin,
    ...FONTS.bold,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: COLORS.darkBlue,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
    ...SHADOWS.medium,
  },
  questionImage: {
    fontSize: 80,
  },
  instruction: {
    fontSize: SIZES.base,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    ...FONTS.medium,
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  optionButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.margin,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  selectedOption: {
    backgroundColor: COLORS.darkBlue,
  },
  correctOption: {
    backgroundColor: '#4CAF50', // Green for correct
  },
  incorrectOption: {
    backgroundColor: '#F44336', // Red for incorrect
  },
  optionText: {
    fontSize: SIZES.large,
    color: COLORS.darkBlue,
    ...FONTS.bold,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.margin * 2,
  },
  navButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    minWidth: 60,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  disabledButton: {
    opacity: 0.5,
  },
  doneButtonText: {
    fontSize: SIZES.base,
    color: COLORS.darkBlue,
    ...FONTS.bold,
  },
});
