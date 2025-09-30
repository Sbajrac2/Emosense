import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

const { width } = Dimensions.get("window");
const SIGN_SIZE = width * 0.25;

const lessons = [
  { id: 1, color: "gold" },
  { id: 2, color: "orange" },
  { id: 3, color: "red" },
  { id: 4, color: "lightgreen" },
];

export default function AnimatedRoadMap() {
  const [completed, setCompleted] = useState([]);
  const [current, setCurrent] = useState(1);

  // animated Y position of avatar
  const avatarY = useRef(new Animated.Value(0)).current;

  const handleComplete = (lessonId, topOffset) => {
    if (completed.includes(lessonId)) return;
    setCompleted([...completed, lessonId]);
    const next = lessonId + 1;
    setCurrent(next);
    // smooth avatar movement
    Animated.timing(avatarY, {
      toValue: topOffset,
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {lessons.map((item, i) => {
          const top = i * 220 + 60; // vertical spacing
          const side = i % 2 === 0 ? "flex-start" : "flex-end";
          const done = completed.includes(item.id);

          return (
            <View
              key={item.id}
              style={[styles.lessonRow, { justifyContent: side, top }]}
            >
              <TouchableOpacity
                onPress={() => handleComplete(item.id, top)}
                activeOpacity={0.8}
              >
                <Svg
                  width={SIGN_SIZE}
                  height={SIGN_SIZE}
                  viewBox="0 0 100 100"
                >
                  <Polygon
                    points="50,0 100,50 50,100 0,50"
                    fill={done ? "green" : item.color}
                    stroke="black"
                    strokeWidth="3"
                  />
                </Svg>
                <View style={styles.labelContainer}>
                  {done ? (
                    <Text style={styles.check}>✓</Text>
                  ) : (
                    <>
                      <Text style={styles.lesson}>Lesson</Text>
                      <Text style={styles.lessonNum}>{item.id}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Animated avatar */}
        <Animated.View
          style={[
            styles.avatar,
            {
              transform: [{ translateY: avatarY }],
            },
          ]}
        >
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 24 }}>🙂</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#dce8dd" },
  scrollContent: {
    paddingVertical: 60,
    paddingBottom: 200,
  },
  lessonRow: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  labelContainer: {
    position: "absolute",
    top: SIGN_SIZE * 0.35,
    left: 0,
    width: SIGN_SIZE,
    alignItems: "center",
  },
  lesson: {
    fontWeight: "bold",
    fontSize: SIGN_SIZE * 0.2,
  },
  lessonNum: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: SIGN_SIZE * 0.25,
  },
  check: {
    fontSize: SIGN_SIZE * 0.4,
    color: "white",
    fontWeight: "bold",
  },
  avatar: {
    position: "absolute",
    left: "45%",
    zIndex: 10,
  },
  avatarCircle: {
    width: SIGN_SIZE * 0.7,
    height: SIGN_SIZE * 0.7,
    borderRadius: SIGN_SIZE * 0.35,
    backgroundColor: "#88bbee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
});
