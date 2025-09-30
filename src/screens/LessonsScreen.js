// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);

//   const lessons = [
//     { id: 1, title: 'Lesson 1' },
//     { id: 2, title: 'Lesson 2' },
//     { id: 3, title: 'Lesson 3' },
//     { id: 4, title: 'Lesson 4' },
//     { id: 5, title: 'More lessons coming soon', comingSoon: true },
//   ];

//   const handleLessonPress = (lesson) => {
//     if (lesson.comingSoon) return;
//     if (lesson.id > currentLesson) return;

//     navigation.navigate('MatchingExercise', { lessonId: lesson.id });

//     if (lesson.id === currentLesson && currentLesson < lessons.length - 1) {
//       setCurrentLesson(currentLesson + 1);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Image source={IMAGES.lessonRoad} style={styles.roadBackground} resizeMode="cover" />

//         {lessons.map((lesson, index) => {
//           const topPosition = 100 + index * 150;
//           const isLeft = index % 2 === 0;
//           const sideOffset = 40;

//           let signColor = COLORS.grey;
//           let icon = <SimpleIcon name="lock-closed" size={20} color={COLORS.white} />;
//           let opacity = 0.4;

//           if (lesson.comingSoon) {
//             signColor = COLORS.lightBlue;
//             icon = null;
//             opacity = 0.6;
//           } else if (lesson.id < currentLesson) {
//             signColor = COLORS.yellow;
//             icon = <SimpleIcon name="checkmark" size={20} color={COLORS.white} />;
//             opacity = 1;
//           } else if (lesson.id === currentLesson) {
//             signColor = COLORS.orange;
//             icon = <SimpleIcon name="play" size={20} color={COLORS.white} />;
//             opacity = 1;
//           }

//           return (
//             <TouchableOpacity
//               key={lesson.id}
//               onPress={() => handleLessonPress(lesson)}
//               style={[
//                 styles.lessonMarker,
//                 {
//                   top: topPosition,
//                   left: isLeft ? sideOffset : undefined,
//                   right: isLeft ? undefined : sideOffset,
//                   opacity,
//                 },
//               ]}
//             >
//               <View style={[styles.lessonSign, { backgroundColor: signColor }]}>
//                 <Text style={styles.lessonText}>
//                   {lesson.comingSoon ? 'Coming Soon' : 'Lesson'}
//                 </Text>
//                 {!lesson.comingSoon && <Text style={styles.lessonNumber}>{lesson.id}</Text>}
//               </View>
//               {icon && <View style={[styles.lessonIcon, { backgroundColor: signColor }]}>{icon}</View>}
//             </TouchableOpacity>
//           );
//         })}

//         <View style={styles.userAvatar}>
//           <Image source={IMAGES.userAvatar} style={styles.avatarImage} resizeMode="cover" />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.lightGreen },
//   scrollContent: { flexGrow: 1, position: 'relative', paddingBottom: 200 },
//   roadBackground: { position: 'absolute', width: '100%', height: 1000, top: 0, left: 0 },
//   lessonMarker: { position: 'absolute', alignItems: 'center', zIndex: 10 },
//   lessonSign: {
//     width: 70,
//     height: 70,
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//     ...SHADOWS.medium,
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
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//   },
//   lessonIcon: {
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
//   userAvatar: { position: 'absolute', top: 120, left: 150, zIndex: 20 },
//   avatarImage: { width: 50, height: 50, borderRadius: 25, borderWidth: 3, borderColor: COLORS.white },
// });

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Image,
//   Animated,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const ROAD_WIDTH = 180;
// const LESSON_SIZE = 80;
// const LESSON_SPACING = 200;
// const HORIZ_OFFSET = 50;

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);

//   const lessons = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10, comingSoon: true },
//   ];

//   // add padding so lesson 1 isn’t cropped at top
//   const scrollHeight = lessons.length * LESSON_SPACING + LESSON_SPACING;

//   const avatarY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const toValue = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
//     Animated.timing(avatarY, {
//       toValue,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, [currentLesson]);

//   const handleLessonPress = (lesson) => {
//     if (lesson.comingSoon || lesson.id > currentLesson) return;

//     navigation.navigate('MatchingExercise', { lessonId: lesson.id });

//     if (lesson.id === currentLesson && currentLesson < lessons.length) {
//       setCurrentLesson(currentLesson + 1);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{ height: scrollHeight }}>
        
