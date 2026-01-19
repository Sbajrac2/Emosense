import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, PanResponder, Animated, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import SpeakerButton from '../components/SpeakerButton';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
import { generateVisualCues, getCueStyle } from '../utils/visualCueHelper';

const { width } = Dimensions.get('window');

export default function SwipeEmotionActivity({ navigation, route }) {
  const { emotion } = route.params || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showHintMessage, setShowHintMessage] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const pan = new Animated.ValueXY();
  const { isTTSEnabled } = useTTS();

  const getQuestionsForEmotion = (targetEmotion) => {
    const allQuestions = {
      happy: [
        { image: require('../../assets/images/Happy.png'), emotion: '', correctSide: 'right', hint: 'Look at the smile and bright eyes' },
        { image: require('../../assets/images/Excited.png'), emotion: '', correctSide: 'right', hint: 'Notice the wide smile and raised eyebrows' },
        { image: IMAGES.angry_female_1, emotion: '', correctSide: 'left', hint: 'See the frown and tense face muscles' },
      ],
      angry: [
        { image: IMAGES.angry_female_1, emotion: '', correctSide: 'left', hint: 'Look at the furrowed brows and tight lips' },
        { image: IMAGES.angry_male_1, emotion: '', correctSide: 'left', hint: 'Notice the clenched jaw and narrowed eyes' },
        { image: IMAGES.angry_female_2, emotion: '', correctSide: 'left', hint: 'See the downward mouth and tense forehead' },
        { image: IMAGES.angry_male_2, emotion: '', correctSide: 'left', hint: 'Look at the stern expression and tight face' },
        { image: require('../../assets/images/Happy.png'), emotion: '', correctSide: 'right', hint: 'Notice the relaxed, smiling face' },
      ],
      sad: [
        { image: require('../../assets/images/Sad.png'), emotion: '', correctSide: 'left', hint: 'Look at the droopy eyes and downturned mouth' },
        { image: IMAGES.angry_female_3, emotion: '', correctSide: 'left', hint: 'See the worried expression and tense brows' },
        { image: require('../../assets/images/Happy.png'), emotion: '', correctSide: 'right', hint: 'Notice the bright, cheerful expression' },
      ],
      mixed: [
        { image: require('../../assets/images/Happy.png'), emotion: '', correctSide: 'right', hint: 'Look at the smile and bright eyes' },
        { image: require('../../assets/images/Sad.png'), emotion: '', correctSide: 'left', hint: 'See the droopy eyes and sad mouth' },
        { image: IMAGES.angry_female_1, emotion: '', correctSide: 'left', hint: 'Notice the frown and tense muscles' },
        { image: IMAGES.angry_male_1, emotion: '', correctSide: 'left', hint: 'Look at the stern, angry expression' },
        { image: require('../../assets/images/Excited.png'), emotion: '', correctSide: 'right', hint: 'See the wide smile and excited eyes' },
        { image: require('../../assets/images/Surprised.png'), emotion: '', correctSide: 'right', hint: 'Notice the wide eyes and open mouth - usually positive surprise' },
        { image: require('../../assets/images/Worried_real.png'), emotion: '', correctSide: 'left', hint: 'Look at the concerned, tense expression' },
        { image: require('../../assets/images/TIred_real.png'), emotion: '', correctSide: 'left', hint: 'See the droopy, low-energy expression' },
      ]
    };
    return allQuestions[targetEmotion] || allQuestions.mixed;
  };
  
  const questions = getQuestionsForEmotion(emotion);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: async (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 100) {
        const swipeDirection = gestureState.dx > 0 ? 'right' : 'left';
        const isCorrect = swipeDirection === questions[currentQuestion].correctSide;
        
        if (isCorrect) {
          setScore(score + 1);
          const feedback = ['Well done!', 'That\'s right!', 'Nice work!', 'Correct!', 'Great!'][Math.floor(Math.random() * 5)];
          if (isTTSEnabled) await TTS.speakFeedback(feedback, true);
          
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAttempts(0);
            setShowHintMessage(false);
            pan.setValue({ x: 0, y: 0 });
          } else {
            navigation.navigate('LessonSummary', { 
              score: score + 1, 
              totalQuestions: questions.length, 
              lessonTitle: route.params?.source === 'lessons' ? 'Lesson 2' : 'Swipe Challenge',
              source: route.params?.source || (emotion ? 'activities' : 'lessons')
            });
          }
        } else {
          if (isTTSEnabled) {
            await TTS.speakFeedback('Try again', false);
            await TTS.speakHint(questions[currentQuestion].hint);
          }
          setShowHintMessage(true);
          setAttempts(attempts + 1);
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  const handleHome = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
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
            <Text style={styles.helpText}>{questions[currentQuestion].hint}</Text>
            <TouchableOpacity onPress={() => setShowHintMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {showHelpMessage && (
          <View style={[styles.popupWrapper, { top: 60, right: 20 }]}>
            <Text style={styles.helpText}>Swipe left for negative emotions, right for positive emotions.</Text>
            <TouchableOpacity onPress={() => setShowHelpMessage(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Swipe cards</Text>
          <SpeakerButton 
            text="Swipe the card to match emotion. Right for positive, left for negative" 
            type="instruction" 
            size={16} 
            style={styles.speakerButton}
          />
        </View>
        
        <View style={styles.sidesContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.sideLabel}>Negative</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.sideLabel}>Positive</Text>
          </View>
        </View>

        <Animated.View
          style={[styles.questionCard, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <Image source={questions[currentQuestion].image} style={styles.emotionImage} resizeMode="contain" />
          {questions[currentQuestion].emotion && <Text style={styles.emotionText}>{questions[currentQuestion].emotion}</Text>}
          {showHintMessage && generateVisualCues(questions[currentQuestion].hint).map((cue, index) => (
            <View key={index} style={getCueStyle(cue)} />
          ))}
        </Animated.View>

        <Text style={styles.instruction}>← Negative | Positive →</Text>
        <Text style={styles.progress}>Card {currentQuestion + 1} of {questions.length}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  scrollView: { flex: 1 },
  content: { padding: SIZES.padding, alignItems: 'center', paddingBottom: 50 },
  topBar: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 },
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
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  title: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center' },
  speakerButton: { marginLeft: 8 },
  sidesContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  leftSide: { alignItems: 'center', backgroundColor: COLORS.lightBlue, padding: 15, borderRadius: 15, flex: 0.45 },
  rightSide: { alignItems: 'center', backgroundColor: COLORS.yellow, padding: 15, borderRadius: 15, flex: 0.45 },
  sideLabel: { fontSize: SIZES.base, color: COLORS.black, textAlign: 'center' },
  sideSubtext: { fontSize: SIZES.small, color: COLORS.black, textAlign: 'center', marginTop: 5 },
  questionCard: { width: 220, height: 280, backgroundColor: COLORS.white, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 5, padding: 20 },
  emotionImage: { width: 150, height: 150, marginBottom: 20 },
  emotionText: { fontSize: SIZES.xlarge, color: COLORS.black },
  instruction: { fontSize: SIZES.base, color: COLORS.grey, textAlign: 'center', marginBottom: 10 },
  progress: { fontSize: SIZES.base, color: COLORS.grey },
});
