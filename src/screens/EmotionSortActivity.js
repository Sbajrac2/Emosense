import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated, PanResponder } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
import { useRewards } from '../contexts/RewardContext';

export default function EmotionSortActivity({ navigation, route }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [draggedCard, setDraggedCard] = useState(null);
  const [binFeedback, setBinFeedback] = useState({});
  const [level, setLevel] = useState(1);
  const { isTTSEnabled } = useTTS();
  const { awardBadge, incrementStreak } = useRewards();

  const level1Bins = [
    { id: 'happy', label: 'Happy', color: COLORS.yellow },
    { id: 'sad', label: 'Sad', color: COLORS.lightBlue },
    { id: 'angry', label: 'Angry', color: '#FFB3B3' },
    { id: 'surprised', label: 'Surprised', color: COLORS.pink }
  ];

  const level2Bins = [
    { id: 'happy', label: 'Happy', color: COLORS.yellow },
    { id: 'sad', label: 'Sad', color: COLORS.lightBlue },
    { id: 'angry', label: 'Angry', color: '#FFB3B3' },
    { id: 'bored', label: 'Bored', color: '#D3D3D3' },
    { id: 'excited', label: 'Excited', color: '#FFD700' },
    { id: 'worried', label: 'Worried', color: '#DDA0DD' }
  ];

  const bins = level === 1 ? level1Bins : level2Bins;

  const level1Cards = [
    { id: 1, image: require('../../assets/images/Happy.png'), emotion: 'happy' },
    { id: 2, image: require('../../assets/images/Sad.png'), emotion: 'sad' },
    { id: 3, image: IMAGES.angry_female_1, emotion: 'angry' },
    { id: 4, image: require('../../assets/images/Surprised.png'), emotion: 'surprised' },
    { id: 5, image: require('../../assets/images/Happy_real.png'), emotion: 'happy' },
    { id: 6, image: require('../../assets/images/TIred_real.png'), emotion: 'sad' }
  ];

  const level2Cards = [
    { id: 1, image: require('../../assets/images/Happy.png'), emotion: 'happy' },
    { id: 2, image: require('../../assets/images/Sad.png'), emotion: 'sad' },
    { id: 3, image: IMAGES.angry_female_1, emotion: 'angry' },
    { id: 4, image: require('../../assets/images/Excited.png'), emotion: 'excited' },
    { id: 5, image: require('../../assets/images/TIred_real.png'), emotion: 'bored' },
    { id: 6, image: require('../../assets/images/Worried_real.png'), emotion: 'worried' },
    { id: 7, image: require('../../assets/images/Happy_real.png'), emotion: 'happy' },
    { id: 8, image: IMAGES.angry_male_1, emotion: 'angry' }
  ];

  const cards = level === 1 ? level1Cards : level2Cards;

  const handleDrop = async (binId) => {
    const currentCardData = cards[currentCard];
    const isCorrect = currentCardData.emotion === binId;
    
    if (isCorrect) {
      setScore(score + 1);
      setBinFeedback({ [binId]: 'correct' });
      if (isTTSEnabled) await TTS.speakFeedback('Great job!', true);
      incrementStreak();
    } else {
      setBinFeedback({ [binId]: 'incorrect' });
      if (isTTSEnabled) await TTS.speakFeedback('Try again', false);
    }

    setTimeout(async () => {
      setBinFeedback({});
      if (currentCard < cards.length - 1) {
        setCurrentCard(currentCard + 1);
      } else {
        if (level === 1) {
          setLevel(2);
          setCurrentCard(0);
          setScore(0);
          if (isTTSEnabled) await TTS.speakFeedback('Great! Now try Level 2!', true);
        } else {
          if (score >= 6) {
            awardBadge('emotion_sorter', 'Emotion Sorter Master', 'Completed both levels!');
          }
          navigation.navigate('LessonSummary', {
            score,
            totalQuestions: cards.length,
            lessonTitle: 'Emotion Sorting - Level 2',
            source: route.params?.source || 'activities'
          });
        }
      }
    }, 1500);
  };

  const getBinStyle = (binId) => {
    const feedback = binFeedback[binId];
    if (feedback === 'correct') {
      return [styles.bin, { backgroundColor: '#4CAF50', transform: [{ scale: 1.1 }] }];
    }
    if (feedback === 'incorrect') {
      return [styles.bin, { backgroundColor: '#F44336', transform: [{ rotate: '5deg' }] }];
    }
    return [styles.bin, { backgroundColor: bins.find(b => b.id === binId)?.color }];
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <View style={styles.content}>
        <Text style={styles.progress}>Level {level} - Card {currentCard + 1} of {cards.length}</Text>
        <Text style={styles.title}>Drag the face to the right feeling</Text>
        {/* {level === 2 && <Text style={styles.subtitle}>More emotions to choose from!</Text>} */}

        <View style={styles.cardContainer}>
          <Image source={cards[currentCard].image} style={styles.card} resizeMode="contain" />
        </View>

        <View style={styles.binsContainer}>
          {bins.map(bin => (
            <TouchableOpacity
              key={bin.id}
              style={getBinStyle(bin.id)}
              onPress={() => handleDrop(bin.id)}
            >
              <Text style={styles.binLabel}>{bin.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  content: { flex: 1, padding: SIZES.padding, alignItems: 'center' },
  progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
  title: { fontSize: SIZES.large, color: COLORS.black, textAlign: 'center', marginBottom: 10, ...FONTS.bold },
  subtitle: { fontSize: SIZES.base, color: COLORS.darkBlue, textAlign: 'center', marginBottom: 20 },
  cardContainer: { marginBottom: 40 },
  card: { width: 150, height: 150, borderRadius: 15, ...SHADOWS.medium },
  binsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' },
  bin: {
    width: 120,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 3,
    borderColor: COLORS.darkBlue,
    ...SHADOWS.small
  },
  binLabel: { fontSize: SIZES.large, color: COLORS.black, ...FONTS.bold }
});