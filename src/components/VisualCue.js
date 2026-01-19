import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function VisualCue({ position, visible }) {
  if (!visible) return null;

  return (
    <View style={[styles.circle, { 
      top: position?.top || '50%', 
      left: position?.left || '50%' 
    }]} />
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.orange,
    backgroundColor: 'transparent',
    zIndex: 100,
    marginLeft: -20,
    marginTop: -20,
  },
});