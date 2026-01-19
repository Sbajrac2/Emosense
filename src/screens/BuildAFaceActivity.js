import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import TTSToggle from '../components/TTSToggle';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';
import { useRewards } from '../contexts/RewardContext';

export default function BuildAFaceActivity({ navigation, route }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedParts, setSelectedParts] = useState({ 
    eyebrows: null, 
    eyes: null, 
    mouth: null
  });
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { isTTSEnabled } = useTTS();
  const { awardBadge } = useRewards();
  const faceScale = useRef(new Animated.Value(1)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;

  const tasks = [
    {
      targetEmotion: 'Happy',
      correctParts: { 
        eyebrows: 'raised', 
        eyes: 'bright', 
        mouth: 'smile'
      },
      instruction: 'Build a happy face',
      hint: 'Happy faces have raised eyebrows, bright eyes, and big smiles',
      color: COLORS.yellow
    },
    {
      targetEmotion: 'Angry',
      correctParts: { 
        eyebrows: 'angry', 
        eyes: 'narrow', 
        mouth: 'frown'
      },
      instruction: 'Build an angry face',
      hint: 'Angry faces have furrowed eyebrows, narrow eyes, and frowning mouths',
      color: '#FFB3B3'
    },
    {
      targetEmotion: 'Sad',
      correctParts: { 
        eyebrows: 'sad', 
        eyes: 'teary', 
        mouth: 'frown'
      },
      instruction: 'Build a sad face',
      hint: 'Sad faces have droopy eyebrows, teary eyes, and downturned mouths',
      color: COLORS.lightBlue
    },
    {
      targetEmotion: 'Surprised',
      correctParts: { 
        eyebrows: 'raised', 
        eyes: 'wide', 
        mouth: 'open'
      },
      instruction: 'Build a surprised face',
      hint: 'Surprised faces have raised eyebrows, wide eyes, and open mouths',
      color: COLORS.pink
    }
  ];

  const faceParts = {
    eyebrows: [
      { id: 'raised', icon: '⌒    ⌒' },
      { id: 'angry', icon: '╰    ╯' },
      { id: 'sad', icon: '‿    ‿' },
      { id: 'neutral', icon: '—    —' },
      { id: 'frown', icon: '⌐    ⌐' }
    ],
    eyes: [
      { id: 'bright', icon: '◉    ◉' },
      { id: 'narrow', icon: '⌐    ⌐' },
      { id: 'teary', icon: '◔    ◔' },
      { id: 'wide', icon: '○    ○' },
      { id: 'sparkle', icon: '✦    ✦' }
    ],
    mouth: [
      { id: 'smile', icon: '‿' },
      { id: 'dash', icon: '—' },
      { id: 'frown', icon: '⌒' },
      { id: 'open', icon: 'o' }
    ]
  };

  const handlePartSelect = (partType, partId) => {
    setSelectedParts(prev => ({ ...prev, [partType]: partId }));
    
    // Animate face when part is selected
    Animated.sequence([
      Animated.timing(faceScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(faceScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleSubmit = async () => {
    const currentTaskData = tasks[currentTask];
    const correctParts = Object.keys(currentTaskData.correctParts);
    const correctCount = correctParts.filter(
      part => selectedParts[part] === currentTaskData.correctParts[part]
    ).length;
    const isCorrect = correctCount === correctParts.length;
    const isPartiallyCorrect = correctCount >= correctParts.length * 0.6;

    if (isCorrect) {
      setScore(score + 1);
      if (isTTSEnabled) await TTS.speakFeedback('Perfect!', true);
    } else if (isPartiallyCorrect) {
      if (isTTSEnabled) await TTS.speakFeedback('Good try! You got most parts right!', false);
    } else {
      if (isTTSEnabled) await TTS.speakFeedback('Look at how each part shows the emotion. Try the hint!', false);
    }

    setShowResult(true);
    
    // Animate result appearance
    Animated.timing(resultOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelectedParts({ eyebrows: null, eyes: null, mouth: null });
      setShowResult(false);
      setShowHint(false);
      resultOpacity.setValue(0);
    } else {
      if (score >= Math.floor(tasks.length * 0.6)) {
        awardBadge('face_builder', 'Face Builder Master', 'Built emotion faces correctly!');
      }
      navigation.navigate('LessonSummary', {
        score,
        totalQuestions: tasks.length,
        lessonTitle: 'Build-A-Face Master',
        source: route.params?.source || 'activities'
      });
    }
  };

  const handleHint = async () => {
    setShowHint(!showHint);
    if (isTTSEnabled && !showHint) {
      await TTS.speakHint(tasks[currentTask].hint);
    }
  };

  const getFacePartDisplay = (partType) => {
    const selectedPartId = selectedParts[partType];
    if (!selectedPartId) {
      return { icon: '?', color: COLORS.grey };
    }
    const part = faceParts[partType].find(p => p.id === selectedPartId);
    return part ? { icon: part.icon, color: part.color } : { icon: '?', color: COLORS.grey };
  };

  const getPartAccuracy = (partType) => {
    const currentTaskData = tasks[currentTask];
    if (!showResult) return null;
    return selectedParts[partType] === currentTaskData.correctParts[partType] ? 'correct' : 'incorrect';
  };

  const currentTaskData = tasks[currentTask];
  const allPartsSelected = Object.values(selectedParts).every(part => part !== null);
  const requiredParts = Object.keys(currentTaskData.correctParts);
  const requiredPartsSelected = requiredParts.every(part => selectedParts[part] !== null);

  return (
    <SafeAreaView style={styles.container}>
      <TTSToggle />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.progress}>Face {currentTask + 1} of {tasks.length}</Text>
          <Text style={styles.title}>{currentTaskData.instruction}</Text>

          <View style={styles.faceContainer}>
            <Animated.View style={[styles.face, { 
              backgroundColor: currentTaskData.color,
              transform: [{ scale: faceScale }]
            }]}>
              {/* Eyebrows */}
              <View style={styles.eyebrowsContainer}>
                <Text style={[styles.eyebrows, { 
                  backgroundColor: getPartAccuracy('eyebrows') === 'correct' ? '#4CAF5080' : 
                                 getPartAccuracy('eyebrows') === 'incorrect' ? '#F4433680' : 'transparent'
                }]}>
                  {getFacePartDisplay('eyebrows').icon}
                </Text>
              </View>
              
              {/* Eyes */}
              <View style={styles.eyesContainer}>
                <Text style={[styles.eyes, { 
                  backgroundColor: getPartAccuracy('eyes') === 'correct' ? '#4CAF5080' : 
                                 getPartAccuracy('eyes') === 'incorrect' ? '#F4433680' : 'transparent'
                }]}>
                  {getFacePartDisplay('eyes').icon}
                </Text>
              </View>
              

              
              {/* Mouth */}
              <View style={styles.mouthContainer}>
                <Text style={[styles.mouth, { 
                  backgroundColor: getPartAccuracy('mouth') === 'correct' ? '#4CAF5080' : 
                                 getPartAccuracy('mouth') === 'incorrect' ? '#F4433680' : 'transparent'
                }]}>
                  {getFacePartDisplay('mouth').icon}
                </Text>
              </View>
            </Animated.View>
            
            {/* Hint Button */}
            <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
              <Text style={styles.hintIcon}>💡</Text>
            </TouchableOpacity>
          </View>
          
          {/* Show overall result */}
          {showResult && (
            <View style={styles.overallResult}>
              <Text style={[styles.resultText, {
                color: score > 0 ? '#4CAF50' : '#F44336'
              }]}>
                {score > 0 ? 'Correct!' : 'Try again!'}
              </Text>
            </View>
          )}
          
          {showHint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>{currentTaskData.hint}</Text>
            </View>
          )}

          {showResult && (
            <Animated.View style={[styles.resultContainer, { opacity: resultOpacity }]}>
              <Text style={styles.resultTitle}>Perfect {currentTaskData.targetEmotion} Face:</Text>
              <View style={[styles.correctFace, { backgroundColor: currentTaskData.color }]}>
                {/* Correct Eyebrows */}
                <View style={styles.correctEyebrowsContainer}>
                  <Text style={styles.correctEyebrows}>
                    {faceParts.eyebrows.find(p => p.id === currentTaskData.correctParts.eyebrows)?.icon}
                  </Text>
                </View>
                
                {/* Correct Eyes */}
                <View style={styles.correctEyesContainer}>
                  <Text style={styles.correctEyes}>
                    {faceParts.eyes.find(p => p.id === currentTaskData.correctParts.eyes)?.icon}
                  </Text>
                </View>
                

                
                {/* Correct Mouth */}
                <View style={styles.correctMouthContainer}>
                  <Text style={styles.correctMouth}>
                    {faceParts.mouth.find(p => p.id === currentTaskData.correctParts.mouth)?.icon}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          {!showResult && (
            <ScrollView style={styles.partsScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.partsContainer}>
                {Object.entries(faceParts).map(([partType, parts]) => {
                  // Only show required parts for current task
                  if (!requiredParts.includes(partType)) return null;
                  
                  return (
                    <View key={partType} style={styles.partSection}>
                      <Text style={styles.partTitle}>
                        {partType.charAt(0).toUpperCase() + partType.slice(1)} 
                        {requiredParts.includes(partType) && <Text style={styles.required}>*</Text>}
                      </Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partOptionsScroll}>
                        <View style={styles.partOptions}>
                          {parts.map(part => (
                            <TouchableOpacity
                              key={part.id}
                              style={[
                                styles.partButton,
                                selectedParts[partType] === part.id && styles.selectedPart
                              ]}
                              onPress={() => handlePartSelect(partType, part.id)}
                            >
                              <Text style={styles.partLabel}>{part.icon}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}

          {requiredPartsSelected && !showResult && (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Check Face</Text>
            </TouchableOpacity>
          )}

          {showResult && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentTask === tasks.length - 1 ? 'Finish' : 'Next Face'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.lightGreen 
  },
  scrollView: { 
    flex: 1 
  },
  content: { 
    padding: SIZES.padding, 
    alignItems: 'center',
    paddingBottom: 100
  },
  progress: { 
    fontSize: SIZES.base, 
    color: COLORS.grey, 
    marginBottom: 10,
    fontWeight: '600'
  },
  title: { 
    fontSize: SIZES.xlarge, 
    color: COLORS.black, 
    textAlign: 'center', 
    marginBottom: 20, 
    ...FONTS.bold 
  },
  faceContainer: { 
    marginBottom: 30,
    alignItems: 'center',
    position: 'relative'
  },
  face: { 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    ...SHADOWS.medium,
    borderWidth: 3,
    borderColor: COLORS.darkBlue,
    position: 'relative'
  },
  eyebrowsContainer: {
    position: 'absolute',
    top: 35,
    alignSelf: 'center'
  },
  eyesContainer: {
    position: 'absolute',
    top: 75,
    alignSelf: 'center'
  },


  mouthContainer: {
    position: 'absolute',
    top: 130,
    alignSelf: 'center'
  },
  overallResult: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    ...SHADOWS.small
  },
  resultText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  eyebrows: { 
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  eyes: { 
    fontSize: 36, 
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },

  mouth: { 
    fontSize: 34, 
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },

  hintButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.yellow,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small
  },
  hintIcon: {
    fontSize: 20
  },
  hintContainer: {
    backgroundColor: '#FFF8DC',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    maxWidth: '90%'
  },
  hintText: {
    fontSize: SIZES.base,
    color: COLORS.black,
    textAlign: 'center',
    ...FONTS.medium
  },
  resultContainer: { 
    alignItems: 'center', 
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium
  },
  resultTitle: { 
    fontSize: SIZES.large, 
    color: COLORS.black, 
    marginBottom: 15, 
    ...FONTS.bold 
  },
  correctFace: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    ...SHADOWS.small,
    borderWidth: 2,
    borderColor: COLORS.darkBlue,
    position: 'relative'
  },
  correctEyebrowsContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center'
  },
  correctEyesContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center'
  },

  correctMouthContainer: {
    position: 'absolute',
    top: 75,
    alignSelf: 'center'
  },
  correctEyebrows: { 
    fontSize: 24, 
    fontWeight: 'bold'
  },
  correctEyes: { 
    fontSize: 28, 
    fontWeight: 'bold'
  },

  correctMouth: { 
    fontSize: 26, 
    fontWeight: 'bold'
  },

  partsScrollView: {
    maxHeight: 400,
    width: '100%'
  },
  partsContainer: { 
    width: '100%',
    paddingHorizontal: 10
  },
  partSection: { 
    marginBottom: 25,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    ...SHADOWS.small
  },
  partTitle: { 
    fontSize: SIZES.large, 
    color: COLORS.black, 
    marginBottom: 15, 
    ...FONTS.bold,
    textAlign: 'center'
  },
  required: {
    color: COLORS.red,
    fontSize: SIZES.base
  },
  partOptionsScroll: {
    flexGrow: 0
  },
  partOptions: { 
    flexDirection: 'row', 
    paddingHorizontal: 5
  },
  partButton: { 
    backgroundColor: COLORS.lightBlue, 
    borderRadius: 15, 
    padding: 12, 
    alignItems: 'center', 
    minWidth: 90,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small 
  },
  selectedPart: { 
    backgroundColor: COLORS.yellow, 
    borderWidth: 3, 
    borderColor: COLORS.darkBlue,
    transform: [{ scale: 1.05 }]
  },
  partLabel: { 
    fontSize: 24, 
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  submitButton: { 
    backgroundColor: COLORS.darkBlue, 
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    marginTop: 20,
    ...SHADOWS.medium 
  },
  submitButtonText: { 
    fontSize: SIZES.large, 
    color: COLORS.white, 
    ...FONTS.bold 
  },
  nextButton: { 
    backgroundColor: COLORS.orange, 
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    marginTop: 20,
    ...SHADOWS.medium 
  },
  nextButtonText: { 
    fontSize: SIZES.large, 
    color: COLORS.white, 
    ...FONTS.bold 
  }
});