//         {/* Continuous tiled road */}
//         <Image
//           source={IMAGES.lessonRoad}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: (SCREEN_WIDTH - ROAD_WIDTH) / 2,
//             width: ROAD_WIDTH,
//             height: scrollHeight,
//             zIndex: 0,
//           }}
//           resizeMode="repeat"
//         />

//         {/* Lessons */}
//         {lessons.map((lesson, i) => {
//           const top = i * LESSON_SPACING + LESSON_SPACING / 2; // padding
//           const side = i % 2 === 0 ? 'left' : 'right';

//           let signColor = COLORS.grey;
//           let icon = <SimpleIcon name="lock-closed" size={24} color={COLORS.white} />;
//           let opacity = 0.4;

//           if (lesson.comingSoon) {
//             signColor = COLORS.lightBlue;
//             icon = null;
//             opacity = 0.6;
//           } else if (lesson.id < currentLesson) {
//             signColor = COLORS.yellow;
//             icon = <SimpleIcon name="checkmark" size={24} color={COLORS.white} />;
//             opacity = 1;
//           } else if (lesson.id === currentLesson) {
//             signColor = COLORS.orange;
//             icon = <SimpleIcon name="play" size={24} color={COLORS.white} />;
//             opacity = 1;
//           }

//           const left = side === 'left'
//             ? (SCREEN_WIDTH - ROAD_WIDTH) / 2 - LESSON_SIZE - HORIZ_OFFSET
//             : (SCREEN_WIDTH + ROAD_WIDTH) / 2 + HORIZ_OFFSET;

//           return (
//             <TouchableOpacity
//               key={lesson.id}
//               onPress={() => handleLessonPress(lesson)}
//               style={{
//                 position: 'absolute',
//                 top,
//                 left,
//                 width: LESSON_SIZE,
//                 height: LESSON_SIZE,
//                 opacity,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 zIndex: 10,
//               }}
//             >
//               <View style={[styles.lessonSign, { backgroundColor: signColor }]}>
//                 <Text style={styles.lessonText}>
//                   {lesson.comingSoon ? 'Coming Soon' : 'Lesson'}
//                 </Text>
//                 {!lesson.comingSoon && (
//                   <Text style={styles.lessonNumber}>{lesson.id}</Text>
//                 )}
//               </View>
//               {icon && (
//                 <View style={[styles.lessonIcon, { backgroundColor: signColor }]}>
//                   {icon}
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}

//         {/* Animated Avatar */}
//         <Animated.View
//           style={{
//             position: 'absolute',
//             transform: [{ translateY: avatarY }],
//             left: (SCREEN_WIDTH - ROAD_WIDTH) / 2 + ROAD_WIDTH / 2 - 25,
//             width: 50,
//             height: 50,
//             zIndex: 20,
//           }}
//         >
//           <Image
//             source={IMAGES.userAvatar}
//             style={{
//               width: 50,
//               height: 50,
//               borderRadius: 25,
//               borderWidth: 3,
//               borderColor: COLORS.white,
//             }}
//             resizeMode="cover"
//           />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.lightGreen },
//   lessonSign: {
//     width: '100%',
//     height: '100%',
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.medium,
//   },
//   lessonText: {
//     fontSize: 10,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonNumber: {
//     fontSize: 14,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonIcon: {
//     position: 'absolute',
//     bottom: -25,
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
// });
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Image,
//   Animated,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // Road wide enough to look natural
// const ROAD_WIDTH = SCREEN_WIDTH * 0.85;
// const LESSON_SIZE = 120;
// const LESSON_SPACING = 230;
// // negative margin to overlap onto road
// const ROAD_MARGIN = -20; 

// export default function LessonsScreen({ navigation }) {
//   const [currentLesson, setCurrentLesson] = useState(1);

//   const lessons = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10, comingSoon: true },
//   ];

//   const scrollHeight = lessons.length * LESSON_SPACING + LESSON_SPACING;

//   const avatarY = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const toValue = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
//     Animated.timing(avatarY, {
//       toValue,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }, [currentLesson]);

//   const handleLessonPress = (lesson) => {
//     if (lesson.comingSoon || lesson.id > currentLesson) return;

//     navigation.navigate('MatchingExercise', { lessonId: lesson.id });

//     if (lesson.id === currentLesson && currentLesson < lessons.length) {
//       setCurrentLesson(currentLesson + 1);
//     }
//   };

