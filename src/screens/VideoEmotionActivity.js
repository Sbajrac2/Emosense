// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
// import { Video } from 'expo-av';
// import SpeakerButton from '../components/SpeakerButton';
// import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';
// import TTS from '../utils/textToSpeech';

// export default function VideoEmotionActivity({ navigation, route }) {
//   const { emotion } = route.params || {};
//   const [currentTask, setCurrentTask] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [videoPlayed, setVideoPlayed] = useState(false);
//   const [score, setScore] = useState(0);
//   const [attempts, setAttempts] = useState(0);
//   const [showSecondChance, setShowSecondChance] = useState(false);
  
//   const getTasksForEmotion = (targetEmotion) => {
//     const allTasks = {
//       happy: [
//         {
//           video: IMAGES.video_autism,
//           question: 'What emotion?',
//           fullQuestion: 'What happy emotion do you see in this video?',
//           correctAnswer: 'Happy',
//           options: ['Happy', 'Sad', 'Angry', 'Surprised'],
//           hint: 'Look for smiles and bright expressions'
//         },
//         {
//           video: IMAGES.video_autism,
//           question: 'How intense is the happiness?',
//           fullQuestion: 'How intense is the happiness shown?',
//           correctAnswer: 'Very Happy',
//           options: ['Slightly Happy', 'Very Happy', 'Neutral', 'Excited'],
//           hint: 'Notice the strength of facial expressions'
//         },
//         {
//           video: IMAGES.video_autism,
//           question: 'What causes this happiness?',
//           fullQuestion: 'What might be causing this happy feeling?',
//           correctAnswer: 'Social interaction',
//           options: ['Being alone', 'Social interaction', 'Sadness', 'Anger'],
//           hint: 'Think about what makes people happy'
//         },
//       ],
//       sad: [
//         {
//           video: IMAGES.video_sad,
//           question: 'What emotion?',
//           fullQuestion: 'What sad feeling is shown in this video?',
//           correctAnswer: 'Sad',
//           options: ['Happy', 'Sad', 'Angry', 'Tired'],
//           hint: 'Notice the downward expressions and slow movements'
//         },
//         {
//           video: IMAGES.video_sad,
//           question: 'How deep is the sadness?',
//           fullQuestion: 'How deep does the sadness appear to be?',
//           correctAnswer: 'Very sad',
//           options: ['Slightly sad', 'Very sad', 'Not sad', 'Angry'],
//           hint: 'Look at the intensity of the expression'
//         },
//       ],
//       mixed: [
//         {
//           video: IMAGES.video_awkward,
//           question: 'What emotion?',
//           fullQuestion: 'What emotion is displayed in this awkward conversation?',
//           correctAnswer: 'Uncomfortable',
//           options: ['Comfortable', 'Uncomfortable', 'Happy', 'Excited'],
//           hint: 'Watch body language and facial expressions'
//         },
//         {
//           video: IMAGES.video_uninterested,
//           question: 'How do they feel?',
//           fullQuestion: 'How does this person feel while listening?',
//           correctAnswer: 'Bored',
//           options: ['Interested', 'Bored', 'Excited', 'Angry'],
//           hint: 'Look at their attention level and posture'
//         },
//         {
//           video: IMAGES.video_awkward,
//           question: 'What social cue?',
//           fullQuestion: 'What social cue indicates discomfort?',
//           correctAnswer: 'Body language',
//           options: ['Smiling', 'Body language', 'Loud talking', 'Eye contact'],
//           hint: 'Notice how they position themselves'
//         },
//       ]
//     };
//     return allTasks[targetEmotion] || allTasks.mixed;
//   };
  
//   const tasks = getTasksForEmotion(emotion);

//   const handlePlayVideo = () => {
//     setVideoPlayed(true);
//   };

//   const handleAnswerSelect = async (answer) => {
//     if (selectedAnswer !== null && !showSecondChance) return;
    
//     setSelectedAnswer(answer);
//     setAttempts(attempts + 1);
    
//     if (answer === tasks[currentTask].correctAnswer) {
//       await TTS.speakFeedback('Excellent observation!', true);
//       setShowSecondChance(false);
//     } else {
//       if (attempts === 0) {
//         await TTS.speakFeedback('Not quite right. Watch again and here\'s a hint!', false);
//         await TTS.speakHint(tasks[currentTask].hint);
//         setShowSecondChance(true);
//         setTimeout(() => {
//           setSelectedAnswer(null);
//           setVideoPlayed(false);
//         }, 3000);
//       } else {
//         await TTS.speakFeedback('Good try! Let\'s continue', false);
//         setShowSecondChance(false);
//       }
//     }
//   };

//   const handleNext = () => {
//     if (selectedAnswer === tasks[currentTask].correctAnswer) {
//       setScore(score + 1);
//     }

