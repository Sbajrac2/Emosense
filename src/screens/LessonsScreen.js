// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// const { width } = Dimensions.get('window');

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);
//   const [completedLessons, setCompletedLessons] = useState([1]);

//   const lessons = [
//     { id: 1, title: 'Lesson 1', status: 'completed' },
//     { id: 2, title: 'Lesson 2', status: 'current' },
//     { id: 3, title: 'New Lesson coming soon', status: 'locked' },
//   ];

//   const handleLessonPress = (lesson) => {
//     if (lesson.status === 'locked') return;
    
//     if (lesson.status === 'current') {
//       navigation.navigate('MatchingExercise', { lessonId: lesson.id });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Road Map */}
//         <View style={styles.roadMapContainer}>
//           {/* Road Background Image */}
//           <Image 
//             source={IMAGES.lessonRoad} 
//             style={styles.roadBackground}
//             resizeMode="contain"
//           />
          
//           {/* Road */}
//           <View style={styles.road}>
//             {/* Lesson markers */}
//             {lessons.map((lesson, index) => (
//               <View key={lesson.id} style={styles.lessonMarker}>
//                 {/* Lesson sign */}
//                 <View style={[
//                   styles.lessonSign,
//                   lesson.status === 'completed' && styles.completedSign,
//                   lesson.status === 'current' && styles.currentSign,
//                   lesson.status === 'locked' && styles.lockedSign,
//                 ]}>
//                   <Text style={[
//                     styles.lessonText,
//                     lesson.status === 'locked' && styles.lockedText,
//                   ]}>
//                     {lesson.title}
//                   </Text>
//                 </View>

//                 {/* Lesson icon */}
//                 <View style={[
//                   styles.lessonIcon,
//                   lesson.status === 'completed' && styles.completedIcon,
//                   lesson.status === 'current' && styles.currentIcon,
//                   lesson.status === 'locked' && styles.lockedIcon,
//                 ]}>
//                   {lesson.status === 'completed' && (
//                     <SimpleIcon name="checkmark" size={20} color={COLORS.white} />
//                   )}
//                   {lesson.status === 'current' && (
//                     <SimpleIcon name="play" size={20} color={COLORS.white} />
//                   )}
//                   {lesson.status === 'locked' && (
//                     <SimpleIcon name="lock-closed" size={20} color={COLORS.white} />
//                   )}
//                 </View>
//               </View>
//             ))}

//             {/* User avatar */}
//             <View style={styles.userAvatar}>
//               <Image 
//                 source={IMAGES.userAvatar} 
//                 style={styles.avatarImage}
//                 resizeMode="cover"
//               />
//             </View>
//           </View>
//         </View>

