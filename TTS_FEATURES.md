# Text-to-Speech Features Added

## Overview
Added comprehensive text-to-speech functionality throughout the EmoSense app to provide verbal cues and reduce text dependency.

## New Features

### 1. Text-to-Speech Service (`src/utils/textToSpeech.js`)
- Centralized TTS service with different voice types
- Specialized methods for hints, instructions, feedback, and questions
- Configurable pitch and rate for different content types

### 2. Speaker Button Component (`src/components/SpeakerButton.js`)
- Reusable speaker emoji button (🔈/🔊)
- Visual feedback when speaking
- Different TTS types: hint, instruction, feedback, question
- Customizable size and color

### 3. Reduced Text Throughout App
- Shortened titles and descriptions
- Condensed instructions while maintaining clarity
- Visual symbols (✕) instead of "Close" text
- Abbreviated labels (L1, A1, etc.) with full descriptions available via TTS

### 4. Enhanced Screens

#### MatchingExerciseScreen
- Speaker buttons next to all text elements
- Verbal feedback for correct/incorrect answers
- Audio hints with contextual information
- Shortened instruction text with full audio descriptions

#### LessonsScreen
- Speaker buttons on lesson signs
- Audio feedback when selecting lessons
- Verbal cues for locked/completed lessons
- Condensed lesson titles with full audio descriptions

#### ActivitiesScreen
- Speaker buttons for activity descriptions
- Audio announcements when starting activities
- Shortened activity titles with full descriptions via TTS
- Reduced text in due dates and assignments

#### PictureEmotionActivity
- Speaker buttons for questions and options
- Audio feedback for answers
- Verbal hints for each task
- Condensed question text with full audio versions

## Usage

### For Users
1. Tap any 🔈 speaker icon to hear the text read aloud
2. Icons change to 🔊 while speaking
3. Tap again to stop current speech
4. Different content types have appropriate voice characteristics

### For Developers
```javascript
import TTS from '../utils/textToSpeech';
import SpeakerButton from '../components/SpeakerButton';

// Use TTS service directly
await TTS.speak('Hello world');
await TTS.speakHint('This is a hint');
await TTS.speakFeedback('Great job!', true);

// Use SpeakerButton component
<SpeakerButton 
  text="Text to speak" 
  type="hint" 
  size={18} 
  style={styles.speaker}
/>
```

## Dependencies Added
- `expo-speech@~13.0.0` - Core text-to-speech functionality

## Benefits
1. **Accessibility**: Better support for users with reading difficulties
2. **Engagement**: Audio feedback makes interactions more engaging
3. **Learning**: Verbal cues help with emotion recognition learning
4. **Reduced Cognitive Load**: Less text to read, more audio guidance
5. **Multilingual Ready**: TTS service supports different languages

## Voice Characteristics
- **Hints**: Higher pitch (1.1), slower rate (0.7)
- **Instructions**: Normal pitch (1.0), normal rate (0.8)
- **Feedback**: Higher pitch for positive (1.2), lower for negative (0.9)
- **Questions**: Normal pitch (1.0), slower rate (0.7)