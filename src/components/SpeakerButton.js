import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import TTS from '../utils/textToSpeech';
import { useTTS } from '../contexts/TTSContext';

export default function SpeakerButton({ 
  text, 
  size = 20, 
  color = COLORS.darkBlue, 
  style = {},
  type = 'default' // 'hint', 'instruction', 'feedback', 'question'
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isTTSEnabled } = useTTS();



  const handlePress = async () => {
    if (!isTTSEnabled) return;
    
    if (isPlaying) {
      TTS.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    
    try {
      switch (type) {
        case 'hint':
          await TTS.speakHint(text);
          break;
        case 'instruction':
          await TTS.speakInstruction(text);
          break;
        case 'feedback':
          await TTS.speakFeedback(text);
          break;
        case 'question':
          await TTS.speakQuestion(text);
          break;
        default:
          await TTS.speak(text);
      }
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={[styles.speaker, { fontSize: size, color: isPlaying ? COLORS.orange : color }]}>
        {isPlaying ? '🔊' : '🔈'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 4,
  },
  speaker: {
    textAlign: 'center',
  },
});