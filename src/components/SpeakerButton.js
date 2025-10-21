import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import TTS from '../utils/textToSpeech';

export default function SpeakerButton({ 
  text, 
  size = 20, 
  color = COLORS.darkBlue, 
  style = {},
  type = 'default' // 'hint', 'instruction', 'feedback', 'question'
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = async () => {
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