//         {/* Lesson list */}
//         <View style={styles.lessonList}>
//           {lessons.map((lesson) => (
//             <TouchableOpacity
//               key={lesson.id}
//               style={[
//                 styles.lessonItem,
//                 lesson.status === 'locked' && styles.lockedLesson,
//               ]}
//               onPress={() => handleLessonPress(lesson)}
//               disabled={lesson.status === 'locked'}
//             >
//               <View style={styles.lessonItemContent}>
//                 <View style={[
//                   styles.lessonItemIcon,
//                   lesson.status === 'completed' && styles.completedItemIcon,
//                   lesson.status === 'current' && styles.currentItemIcon,
//                   lesson.status === 'locked' && styles.lockedItemIcon,
//                 ]}>
//                   {lesson.status === 'completed' && (
//                     <SimpleIcon name="checkmark-circle" size={24} color={COLORS.darkBlue} />
//                   )}
//                   {lesson.status === 'current' && (
//                     <SimpleIcon name="play-circle" size={24} color={COLORS.orange} />
//                   )}
//                   {lesson.status === 'locked' && (
//                     <SimpleIcon name="lock-closed" size={24} color={COLORS.grey} />
//                   )}
//                 </View>
//                 <Text style={[
//                   styles.lessonItemText,
//                   lesson.status === 'locked' && styles.lockedItemText,
//                 ]}>
//                   {lesson.title}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGreen,
//   },
//   content: {
//     flex: 1,
//     padding: SIZES.padding,
//   },
//   roadMapContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   roadBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   },
//   road: {
//     width: width - SIZES.padding * 2,
//     height: 200,
//     position: 'relative',
//   },
//   lessonMarker: {
//     position: 'absolute',
//     top: 50,
//     alignItems: 'center',
//   },
//   lessonSign: {
//     backgroundColor: COLORS.lightGrey,
//     paddingHorizontal: SIZES.padding,
//     paddingVertical: SIZES.padding / 2,
//     borderRadius: SIZES.radius,
//     marginBottom: 10,
//     ...SHADOWS.small,
//   },
//   completedSign: {
//     backgroundColor: COLORS.yellow,
//   },
//   currentSign: {
//     backgroundColor: COLORS.orange,
//   },
//   lockedSign: {
//     backgroundColor: COLORS.red,
//   },
//   lessonText: {
//     fontSize: SIZES.small,
//     color: COLORS.black,
//     textAlign: 'center',
//     ...FONTS.medium,
//   },
//   lockedText: {
//     color: COLORS.white,
//   },
//   lessonIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: COLORS.darkBlue,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
//   completedIcon: {
//     backgroundColor: COLORS.darkBlue,
//   },
//   currentIcon: {
//     backgroundColor: COLORS.orange,
//   },
//   lockedIcon: {
//     backgroundColor: COLORS.red,
//   },
//   userAvatar: {
//     position: 'absolute',
//     top: 80,
//     left: '25%',
//     alignItems: 'center',
//   },
//   avatarImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 3,
//     borderColor: COLORS.white,
//     ...SHADOWS.medium,
//   },
//   lessonList: {
//     marginTop: SIZES.margin * 2,
//   },
//   lessonItem: {
//     backgroundColor: COLORS.white,
//     borderRadius: SIZES.radius,
//     padding: SIZES.padding,
//     marginBottom: SIZES.margin,
//     ...SHADOWS.small,
//   },
//   lockedLesson: {
//     opacity: 0.6,
//   },
//   lessonItemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   lessonItemIcon: {
//     marginRight: SIZES.margin,
//   },
//   completedItemIcon: {
//     // Already styled
//   },
//   currentItemIcon: {
//     // Already styled
//   },
//   lockedItemIcon: {
//     // Already styled
//   },
//   lessonItemText: {
//     fontSize: SIZES.base,
//     color: COLORS.black,
//     flex: 1,
//     ...FONTS.medium,
//   },
//   lockedItemText: {
//     color: COLORS.grey,
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   ScrollView
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// const { width, height } = Dimensions.get('window');

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);
//   const [completedLessons, setCompletedLessons] = useState([1]);

//   const lessons = [
//     { id: 1, title: 'Lesson 1', status: 'completed' },
//     { id: 2, title: 'Lesson 2', status: 'current' },
//     { id: 3, title: 'New Lesson coming soon', status: 'locked' },
//   ];

//   const handleLessonPress = (lesson) => {
//     if (lesson.status === 'locked') return;
    
//     if (lesson.status === 'current') {
//       navigation.navigate('MatchingExercise', { lessonId: lesson.id });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Road Map Container */}
//         <View style={styles.roadMapContainer}>
//           {/* Road Background Image - Full Screen */}
//           <Image 
//             source={IMAGES.lessonRoad} 
//             style={styles.roadBackground}
//             resizeMode="cover"
//           />
          
//           {/* Lesson 1 Marker - Yellow Triangle (Top Left) */}
//           <TouchableOpacity 
//             style={styles.lesson1Marker}
//             onPress={() => handleLessonPress(lessons[0])}
//           >
//             <View style={styles.lesson1Sign}>
//               <Text style={styles.lesson1Text}>Lesson</Text>
//               <Text style={styles.lesson1Number}>1</Text>
//             </View>
//           </TouchableOpacity>

//           {/* User Avatar - On the Road */}
//           <View style={styles.userAvatar}>
//             <Image 
//               source={IMAGES.userAvatar} 
//               style={styles.avatarImage}
//               resizeMode="cover"
//             />
//           </View>

