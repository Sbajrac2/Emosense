import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
import { useRewards } from '../contexts/RewardContext';

export default function EmotionStoryActivity({ navigation, route }) {
  const [currentStory, setCurrentStory] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isTTSEnabled } = useTTS();
  const { awardBadge } = useRewards();

  const stories = [
    {
      panels: [
        { image: require('../../assets/images/Happy.png'), text: "Sam gets a present" },
        { image: require('../../assets/images/Excited.png'), text: "Sam opens it" },
        { text: "How does Sam feel?" }
      ],
      options: [
        { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correct: true },
        { image: require('../../assets/images/Sad.png'), emotion: 'Sad', correct: false },
        { image: IMAGES.angry_female_1, emotion: 'Angry', correct: false }
      ],
      hint: "Think about how you feel when you get a nice surprise"
    },
    {
      panels: [
        { image: require('../../assets/images/Happy.png'), text: "Maya is playing" },
        { image: require('../../assets/images/Sad.png'), text: "Her toy breaks" },
        { text: "How does Maya feel?" }
      ],
      options: [
        { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correct: false },
        { image: require('../../assets/images/Sad.png'), emotion: 'Sad', correct: true },
        { image: require('../../assets/images/Surprised.png'), emotion: 'Surprised', correct: false }
      ],
      hint: "Look at what happened to her toy"
    },
    {
      panels: [
        { image: require('../../assets/images/Happy.png'), text: "Alex sees a spider" },
        { image: require('../../assets/images/Surprised.png'), text: "It jumps at him" },
        { text: "How does Alex feel?" }
      ],
      options: [
        { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correct: false },
        { image: require('../../assets/images/Surprised.png'), emotion: 'Surprised', correct: true },
        { image: require('../../assets/images/Sad.png'), emotion: 'Sad', correct: false }
      ],
      hint: "Think about sudden, unexpected things"
    },
    {
      panels: [
        { image: require('../../assets/images/Happy.png'), text: "Lily is waiting" },
        { image: require('../../assets/images/Worried_real.png'), text: "Her friend is very late" },
        { text: "How does Lily feel?" }
      ],
      options: [
        { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correct: false },
        { image: require('../../assets/images/Worried_real.png'), emotion: 'Worried', correct: true },
        { image: IMAGES.angry_female_1, emotion: 'Angry', correct: false }
      ],
      hint: "Think about waiting and not knowing what happened"
    },
    {
      panels: [
        { image: require('../../assets/images/Happy.png'), text: "Ben is told 'no'" },
        { image: IMAGES.angry_male_1, text: "He can't have ice cream" },
        { text: "How does Ben feel?" }
      ],
      options: [
        { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correct: false },
        { image: IMAGES.angry_male_1, emotion: 'Angry', correct: true },
        { image: require('../../assets/images/Surprised.png'), emotion: 'Surprised', correct: false }
      ],
      hint: "Think about not getting what you want"
    }
  ];

  const handleAnswerSelect = async (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    if (option.correct) {
      setScore(score + 1);
      if (isTTSEnabled) await TTS.speakFeedback('Perfect! You understand the story!', true);
    } else {
      if (isTTSEnabled) await TTS.speakFeedback(stories[currentStory].hint, false);
    }
  };

  const handleNext = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      if (score >= stories.length - 1) {
        awardBadge('story_teller', 'Story Expert', 'Understood emotion stories!');
      }
      navigation.navigate('LessonSummary', {
        score,
        totalQuestions: stories.length,
        lessonTitle: 'Emotion Stories',
        source: route.params?.source || 'activities'
      });
    }
  };

  const currentStoryData = stories[currentStory];

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.progress}>Story {currentStory + 1} of {stories.length}</Text>
          <Text style={styles.title}>Pick the ending that matches how they would feel</Text>

          <View style={styles.storyContainer}>
            {currentStoryData.panels.map((panel, index) => (
              <View key={index} style={styles.panel}>
                {panel.image && <Image source={panel.image} style={styles.panelImage} resizeMode="contain" />}
                <Text style={styles.panelText}>{panel.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.optionsContainer}>
            {currentStoryData.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  showFeedback && option.correct && styles.correctOption,
                  showFeedback && selectedAnswer === option && !option.correct && styles.incorrectOption
                ]}
                onPress={() => handleAnswerSelect(option)}
                disabled={showFeedback}
              >
                <Image source={option.image} style={styles.optionImage} resizeMode="contain" />
                <Text style={styles.optionText}>{option.emotion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {showFeedback && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentStory === stories.length - 1 ? 'Finish' : 'Next Story'}
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
  title: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center', marginBottom: 20, ...FONTS.bold },
  storyContainer: { flexDirection: 'row', marginBottom: 30, flexWrap: 'wrap', justifyContent: 'center' },
  panel: { width: 140, margin: 8, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 15, padding: 15, ...SHADOWS.small },
  panelImage: { width: 90, height: 90, marginBottom: 8 },
  panelText: { fontSize: SIZES.base, textAlign: 'center', color: COLORS.black, ...FONTS.medium },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  optionButton: { width: 130, margin: 12, alignItems: 'center', backgroundColor: COLORS.lightBlue, borderRadius: 20, padding: 20, ...SHADOWS.small },
  correctOption: { backgroundColor: '#4CAF50', borderWidth: 3, borderColor: '#2E7D32' },
  incorrectOption: { backgroundColor: '#F44336', borderWidth: 3, borderColor: '#C62828' },
  optionImage: { width: 80, height: 80, marginBottom: 8 },
  optionText: { fontSize: SIZES.large, color: COLORS.black, ...FONTS.bold },
  nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  nextButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold }
});