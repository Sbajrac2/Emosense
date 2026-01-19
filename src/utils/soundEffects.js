import { Audio } from 'expo-av';

class SoundEffectsService {
  constructor() {
    this.sounds = {};
    this.isEnabled = true;
  }

  async loadSound(name, source) {
    try {
      const { sound } = await Audio.Sound.createAsync(source);
      this.sounds[name] = sound;
      return sound;
    } catch (error) {
      console.warn(`Failed to load sound ${name}:`, error);
      return null;
    }
  }

  async playSound(name, options = {}) {
    if (!this.isEnabled || !this.sounds[name]) return;
    
    try {
      await this.sounds[name].replayAsync();
    } catch (error) {
      console.warn(`Failed to play sound ${name}:`, error);
    }
  }

  async playCorrectAnswer() {
    // Placeholder for success sound - replace with Epidemic Sound file
    // await this.playSound('success');
  }

  async playIncorrectAnswer() {
    // Placeholder for error sound - replace with Epidemic Sound file  
    // await this.playSound('error');
  }

  async playButtonPress() {
    // Placeholder for button sound - replace with Epidemic Sound file
    // await this.playSound('button');
  }

  async playVideoStart() {
    // Placeholder for video start sound - replace with Epidemic Sound file
    // await this.playSound('videoStart');
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  async unloadAll() {
    for (const sound of Object.values(this.sounds)) {
      await sound.unloadAsync();
    }
    this.sounds = {};
  }
}

export default new SoundEffectsService();