//   // Road edges
//   const roadLeft = (SCREEN_WIDTH - ROAD_WIDTH) / 2;
//   const roadRight = roadLeft + ROAD_WIDTH;

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{ height: scrollHeight }}>
//         {/* Road */}
//         <Image
//           source={IMAGES.lessonRoad}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: roadLeft,
//             width: ROAD_WIDTH,
//             height: scrollHeight,
//             zIndex: 0,
//           }}
//           resizeMode="repeat"
//         />

//         {/* Lessons slightly overlapping road */}
//         {lessons.map((lesson, i) => {
//           const top = i * LESSON_SPACING + LESSON_SPACING / 2;
//           const side = i % 2 === 0 ? 'left' : 'right';

//           let signColor = COLORS.grey;
//           let icon = <SimpleIcon name="lock-closed" size={28} color={COLORS.white} />;
//           let opacity = 0.4;

//           if (lesson.comingSoon) {
//             signColor = COLORS.lightBlue;
//             icon = null;
//             opacity = 0.6;
//           } else if (lesson.id < currentLesson) {
//             signColor = COLORS.yellow;
//             icon = <SimpleIcon name="checkmark" size={28} color={COLORS.white} />;
//             opacity = 1;
//           } else if (lesson.id === currentLesson) {
//             signColor = COLORS.orange;
//             icon = <SimpleIcon name="play" size={28} color={COLORS.white} />;
//             opacity = 1;
//           }

//           // Negative margin pulls lessons inside road
//           const left =
//             side === 'left'
//               ? roadLeft - LESSON_SIZE - ROAD_MARGIN
//               : roadRight + ROAD_MARGIN;

//           return (
//             <TouchableOpacity
//               key={lesson.id}
//               onPress={() => handleLessonPress(lesson)}
//               style={{
//                 position: 'absolute',
//                 top,
//                 left,
//                 width: LESSON_SIZE,
//                 height: LESSON_SIZE,
//                 opacity,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 zIndex: 10,
//               }}
//             >
//               <View style={[styles.lessonSign, { backgroundColor: signColor }]}>
//                 <Text style={styles.lessonText}>
//                   {lesson.comingSoon ? 'Coming Soon' : 'Lesson'}
//                 </Text>
//                 {!lesson.comingSoon && (
//                   <Text style={styles.lessonNumber}>{lesson.id}</Text>
//                 )}
//               </View>
//               {icon && (
//                 <View style={[styles.lessonIcon, { backgroundColor: signColor }]}>
//                   {icon}
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}

