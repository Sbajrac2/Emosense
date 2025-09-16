import React from 'react';
import { Text } from 'react-native';
import { FONTS } from '../constants/theme';

const SimpleIcon = ({ name, size, color }) => {
  const getIconText = (iconName) => {
    switch (iconName) {
      case 'home':
      case 'home-outline':
        return '🏠';
      case 'document-text':
      case 'document-text-outline':
        return '📚';
      case 'person':
      case 'person-outline':
        return '👤';
      case 'chevron-back':
        return '←';
      case 'chevron-forward':
        return '→';
      case 'checkmark':
        return '✓';
      case 'play':
        return '▶';
      case 'lock-closed':
        return '🔒';
      case 'star':
        return '⭐';
      case 'bulb':
        return '💡';
      case 'help-circle':
        return '❓';
      case 'checkmark-circle':
        return '✅';
      case 'play-circle':
        return '▶️';
      case 'log-out':
        return '🚪';
      case 'notifications':
        return '🔔';
      case 'volume-high':
        return '🔊';
      case 'information-circle':
        return 'ℹ️';
      case 'camera':
        return '📷';
      case 'book':
        return '📖';
      case 'color-palette':
        return '🎨';
      case 'flame':
        return '🔥';
      case 'trophy':
        return '🏆';
      case 'time':
        return '⏰';
      case 'medal':
        return '🏅';
      default:
        return '•';
    }
  };

  return (
    <Text style={{ fontSize: size, color: color, ...FONTS.regular }}>
      {getIconText(name)}
    </Text>
  );
};

export default SimpleIcon;
