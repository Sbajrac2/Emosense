import * as Speech from 'expo-speech';

class TextToSpeechService {
  constructor() {
    this.isSpeaking = false;
  }

  async speak(text, options = {}) {
    if (this.isSpeaking) {
      this.stop();
    }

    const defaultOptions = {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.8,
      voice: null,
      ...options
    };

    this.isSpeaking = true;

    return new Promise((resolve) => {
      Speech.speak(text, {
        ...defaultOptions,
        onDone: () => {
          this.isSpeaking = false;
          resolve();
        },
        onError: (error) => {
          this.isSpeaking = false;
          console.warn('TTS Error:', error);
          resolve();
        }
      });
    });
  }

  stop() {
    if (this.isSpeaking) {
      Speech.stop();
      this.isSpeaking = false;
    }
  }

  pause() {
    if (this.isSpeaking) {
      Speech.pause();
    }
  }

  resume() {
    Speech.resume();
  }

  // Predefined verbal cues for common interactions
  speakHint(hintText) {
    return this.speak(`Hint: ${hintText}`, { pitch: 1.1, rate: 0.7 });
  }

  speakInstruction(instruction) {
    return this.speak(instruction, { pitch: 1.0, rate: 0.8 });
  }

  speakFeedback(feedback, isPositive = true) {
    const pitch = isPositive ? 1.2 : 0.9;
    return this.speak(feedback, { pitch, rate: 0.8 });
  }

  speakQuestion(question) {
    return this.speak(question, { pitch: 1.0, rate: 0.7 });
  }
}

export default new TextToSpeechService();