//         {/* Avatar centered on road */}
//         <Animated.View
//           style={{
//             position: 'absolute',
//             transform: [{ translateY: avatarY }],
//             left: roadLeft + ROAD_WIDTH / 2 - 35,
//             width: 70,
//             height: 70,
//             zIndex: 20,
//           }}
//         >
//           <Image
//             source={IMAGES.userAvatar}
//             style={{
//               width: 70,
//               height: 70,
//               borderRadius: 35,
//               borderWidth: 3,
//               borderColor: COLORS.white,
//             }}
//             resizeMode="cover"
//           />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.lightGreen },
//   lessonSign: {
//     width: '100%',
//     height: '100%',
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.medium,
//   },
//   lessonText: {
//     fontSize: 12,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonNumber: {
//     fontSize: 18,
//     color: COLORS.black,
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonIcon: {
//     position: 'absolute',
//     bottom: -30,
//     width: 55,
//     height: 55,
//     borderRadius: 27.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
// });

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Animated,
//   useWindowDimensions,
// } from 'react-native';
// import SimpleIcon from '../components/SimpleIcon';
// import { COLORS, SHADOWS } from '../constants/theme';
// import { IMAGES } from '../constants/images';

// export default function LessonsScreen({ navigation }) {
//     // Road width scales by device type
//     let roadWidth;
//     if (SCREEN_WIDTH < 400) {
//       // Small phones
//       roadWidth = SCREEN_WIDTH * 0.72;
//     } else if (SCREEN_WIDTH < 768) {
//       // Normal phones
//       roadWidth = SCREEN_WIDTH * 0.78;
//     } else {
//       // Tablets
//       roadWidth = SCREEN_WIDTH * 0.88;
//     }
//     // Clamp road width so it never goes crazy
//     roadWidth = Math.max(200, Math.min(600, roadWidth));

//     const roadLeft = (SCREEN_WIDTH - roadWidth) / 2;
//     const roadRight = roadLeft + roadWidth;

//     // Lessons relative to road
//     const LESSON_SIZE = Math.round(Math.max(60, Math.min(120, roadWidth * 0.28)));
//     const LESSON_SPACING = Math.round(LESSON_SIZE * 1.8);

//     // Overlap factor depends on road width
//     const OVERLAP_FACTOR = roadWidth < 320 ? 0.25 : 0.35;
//     const OVERLAP = LESSON_SIZE * OVERLAP_FACTOR;

//     // Avatar responsive
//     const AVATAR_SIZE = Math.round(Math.max(48, Math.min(80, roadWidth * 0.18)));


//   // Lessons array
//   const lessons = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 },
//     { id: 7 },
//     { id: 8 },
//     { id: 9 },
//     { id: 10, comingSoon: true },
//   ];

//   // content size (ensure at least screen height)
//   const scrollHeight = Math.max(SCREEN_HEIGHT, lessons.length * LESSON_SPACING + LESSON_SPACING);

//   // current lesson
//   const [currentLesson, setCurrentLesson] = useState(1);

//   // Avatar animated Y — initialized to current position
//   const initialAvatarY = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
//   const avatarY = useRef(new Animated.Value(initialAvatarY)).current;

//   useEffect(() => {
//     // Recompute target when lesson or spacing changes
//     const toValue = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
//     Animated.timing(avatarY, {
//       toValue,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   }, [currentLesson, LESSON_SPACING, avatarY]);

//   const handleLessonPress = (lesson) => {
//     if (lesson.comingSoon || lesson.id > currentLesson) return;
//     navigation.navigate('MatchingExercise', { lessonId: lesson.id });
//     if (lesson.id === currentLesson && currentLesson < lessons.length) {
//       setCurrentLesson((c) => c + 1);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={{ height: scrollHeight }}>
//         {/* Road (use 'cover' to avoid seams unless your asset is a seamless vertical tile) */}
//         <Image
//           source={IMAGES.lessonRoad}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: roadLeft,
//             width: roadWidth,
//             height: scrollHeight,
//             zIndex: 0,
//           }}
//           resizeMode="cover"
//         />

//         {/* Lessons */}
//         {lessons.map((lesson, i) => {
//           const top = i * LESSON_SPACING + LESSON_SPACING / 2;
//           const side = i % 2 === 0 ? 'left' : 'right';

//           // visual state
//           let signColor = COLORS.grey;
//           let icon = <SimpleIcon name="lock-closed" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
//           let opacity = 0.5;
//           if (lesson.comingSoon) {
//             signColor = COLORS.lightBlue;
//             icon = null;
//             opacity = 0.65;
//           } else if (lesson.id < currentLesson) {
//             signColor = COLORS.yellow;
//             icon = <SimpleIcon name="checkmark" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
//             opacity = 1;
//           } else if (lesson.id === currentLesson) {
//             signColor = COLORS.orange;
//             icon = <SimpleIcon name="play" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
//             opacity = 1;
//           }

//           // Placement math (stable):
//           // Left sign: set right edge of sign bbox to (roadLeft + OVERLAP)
//           // => left = (roadLeft + OVERLAP) - LESSON_SIZE
//           // Right sign: set left edge of sign bbox to (roadRight - OVERLAP)
//           // => left = roadRight - OVERLAP
//           let left = side === 'left' ? Math.round(roadLeft + OVERLAP - LESSON_SIZE) : Math.round(roadRight - OVERLAP);

//           // clamp to screen so extreme overlap won't push it off-screen
//           const minLeft = 6;
//           const maxLeft = Math.max(6, SCREEN_WIDTH - LESSON_SIZE - 6);
//           left = Math.min(Math.max(left, minLeft), maxLeft);

//           return (
//             <TouchableOpacity
//               key={lesson.id}
//               onPress={() => handleLessonPress(lesson)}
//               activeOpacity={0.9}
//               style={{
//                 position: 'absolute',
//                 top,
//                 left,
//                 width: LESSON_SIZE,
//                 height: LESSON_SIZE + POLE_HEIGHT + 6,
//                 alignItems: 'center',
//                 justifyContent: 'flex-start',
//                 zIndex: 12,
//                 overflow: 'visible',
//               }}
//             >
//               {/* pole (behind sign) */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: LESSON_SIZE * 0.62,
//                   left: LESSON_SIZE / 2 - POLE_WIDTH / 2,
//                   width: POLE_WIDTH,
//                   height: POLE_HEIGHT,
//                   borderRadius: POLE_WIDTH / 2,
//                   backgroundColor: '#6b4f4f',
//                   zIndex: 6,
//                   ...SHADOWS.small,
//                 }}
//               />

//               {/* rotated diamond sign */}
//               <View
//                 style={[
//                   styles.lessonSign,
//                   {
//                     width: LESSON_SIZE,
//                     height: LESSON_SIZE,
//                     backgroundColor: signColor,
//                     opacity,
//                     zIndex: 10,
//                   },
//                 ]}
//               >
//                 <Text style={[styles.lessonText, { fontSize: Math.round(LESSON_SIZE * 0.11) }]}>
//                   {lesson.comingSoon ? 'Coming Soon' : 'Lesson'}
//                 </Text>
//                 {!lesson.comingSoon && (
//                   <Text style={[styles.lessonNumber, { fontSize: Math.round(LESSON_SIZE * 0.16) }]}>{lesson.id}</Text>
//                 )}
//               </View>

//               {/* circular icon below the sign */}
//               {icon && (
//                 <View
//                   style={[
//                     styles.lessonIcon,
//                     {
//                       width: Math.round(LESSON_SIZE * 0.44),
//                       height: Math.round(LESSON_SIZE * 0.44),
//                       borderRadius: Math.round((LESSON_SIZE * 0.44) / 2),
//                       backgroundColor: signColor,
//                       bottom: -Math.round(LESSON_SIZE * 0.18),
//                       zIndex: 11,
//                     },
//                   ]}
//                 >
//                   {icon}
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         })}

