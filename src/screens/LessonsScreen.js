import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import SimpleIcon from '../components/SimpleIcon';
import { COLORS, SHADOWS } from '../constants/theme';
import { IMAGES } from '../constants/images';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LessonsScreen({ navigation }) {
  const [currentLesson, setCurrentLesson] = useState(1);

  const lessons = [
    { id: 1, title: 'Lesson 1', type: 'emoji', description: 'Basic Emojis' },
    { id: 2, title: 'Lesson 2', type: 'cartoon', description: 'Cartoon Emotions' },
    { id: 3, title: 'Lesson 3', type: 'real', description: 'Real Photos' },
    { id: 4, title: 'Lesson 4', type: 'mixed', description: 'Mixed Practice' },
    { id: 5, title: 'More lessons coming soon', comingSoon: true },
  ];

  // Responsive sizing
  const roadWidth = SCREEN_WIDTH;
  const lessonSize = Math.min(SCREEN_WIDTH * 0.15, 70);
  const lessonSpacing = 200;
  const avatarSize = Math.min(SCREEN_WIDTH * 0.12, 50);

  const roadLeft = 0;
  const scrollHeight = lessons.length * lessonSpacing + 400;

  // Avatar animation
  const avatarY = useRef(new Animated.Value(lessonSpacing / 2)).current;

  useEffect(() => {
    const targetY = (currentLesson - 1) * lessonSpacing + lessonSpacing / 2;
    Animated.timing(avatarY, {
      toValue: targetY,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentLesson]);

  const handleLessonPress = (lesson) => {
    if (lesson.comingSoon) return;
    if (lesson.id > currentLesson) return;

    // Navigate to different activities based on lesson type
    switch (lesson.type) {
      case 'emoji':
        navigation.navigate('MatchingExercise', { lessonId: lesson.id, lessonType: 'emoji' });
        break;
      case 'cartoon':
        navigation.navigate('SwipeEmotionActivity', { lessonType: 'cartoon' });
        break;
      case 'real':
        navigation.navigate('PictureEmotionActivity', { lessonType: 'real' });
        break;
      case 'mixed':
        navigation.navigate('EmotionMatchingActivity', { lessonType: 'mixed' });
        break;
      default:
        navigation.navigate('MatchingExercise', { lessonId: lesson.id });
    }

    if (lesson.id === currentLesson && currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const getLessonIcon = (lesson) => {
    if (lesson.comingSoon) {
      return null;
    } else if (lesson.id < currentLesson) {
      return <SimpleIcon name="checkmark" size={lessonSize * 0.3} color={COLORS.white} />;
    } else if (lesson.id === currentLesson) {
      return <SimpleIcon name="play" size={lessonSize * 0.3} color={COLORS.white} />;
    } else {
      return <SimpleIcon name="lock-closed" size={lessonSize * 0.3} color={COLORS.white} />;
    }
  };

  const getLessonColor = (lesson) => {
    if (lesson.comingSoon) {
      return COLORS.lightBlue;
    } else if (lesson.id < currentLesson) {
      return COLORS.yellow;
    } else if (lesson.id === currentLesson) {
      return COLORS.orange;
    } else {
      return COLORS.grey;
    }
  };

  const getLessonOpacity = (lesson) => {
    if (lesson.comingSoon) {
      return 0.6;
    } else if (lesson.id <= currentLesson) {
      return 1;
    } else {
      return 0.4;
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
        {lessons.map((lesson, index) => {
          const topPosition = index * lessonSpacing + lessonSpacing / 2;
          const isLeft = index % 2 === 0;
          
          const leftPosition = isLeft 
            ? 20
            : SCREEN_WIDTH - lessonSize - 20;

          const signColor = getLessonColor(lesson);
          const icon = getLessonIcon(lesson);
          const opacity = getLessonOpacity(lesson);

          return (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleLessonPress(lesson)}
              style={{
                position: 'absolute',
                top: topPosition - lessonSize / 2,
                left: leftPosition,
                width: lessonSize,
                height: lessonSize + lessonSize * 0.6,
                alignItems: 'center',
                opacity,
                zIndex: 10,
              }}
            >
              {/* Pole under the sign */}
              <View
                style={{
                  position: 'absolute',
                  top: lessonSize * 0.7,
                  left: lessonSize / 2 - 3,
                  width: 6,
                  height: lessonSize * 0.5,
                  backgroundColor: '#8B4513',
                  borderRadius: 3,
                  zIndex: 1,
                }}
              />
              
              {/* Diamond sign */}
              <View
                style={[
                  styles.lessonSign,
                  {
                    width: lessonSize,
                    height: lessonSize,
                    backgroundColor: signColor,
                  },
                ]}
              >
                <Text style={[styles.lessonText, { fontSize: lessonSize * 0.1 }]}>
                  {lesson.comingSoon ? 'Coming Soon' : lesson.title}
                </Text>
                {!lesson.comingSoon && (
                  <Text style={[styles.lessonDescription, { fontSize: lessonSize * 0.08 }]}>
                    {lesson.description}
                  </Text>
                )}
              </View>

              {/* Icon below sign */}
              {icon && (
                <View
                  style={[
                    styles.lessonIcon,
                    {
                      width: lessonSize * 0.6,
                      height: lessonSize * 0.6,
                      borderRadius: lessonSize * 0.3,
                      backgroundColor: signColor,
                      marginTop: 5,
                    },
                  ]}
                >
                  {icon}
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Animated Avatar */}
        <Animated.View
          style={{
            position: 'absolute',
            left: SCREEN_WIDTH / 2 - avatarSize / 2,
            width: avatarSize,
            height: avatarSize,
            transform: [{ translateY: avatarY }],
            zIndex: 20,
          }}
        >
          <Image
            source={IMAGES.userAvatar}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
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
    zIndex: 2,
    ...SHADOWS.medium,
  },
  lessonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
  },
  lessonDescription: {
    color: COLORS.black,
    fontWeight: '500',
    transform: [{ rotate: '-45deg' }],
    textAlign: 'center',
    marginTop: 2,
  },
  lessonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
});
