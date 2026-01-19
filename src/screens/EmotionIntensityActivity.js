import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';

export default function EmotionIntensityActivity({ navigation, route }) {
  const [currentSet, setCurrentSet] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const { isTTSEnabled } = useTTS();

  const intensitySets = [
    {
      emotion: 'Happy',

      faces: [
        { id: 1, image: require('../../assets/images/Happy_real.png'), intensity: 1 },
        { id: 2, image: require('../../assets/images/Happy.png'), intensity: 2 },
        { id: 3, image: require('../../assets/images/Excited.png'), intensity: 3 }
      ],
      correctOrder: [1, 2, 3]
    },
    {
      emotion: 'Sad',

      faces: [
        { id: 1, image: require('../../assets/images/Worried_real.png'), intensity: 1 },
        { id: 2, image: require('../../assets/images/Sad.png'), intensity: 2 },
        { id: 3, image: require('../../assets/images/TIred_real.png'), intensity: 3 }
      ],
      correctOrder: [1, 2, 3]
    },
    {
      emotion: 'Angry',

      faces: [
        { id: 1, image: IMAGES.angry_female_2, intensity: 1 },
        { id: 2, image: IMAGES.angry_female_1, intensity: 2 },
        { id: 3, image: IMAGES.angry_male_1, intensity: 3 }
      ],
      correctOrder: [1, 2, 3]
    }
  ];

  const handleFaceSelect = (faceId) => {
    if (userOrder.includes(faceId)) {
      setUserOrder(userOrder.filter(id => id !== faceId));
    } else {
      setUserOrder([...userOrder, faceId]);
    }
  };

  const handleSubmit = async () => {
    const currentSetData = intensitySets[currentSet];
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentSetData.correctOrder);
    
    if (isCorrect) {
      setScore(score + 1);
      if (isTTSEnabled) await TTS.speakFeedback('Perfect ordering!', true);
    } else {
      if (isTTSEnabled) await TTS.speakFeedback('Look at the intensity of each expression', false);
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentSet < intensitySets.length - 1) {
      setCurrentSet(currentSet + 1);
      setUserOrder([]);
      setShowFeedback(false);
    } else {
      navigation.navigate('LessonSummary', {
        score,
        totalQuestions: intensitySets.length,
        lessonTitle: 'Emotion Intensity',
        source: route.params?.source || 'activities'
      });
    }
  };

  const currentSetData = intensitySets[currentSet];
  const getSlotStyle = (index) => {
    const faceId = userOrder[index];
    if (!showFeedback || !faceId) return styles.slot;
    
    const correctId = currentSetData.correctOrder[index];
    return faceId === correctId ? styles.correctSlot : styles.incorrectSlot;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.progress}>Set {currentSet + 1} of {intensitySets.length}</Text>
          <Text style={styles.title}>Order by Intensity</Text>

          <Text style={styles.instruction}>Drag faces from weakest to strongest feeling</Text>

          <View style={styles.slotsContainer}>
            <Text style={styles.slotLabel}>Weakest</Text>
            {[0, 1, 2].map(index => {
              const face = userOrder[index] ? currentSetData.faces.find(f => f.id === userOrder[index]) : null;
              return (
                <View key={index} style={getSlotStyle(index)}>
                  {face && (
                    <>
                      <Image 
                        source={face.image} 
                        style={styles.slotImage} 
                        resizeMode="contain" 
                      />

                    </>
                  )}
                  <Text style={styles.slotNumber}>{index + 1}</Text>
                </View>
              );
            })}
            <Text style={styles.slotLabel}>Strongest</Text>
          </View>

          <View style={styles.facesContainer}>
            {currentSetData.faces.map(face => (
              <TouchableOpacity
                key={face.id}
                style={[
                  styles.faceButton,
                  userOrder.includes(face.id) && styles.selectedFace
                ]}
                onPress={() => handleFaceSelect(face.id)}
                disabled={showFeedback}
              >
                <Image source={face.image} style={styles.faceImage} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>

          {userOrder.length === 3 && !showFeedback && (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Check Order</Text>
            </TouchableOpacity>
          )}

          {showFeedback && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentSet === intensitySets.length - 1 ? 'Finish' : 'Next Set'}
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
  subtitle: { fontSize: SIZES.base, color: COLORS.darkBlue, textAlign: 'center', marginBottom: 10 },
  instruction: { fontSize: SIZES.small, color: COLORS.grey, textAlign: 'center', marginBottom: 20 },
  intensityLabel: { fontSize: SIZES.small, color: COLORS.darkBlue, textAlign: 'center', marginTop: 2 },
  slotsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  slot: { width: 80, height: 80, borderWidth: 2, borderColor: COLORS.darkBlue, borderRadius: 10, margin: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white },
  correctSlot: { width: 80, height: 80, borderWidth: 3, borderColor: '#4CAF50', borderRadius: 10, margin: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F5E8' },
  incorrectSlot: { width: 80, height: 80, borderWidth: 3, borderColor: '#F44336', borderRadius: 10, margin: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEBEE' },
  slotImage: { width: 60, height: 60 },
  slotNumber: { position: 'absolute', bottom: 2, fontSize: SIZES.small, color: COLORS.grey },
  slotLabel: { fontSize: SIZES.base, color: COLORS.black, ...FONTS.bold },
  facesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  faceButton: { margin: 10, borderRadius: 15, ...SHADOWS.small },
  selectedFace: { opacity: 0.5 },
  faceImage: { width: 100, height: 100 },
  submitButton: { backgroundColor: COLORS.darkBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  submitButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold },
  nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
  nextButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold }
});