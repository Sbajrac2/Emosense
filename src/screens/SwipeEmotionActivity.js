import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, PanResponder, Animated, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

export default function SwipeEmotionActivity({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showHintMessage, setShowHintMessage] = useState(false);
  const pan = new Animated.ValueXY();

  const questions = [
    { image: require('../../assets/images/Happy.png'), emotion: 'Happy', correctSide: 'right', hint: 'Happy emotions are positive - swipe right!' },
    { image: require('../../assets/images/Sad.png'), emotion: 'Sad', correctSide: 'left', hint: 'Sad is a negative emotion - swipe left!' },
    { image: require('../../assets/images/Excited.png'), emotion: 'Excited', correctSide: 'right', hint: 'Excitement is positive - swipe right!' },
  ];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 100) {
        const swipeDirection = gestureState.dx > 0 ? 'right' : 'left';
        const isCorrect = swipeDirection === questions[currentQuestion].correctSide;
        
        if (isCorrect) setScore(score + 1);
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          pan.setValue({ x: 0, y: 0 });
        } else {
          navigation.navigate('LessonSummary', { score, totalQuestions: questions.length, lessonTitle: 'Swipe Challenge' });
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

        <Text style={styles.title}>Swipe the card to match emotion</Text>
        
        <View style={styles.sidesContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.sideLabel}>Negative</Text>
            <Text style={styles.sideSubtext}>Sad, Angry, Scared</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.sideLabel}>Positive</Text>
            <Text style={styles.sideSubtext}>Happy, Excited, Surprised</Text>
          </View>
        </View>

        <Animated.View
          style={[styles.questionCard, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <Image source={questions[currentQuestion].image} style={styles.emotionImage} resizeMode="contain" />
          <Text style={styles.emotionText}>{questions[currentQuestion].emotion}</Text>
        </Animated.View>

        <Text style={styles.instruction}>Swipe left for negative emotions, right for positive</Text>
        <Text style={styles.progress}>Card {currentQuestion + 1} of {questions.length}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  content: { flex: 1, padding: SIZES.padding, alignItems: 'center', justifyContent: 'center' },
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
  title: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 40, textAlign: 'center' },
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