//         {/* Avatar centered on road */}
//         <Animated.View
//           style={{
//             position: 'absolute',
//             left: Math.round(roadLeft + roadWidth / 2 - AVATAR_SIZE / 2),
//             width: AVATAR_SIZE,
//             height: AVATAR_SIZE,
//             transform: [{ translateY: avatarY }],
//             zIndex: 20,
//           }}
//         >
//           <Image
//             source={IMAGES.userAvatar}
//             style={{
//               width: '100%',
//               height: '100%',
//               borderRadius: Math.round(AVATAR_SIZE / 2),
//               borderWidth: 3,
//               borderColor: COLORS.white,
//             }}
//             resizeMode="cover"
//           />
//         </Animated.View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.lightGreen },
//   lessonSign: {
//     borderWidth: 2,
//     borderColor: COLORS.black,
//     transform: [{ rotate: '45deg' }],
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.medium,
//   },
//   lessonText: {
//     color: COLORS.black,
//     fontWeight: '700',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//   },
//   lessonNumber: {
//     color: COLORS.black,
//     fontWeight: '700',
//     textDecorationLine: 'underline',
//     transform: [{ rotate: '-45deg' }],
//     textAlign: 'center',
//     marginTop: 6,
//   },
//   lessonIcon: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...SHADOWS.small,
//   },
// });

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