//     if (currentTask < tasks.length - 1) {
//       setCurrentTask(currentTask + 1);
//       setSelectedAnswer(null);
//       setVideoPlayed(false);
//       setAttempts(0);
//       setShowSecondChance(false);
//     } else {
//       navigation.navigate('LessonSummary', { 
//         score, 
//         totalQuestions: tasks.length, 
//         lessonTitle: 'Video Emotions',
//         source: emotion ? 'activities' : 'lessons'
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.content}>
//         <Text style={styles.progress}>Task {currentTask + 1} of {tasks.length}</Text>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Watch the video</Text>
//           <SpeakerButton 
//             text="Watch and identify the emotion in this video" 
//             type="instruction" 
//             size={18} 
//             style={styles.speakerButton}
//           />
//         </View>
        
//         <Video
//           source={tasks[currentTask].video}
//           style={styles.video}
//           useNativeControls
//           resizeMode="contain"
//           shouldPlay={true}
//           isLooping={true}
//           onLoad={() => setVideoPlayed(true)}
//         />

//         {
//           <>
//             <View style={styles.questionContainer}>
//               <Text style={styles.questionText}>{tasks[currentTask].question}</Text>
//               <SpeakerButton 
//                 text={tasks[currentTask].fullQuestion} 
//                 type="question" 
//                 size={16} 
//                 style={styles.speakerButton}
//               />
//             </View>
//             <View style={styles.optionsContainer}>
//               {tasks[currentTask].options.map((option, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.optionButton,
//                     selectedAnswer === option && option === tasks[currentTask].correctAnswer && styles.correctOption,
//                     selectedAnswer === option && option !== tasks[currentTask].correctAnswer && styles.incorrectOption,
//                   ]}
//                   onPress={() => handleAnswerSelect(option)}
//                   disabled={selectedAnswer !== null && !showSecondChance}
//                 >
//                   <Text style={styles.optionText}>{option}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <TouchableOpacity
//               style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
//               onPress={handleNext}
//               disabled={!selectedAnswer || showSecondChance}
//             >
//               <Text style={styles.nextButtonText}>
//                 {currentTask === tasks.length - 1 ? 'Finish' : 'Next'}
//               </Text>
//             </TouchableOpacity>
//           </>
// }
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.lightGreen },
//   scrollView: { flex: 1 },
//   content: { paddingHorizontal: SIZES.padding, paddingVertical: 10, alignItems: 'center' },
//   progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
//   title: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 30, textAlign: 'center', ...FONTS.bold },

//   videoPlaceholder: { width: 230, height: 180, borderRadius: 10 },
//   playButton: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 30, padding: 15 },
//   playIcon: { fontSize: 30 },
//   videoStatus: { color: COLORS.white, fontSize: SIZES.base },
//   questionText: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 20, textAlign: 'center', ...FONTS.bold },
//   optionsContainer: { width: '100%', maxWidth: 300 },
//   optionButton: { backgroundColor: COLORS.lightBlue, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, marginBottom: SIZES.margin, alignItems: 'center', ...SHADOWS.small },
//   correctOption: { backgroundColor: '#4CAF50' },
//   incorrectOption: { backgroundColor: '#F44336' },
//   optionText: { fontSize: SIZES.large, color: COLORS.darkBlue, ...FONTS.bold },
//   nextButton: { backgroundColor: COLORS.orange, borderRadius: SIZES.radius, paddingVertical: SIZES.padding, paddingHorizontal: 40, marginTop: 20, ...SHADOWS.small },
//   disabledButton: { opacity: 0.5 },
//   nextButtonText: { fontSize: SIZES.large, color: COLORS.white, ...FONTS.bold },
//   titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
//   questionContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
//   speakerButton: { marginLeft: 8 },
//   video: { 
//     width: Dimensions.get('window').width < 600 ? Dimensions.get('window').width * 0.9 : Dimensions.get('window').width * 0.7, 
//     height: Dimensions.get('window').width < 600 ? 150 : (Dimensions.get('window').width * 0.7) * (9/16), 
//     alignSelf: 'center', 
//     marginVertical: 10 
//   },

// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import SpeakerButton from '../components/SpeakerButton';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import TTS from '../utils/textToSpeech';

