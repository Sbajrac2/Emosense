import React from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function SimpleSlider({ value, onValueChange, labels, disabled }) {
  const sliderWidth = 250;
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: (event) => {
      const { locationX } = event.nativeEvent;
      const newValue = Math.round((locationX / sliderWidth) * 100);
      onValueChange(Math.max(0, Math.min(100, newValue)));
    },
    onPanResponderMove: (event) => {
      const { moveX } = event.nativeEvent;
      const newValue = Math.round((moveX / sliderWidth) * 100);
      onValueChange(Math.max(0, Math.min(100, newValue)));
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.emojiLabel}>{label}</Text>
        ))}
      </View>
      
      <View style={styles.sliderTrack} {...panResponder.panHandlers}>
        <View style={[styles.sliderFill, { width: `${value}%` }]} />
        <View style={[styles.thumb, { left: `${value}%` }]} />
      </View>
      
      <Text style={styles.valueText}>{Math.round(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', marginBottom: 30 },
  labelsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 250, marginBottom: 10 },
  emojiLabel: { fontSize: 24 },
  sliderTrack: { 
    width: 250, 
    height: 40, 
    backgroundColor: COLORS.lightGrey, 
    borderRadius: 20,
    justifyContent: 'center',
    position: 'relative'
  },
  sliderFill: { 
    height: 40, 
    backgroundColor: COLORS.darkBlue, 
    borderRadius: 20,
    position: 'absolute'
  },
  thumb: { 
    width: 20, 
    height: 20, 
    backgroundColor: COLORS.orange, 
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    marginLeft: -10
  },
  valueText: { fontSize: SIZES.large, color: COLORS.darkBlue, fontWeight: 'bold', marginTop: 10 },
});