//           {/* Lesson 2 Marker - Grey Rectangle (Bottom Right) */}
//           <TouchableOpacity 
//             style={styles.lesson2Marker}
//             onPress={() => handleLessonPress(lessons[1])}
//           >
//             <View style={styles.lesson2Sign}>
//               <Text style={styles.lesson2Text}>Lesson</Text>
//               <Text style={styles.lesson2Number}>2</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGreen,
//   },
//   content: {
//     flex: 1,
//   },
//   roadMapContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   roadBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     top: 0,
//     left: 0,
//   },
//   // Lesson 1 - Yellow Triangle (Top Left)
//   lesson1Marker: {
//     position: 'absolute',
//     top: height * 0.15,
//     left: width * 0.1,
//     zIndex: 10,
//   },
//   lesson1Sign: {
//     width: 60,
//     height: 60,
//     backgroundColor: COLORS.yellow,
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.medium,
//   },
//   lesson1Text: {
//     fontSize: 10,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lesson1Number: {
//     fontSize: 12,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
//   // User Avatar - On the Road
//   userAvatar: {
//     position: 'absolute',
//     top: height * 0.4,
//     left: width * 0.35,
//     zIndex: 10,
//   },
//   avatarImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 3,
//     borderColor: COLORS.white,
//     ...SHADOWS.medium,
//   },
//   // Lesson 2 - Grey Rectangle (Bottom Right)
//   lesson2Marker: {
//     position: 'absolute',
//     top: height * 0.65,
//     right: width * 0.15,
//     zIndex: 10,
//   },
//   lesson2Sign: {
//     width: 80,
//     height: 50,
//     backgroundColor: COLORS.lightGrey,
//     borderWidth: 1,
//     borderColor: COLORS.grey,
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
//   lesson2Text: {
//     fontSize: 12,
//     color: COLORS.grey,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   lesson2Number: {
//     fontSize: 14,
//     color: COLORS.grey,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   ScrollView,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// const { width, height } = Dimensions.get('window');

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);

//   const lessons = [
//     { id: 1, title: 'Lesson 1', status: 'completed' },
//     { id: 2, title: 'Lesson 2', status: 'current' },
//     { id: 3, title: 'Lesson 3', status: 'locked' },
//     { id: 4, title: 'Lesson 4', status: 'locked' },
//     { id: 5, title: 'Lesson 5', status: 'locked' },
//   ];

//   const handleLessonPress = (lesson) => {
//     if (lesson.status === 'locked') return;
//     if (lesson.status === 'current' || lesson.status === 'completed') {
//       navigation.navigate('MatchingExercise', { lessonId: lesson.id });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Image 
//           source={IMAGES.lessonRoad} 
//           style={styles.roadBackground} 
//           resizeMode="cover"
//         />

//         {lessons.map((lesson, index) => {
//           const topPosition = 150 + index * 200; // space lessons vertically
//           let signStyle = styles.lockedSign;
//           let icon = <SimpleIcon name="lock-closed" size={20} color={COLORS.white} />;

//           if (lesson.status === 'completed') {
//             signStyle = styles.completedSign;
//             icon = <SimpleIcon name="checkmark" size={20} color={COLORS.white} />;
//           } else if (lesson.status === 'current') {
//             signStyle = styles.currentSign;
//             icon = <SimpleIcon name="play" size={20} color={COLORS.white} />;
//           }

//           return (
//             <TouchableOpacity
//               key={lesson.id}
//               style={[styles.lessonMarker, { top: topPosition }]}
//               onPress={() => handleLessonPress(lesson)}
//             >
//               <View style={[styles.lessonSign, signStyle]}>
//                 <Text style={styles.lessonText}>Lesson</Text>
//                 <Text style={styles.lessonNumber}>{lesson.id}</Text>
//               </View>
//               <View style={[styles.lessonIcon, signStyle]}>
//                 {icon}
//               </View>
//             </TouchableOpacity>
//           );
//         })}