export default function VideoEmotionActivity({ navigation, route }) {
  const { emotion } = route.params || {};
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showSecondChance, setShowSecondChance] = useState(false);
  
  const videoWidth = Dimensions.get('window').width * 0.9;
  const videoHeight = Dimensions.get('window').width < 600 ? 120 : 250;
  
  const getTasksForEmotion = (targetEmotion) => {
    const allTasks = {
      happy: [
        {
          video: IMAGES.video_autism,
          question: 'What emotion?',
          fullQuestion: 'What happy emotion do you see in this video?',
          correctAnswer: 'Happy',
          options: ['Happy', 'Sad', 'Angry', 'Surprised'],
          hint: 'Look for smiles and bright expressions'
        },
        {
          video: IMAGES.video_autism,
          question: 'How intense is the happiness?',
          fullQuestion: 'How intense is the happiness shown?',
          correctAnswer: 'Very Happy',
          options: ['Slightly Happy', 'Very Happy', 'Neutral', 'Excited'],
          hint: 'Notice the strength of facial expressions'
        },
        {
          video: IMAGES.video_autism,
          question: 'What causes this happiness?',
          fullQuestion: 'What might be causing this happy feeling?',
          correctAnswer: 'Social interaction',
          options: ['Being alone', 'Social interaction', 'Sadness', 'Anger'],
          hint: 'Think about what makes people happy'
        },
      ],
      sad: [
        {
          video: IMAGES.video_sad,
          question: 'What emotion?',
          fullQuestion: 'What sad feeling is shown in this video?',
          correctAnswer: 'Sad',
          options: ['Happy', 'Sad', 'Angry', 'Tired'],
          hint: 'Notice the downward expressions and slow movements'
        },
        {
          video: IMAGES.video_sad,
          question: 'How deep is the sadness?',
          fullQuestion: 'How deep does the sadness appear to be?',
          correctAnswer: 'Very sad',
          options: ['Slightly sad', 'Very sad', 'Not sad', 'Angry'],
          hint: 'Look at the intensity of the expression'
        },
      ],
      mixed: [
        {
          video: IMAGES.video_awkward,
          question: 'What emotion?',
          fullQuestion: 'What emotion is displayed in this awkward conversation?',
          correctAnswer: 'Uncomfortable',
          options: ['Comfortable', 'Uncomfortable', 'Happy', 'Excited'],
          hint: 'Watch body language and facial expressions'
        },
        {
          video: IMAGES.video_uninterested,
          question: 'How do they feel?',
          fullQuestion: 'How does this person feel while listening?',
          correctAnswer: 'Bored',
          options: ['Interested', 'Bored', 'Excited', 'Angry'],
          hint: 'Look at their attention level and posture'
        },
        {
          video: IMAGES.video_awkward,
          question: 'What social cue?',
          fullQuestion: 'What social cue indicates discomfort?',
          correctAnswer: 'Body language',
          options: ['Smiling', 'Body language', 'Loud talking', 'Eye contact'],
          hint: 'Notice how they position themselves'
        },
      ]
    };
    return allTasks[targetEmotion] || allTasks.mixed;
  };
  
  const tasks = getTasksForEmotion(emotion);

  const handlePlayVideo = () => {
    setVideoPlayed(true);
  };

  const handleAnswerSelect = async (answer) => {
    if (selectedAnswer !== null && !showSecondChance) return;
    
    setSelectedAnswer(answer);
    setAttempts(attempts + 1);
    
    if (answer === tasks[currentTask].correctAnswer) {
      await TTS.speakFeedback('Excellent observation!', true);
      setShowSecondChance(false);
    } else {
      if (attempts === 0) {
        await TTS.speakFeedback('Not quite right. Watch again and here\'s a hint!', false);
        await TTS.speakHint(tasks[currentTask].hint);
        setShowSecondChance(true);
        setTimeout(() => {
          setSelectedAnswer(null);
          setVideoPlayed(false);
        }, 3000);
      } else {
        await TTS.speakFeedback('Good try! Let\'s continue', false);
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
      setVideoPlayed(false);
      setAttempts(0);
      setShowSecondChance(false);
    } else {
      navigation.navigate('LessonSummary', { 
        score, 
        totalQuestions: tasks.length, 
        lessonTitle: 'Video Emotions',
        source: emotion ? 'activities' : 'lessons'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        <Text style={styles.progress}>Task {currentTask + 1} of {tasks.length}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Watch the video</Text>
          <SpeakerButton 
            text="Watch and identify the emotion in this video" 
            type="instruction" 
            size={18} 
            style={styles.speakerButton}
          />
        </View>
        
        <View style={{
          width: videoWidth,
          height: videoHeight,
          alignSelf: 'center',
          marginVertical: 20,
          backgroundColor: COLORS.black,
          borderRadius: 15,
        }}>
          <Video
            source={tasks[currentTask].video}
            style={{
              width: '100%',
              height: '100%',
            }}
            useNativeControls
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            onLoad={() => setVideoPlayed(true)}
          />
        </View>

        {
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{tasks[currentTask].question}</Text>
              <SpeakerButton 
                text={tasks[currentTask].fullQuestion} 
                type="question" 
                size={16} 
                style={styles.speakerButton}
              />
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
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
              onPress={handleNext}
              disabled={!selectedAnswer || showSecondChance}
            >
              <Text style={styles.nextButtonText}>
                {currentTask === tasks.length - 1 ? 'Finish' : 'Next'}
              </Text>
            </TouchableOpacity>
          </>
}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: SIZES.padding, paddingVertical: 10, alignItems: 'center' },
  progress: { fontSize: SIZES.base, color: COLORS.grey, marginBottom: 10 },
  title: { fontSize: SIZES.large, color: COLORS.black, marginBottom: 30, textAlign: 'center', ...FONTS.bold },

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
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  questionContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  speakerButton: { marginLeft: 8 },
});