export default function LessonsScreen({ navigation }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // Road width scales dynamically
  const roadWidth = Math.min(Math.max(SCREEN_WIDTH * 0.7, 200), SCREEN_WIDTH * 0.9);
  const roadLeft = (SCREEN_WIDTH - roadWidth) / 2;
  const roadRight = roadLeft + roadWidth;

  // Lessons size and spacing scale dynamically
  const LESSON_SIZE = Math.round(Math.min(Math.max(60, roadWidth * 0.28), 120));
  const LESSON_SPACING = Math.round(LESSON_SIZE * 1.8);
  const OVERLAP = LESSON_SIZE * 0.35;

  const AVATAR_SIZE = Math.round(Math.min(Math.max(48, roadWidth * 0.18), 80));

  const POLE_WIDTH = Math.round(LESSON_SIZE * 0.1);
  const POLE_HEIGHT = Math.round(LESSON_SIZE * 0.7);

  const lessons = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    comingSoon: i === 9,
  }));

  const scrollHeight = Math.max(SCREEN_HEIGHT, lessons.length * LESSON_SPACING + LESSON_SPACING);

  const [currentLesson, setCurrentLesson] = useState(1);
  const initialAvatarY = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
  const avatarY = useRef(new Animated.Value(initialAvatarY)).current;

  useEffect(() => {
    const toValue = (currentLesson - 1) * LESSON_SPACING + LESSON_SPACING / 2;
    Animated.timing(avatarY, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [currentLesson, LESSON_SPACING]);

  const handleLessonPress = (lesson) => {
    if (lesson.comingSoon || lesson.id > currentLesson) return;
    navigation.navigate('MatchingExercise', { lessonId: lesson.id });
    if (lesson.id === currentLesson && currentLesson < lessons.length) {
      setCurrentLesson((c) => c + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: scrollHeight }}>
        {/* Road */}
        <Image
          source={IMAGES.lessonRoad}
          style={{
            position: 'absolute',
            top: 0,
            left: roadLeft,
            width: roadWidth,
            height: scrollHeight,
            zIndex: 0,
          }}
          resizeMode="cover"
        />

        {/* Lessons */}
        {lessons.map((lesson, i) => {
          const top = i * LESSON_SPACING + LESSON_SPACING / 2;
          // Glue lessons to road edges proportionally
          const left = i % 2 === 0
            ? roadLeft + OVERLAP - LESSON_SIZE / 2
            : roadRight - OVERLAP - LESSON_SIZE / 2;

          let signColor = COLORS.grey;
          let icon = <SimpleIcon name="lock-closed" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
          let opacity = 0.5;

          if (lesson.comingSoon) {
            signColor = COLORS.lightBlue;
            icon = null;
            opacity = 0.65;
          } else if (lesson.id < currentLesson) {
            signColor = COLORS.yellow;
            icon = <SimpleIcon name="checkmark" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
            opacity = 1;
          } else if (lesson.id === currentLesson) {
            signColor = COLORS.orange;
            icon = <SimpleIcon name="play" size={Math.round(LESSON_SIZE * 0.22)} color={COLORS.white} />;
            opacity = 1;
          }

          return (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleLessonPress(lesson)}
              activeOpacity={0.9}
              style={{
                position: 'absolute',
                top,
                left,
                width: LESSON_SIZE,
                height: LESSON_SIZE + POLE_HEIGHT + 6,
                alignItems: 'center',
                justifyContent: 'flex-start',
                zIndex: 12,
                overflow: 'visible',
              }}
            >
              {/* Pole */}
              <View
                style={{
                  position: 'absolute',
                  top: LESSON_SIZE * 0.62,
                  left: LESSON_SIZE / 2 - POLE_WIDTH / 2,
                  width: POLE_WIDTH,
                  height: POLE_HEIGHT,
                  borderRadius: POLE_WIDTH / 2,
                  backgroundColor: '#6b4f4f',
                  zIndex: 6,
                  ...SHADOWS.small,
                }}
              />

              {/* Lesson sign */}
              <View
                style={[
                  styles.lessonSign,
                  {
                    width: LESSON_SIZE,
                    height: LESSON_SIZE,
                    backgroundColor: signColor,
                    opacity,
                    zIndex: 10,
                  },
                ]}
              >
                <Text style={[styles.lessonText, { fontSize: Math.round(LESSON_SIZE * 0.11) }]}>
                  {lesson.comingSoon ? 'Coming Soon' : 'Lesson'}
                </Text>
                {!lesson.comingSoon && (
                  <Text style={[styles.lessonNumber, { fontSize: Math.round(LESSON_SIZE * 0.16) }]}>
                    {lesson.id}
                  </Text>
                )}
              </View>

              {/* Icon */}
              {icon && (
                <View
                  style={[
                    styles.lessonIcon,
                    {
                      width: Math.round(LESSON_SIZE * 0.44),
                      height: Math.round(LESSON_SIZE * 0.44),
                      borderRadius: Math.round((LESSON_SIZE * 0.44) / 2),
                      backgroundColor: signColor,
                      bottom: -Math.round(LESSON_SIZE * 0.18),
                      zIndex: 11,
                    },
                  ]}
                >
                  {icon}
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Avatar */}
        <Animated.View
          style={{
            position: 'absolute',
            left: Math.round(roadLeft + roadWidth / 2 - AVATAR_SIZE / 2),
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            transform: [{ translateY: avatarY }],
            zIndex: 20,
          }}
        >
          <Image
            source={IMAGES.userAvatar}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: Math.round(AVATAR_SIZE / 2),
              borderWidth: 3,
              borderColor: COLORS.white,
            }}
            resizeMode="cover"
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGreen },
  lessonSign: {
    borderWidth: 2,
    borderColor: COLORS.black,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  lessonText: {
    color: COLORS.black,
    fontWeight: '700',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
  },
  lessonNumber: {
    color: COLORS.black,
    fontWeight: '700',
    textDecorationLine: 'underline',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
    marginTop: 6,
  },
  lessonIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
});
