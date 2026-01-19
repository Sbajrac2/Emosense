# Sound Effects Integration

## Epidemic Sound Integration

To use sound effects from Epidemic Sound (https://www.epidemicsound.com/sound-effects/):

1. **Download suitable sound effects** from Epidemic Sound:
   - Success/correct answer sounds (positive, upbeat)
   - Error/incorrect answer sounds (gentle, not harsh)
   - Button press sounds (subtle clicks)
   - Video start sounds (attention-getting but calm)

2. **Place sound files** in this directory with these names:
   - `success.mp3` - For correct answers
   - `error.mp3` - For incorrect answers  
   - `button.mp3` - For button presses
   - `video-start.mp3` - For video playback start

3. **Update the sound service** to load these files:
   ```javascript
   // In soundEffects.js, add:
   await this.loadSound('success', require('../../assets/sounds/success.mp3'));
   await this.loadSound('error', require('../../assets/sounds/error.mp3'));
   await this.loadSound('button', require('../../assets/sounds/button.mp3'));
   await this.loadSound('videoStart', require('../../assets/sounds/video-start.mp3'));
   ```

## Recommended Sound Types

- **Success sounds**: Gentle chimes, positive bells, soft celebration sounds
- **Error sounds**: Soft buzzer, gentle "try again" tone (avoid harsh sounds for autism-friendly design)
- **Button sounds**: Subtle clicks, soft taps
- **Video sounds**: Gentle attention sound, soft notification

## Note
Epidemic Sound requires a subscription for commercial use. Ensure proper licensing before deployment.