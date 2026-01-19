import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function AnimatedHighlight({ position, type = 'circle', visible = false }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.8,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.4,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  const getHighlightStyle = () => {
    switch (type) {
      case 'circle':
        return {
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 3,
          borderColor: COLORS.orange,
        };
      case 'oval':
        return {
          width: 80,
          height: 40,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: COLORS.orange,
        };
      case 'rectangle':
        return {
          width: 100,
          height: 30,
          borderRadius: 5,
          borderWidth: 3,
          borderColor: COLORS.orange,
        };
      default:
        return {
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 3,
          borderColor: COLORS.orange,
        };
    }
  };

  return (
    <Animated.View
      style={[
        styles.highlight,
        getHighlightStyle(),
        {
          position: 'absolute',
          top: position.top,
          left: position.left,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: 'transparent',
  },
});