//         {/* User avatar */}
//         <View style={styles.userAvatar}>
//           <Image 
//             source={IMAGES.userAvatar} 
//             style={styles.avatarImage} 
//             resizeMode="cover" 
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.lightGreen,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     position: 'relative',
//     paddingBottom: 100,
//   },
//   roadBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: 2000, // extend to allow scroll
//     top: 0,
//     left: 0,
//   },
//   lessonMarker: {
//     position: 'absolute',
//     left: width * 0.1,
//     zIndex: 10,
//     alignItems: 'center',
//   },
//   lessonSign: {
//     width: 60,
//     height: 60,
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.medium,
//     marginBottom: 10,
//   },
//   completedSign: {
//     backgroundColor: COLORS.yellow,
//   },
//   currentSign: {
//     backgroundColor: COLORS.orange,
//   },
//   lockedSign: {
//     backgroundColor: COLORS.red,
//   },
//   lessonText: {
//     fontSize: 10,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonNumber: {
//     fontSize: 12,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
//   lessonIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
//   userAvatar: {
//     position: 'absolute',
//     top: 250,
//     left: width * 0.35,
//     zIndex: 10,
//   },
//   avatarImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 3,
//     borderColor: COLORS.white,
//     ...SHADOWS.medium,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const { width, height } = Dimensions.get('window');

export default function LessonsScreen({ navigation }) {
  const [currentLesson, setCurrentLesson] = useState(1);

  const lessons = [
    { id: 1, title: 'Lesson 1', status: 'completed' },
    { id: 2, title: 'Lesson 2', status: 'current' },
    { id: 3, title: 'Lesson 3', status: 'locked' },
    { id: 4, title: 'Lesson 4', status: 'locked' },
    { id: 5, title: 'Lesson 5', status: 'locked' },
  ];

  const handleLessonPress = (lesson) => {
    if (lesson.status === 'locked') return;
    if (lesson.status === 'current' || lesson.status === 'completed') {
      navigation.navigate('MatchingExercise', { lessonId: lesson.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Road Background */}
        <Image
          source={IMAGES.lessonRoad}
          style={styles.roadBackground}
          resizeMode="cover"
        />

        {lessons.map((lesson, index) => {
          const topPosition = 150 + index * 200; // vertical spacing
          const isLeft = index % 2 === 0; // alternate left/right
          let signStyle = styles.lockedSign;
          let icon = <SimpleIcon name="lock-closed" size={20} color={COLORS.white} />;

          if (lesson.status === 'completed') {
            signStyle = styles.completedSign;
            icon = <SimpleIcon name="checkmark" size={20} color={COLORS.white} />;
          } else if (lesson.status === 'current') {
            signStyle = styles.currentSign;
            icon = <SimpleIcon name="play" size={20} color={COLORS.white} />;
          }

          return (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonMarker,
                { top: topPosition, [isLeft ? 'left' : 'right']: width * 0.1 },
              ]}
              onPress={() => handleLessonPress(lesson)}
            >
              <View style={[styles.lessonSign, signStyle]}>
                <Text style={styles.lessonText}>Lesson</Text>
                <Text style={styles.lessonNumber}>{lesson.id}</Text>
              </View>
              <View style={[styles.lessonIcon, signStyle]}>
                {icon}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* User Avatar somewhere on the road */}
        <View style={[styles.userAvatar, { top: 250 }]}>
          <Image
            source={IMAGES.userAvatar}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  scrollContent: {
    flexGrow: 1,
    position: 'relative',
    paddingBottom: 100,
  },
  roadBackground: {
    position: 'absolute',
    width: '100%',
    height: 2000, // extend for scrolling
    top: 0,
    left: 0,
  },
  lessonMarker: {
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
  },
  lessonSign: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.black,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    marginBottom: 10,
  },
  completedSign: {
    backgroundColor: COLORS.yellow,
  },
  currentSign: {
    backgroundColor: COLORS.orange,
  },
  lockedSign: {
    backgroundColor: COLORS.red,
  },
  lessonText: {
    fontSize: 10,
    color: COLORS.black,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
  },
  lessonNumber: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  userAvatar: {
    position: 'absolute',
    left: width * 0.35,
    zIndex: 10,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
});
