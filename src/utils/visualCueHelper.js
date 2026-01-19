// Visual Cue Helper - Automatically generates visual cues based on hint text
export const generateVisualCues = (hint) => {
  if (!hint) return [];
  
  const hintLower = hint.toLowerCase();
  const cues = [];
  
  // Eye-related hints
  if (hintLower.includes('eye') || hintLower.includes('bright') || hintLower.includes('wide') || hintLower.includes('droopy')) {
    cues.push({
      top: 60,
      left: 80,
      width: 35,
      height: 25,
      type: 'oval',
      feature: 'eyes'
    });
    cues.push({
      top: 60,
      left: 140,
      width: 35,
      height: 25,
      type: 'oval',
      feature: 'eyes'
    });
  }
  
  // Mouth/smile related hints
  if (hintLower.includes('mouth') || hintLower.includes('smile') || hintLower.includes('frown') || 
      hintLower.includes('lips') || hintLower.includes('downward') || hintLower.includes('upward')) {
    cues.push({
      top: 120,
      left: 100,
      width: 50,
      height: 30,
      type: 'oval',
      feature: 'mouth'
    });
  }
  
  // Eyebrow related hints
  if (hintLower.includes('eyebrow') || hintLower.includes('brow') || hintLower.includes('furrow') || 
      hintLower.includes('raised') || hintLower.includes('tense')) {
    cues.push({
      top: 45,
      left: 70,
      width: 110,
      height: 20,
      type: 'rectangle',
      feature: 'eyebrows'
    });
  }
  
  // Face/expression related hints (general face area)
  if (hintLower.includes('face') || hintLower.includes('expression') || hintLower.includes('facial') ||
      hintLower.includes('muscles') || hintLower.includes('tension')) {
    cues.push({
      top: 40,
      left: 60,
      width: 130,
      height: 140,
      type: 'circle',
      feature: 'face'
    });
  }
  
  // Body language hints (for videos)
  if (hintLower.includes('body') || hintLower.includes('posture') || hintLower.includes('position')) {
    cues.push({
      top: 80,
      left: 40,
      width: 180,
      height: 120,
      type: 'rectangle',
      feature: 'body'
    });
  }
  
  return cues;
};

// Get appropriate highlight color based on feature type
export const getCueColor = (feature) => {
  const colors = {
    eyes: '#FF6B35',
    mouth: '#4ECDC4',
    eyebrows: '#45B7D1',
    face: '#96CEB4',
    body: '#FFEAA7'
  };
  return colors[feature] || '#FF6B35';
};

// Animated highlight component styles
export const getCueStyle = (cue) => ({
  position: 'absolute',
  top: cue.top,
  left: cue.left,
  width: cue.width,
  height: cue.height,
  borderRadius: cue.type === 'circle' ? cue.width / 2 : 
                cue.type === 'oval' ? cue.height / 2 : 8,
  borderWidth: 4,
  borderColor: getCueColor(cue.feature),
  backgroundColor: 'rgba(255, 107, 53, 0.1)'
});