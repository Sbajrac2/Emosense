import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTTS } from '../contexts/TTSContext';
import { COLORS } from '../constants/theme';

export default function TTSToggle() {
  const { isTTSEnabled, toggleTTS } = useTTS();

  return (
    <TouchableOpacity style={styles.toggle} onPress={toggleTTS}>
      <Text style={styles.icon}>{isTTSEnabled ? '🎤' : '🔇'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1000,
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  icon: {
    fontSize: 20,
  },
});