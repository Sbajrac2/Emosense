# EmoSense - Emotional Learning App

A React Native mobile application designed to help children learn about emotions through interactive exercises and lessons. Built with Expo for cross-platform compatibility.

## Features

- **Interactive Learning**: Match emotions with emojis and real photos
- **Progress Tracking**: Visual road map showing lesson progress
- **Achievement System**: Earn badges and track streaks
- **Child-Friendly UI**: Clean, colorful interface designed for young learners
- **Cross-Platform**: Works on both iOS and Android devices

## Screens

1. **Login Screen**: Student authentication with pre-filled credentials
2. **Lessons Screen**: Road map showing lesson progress and available lessons
3. **Activities Screen**: Grid of available learning activities
4. **Matching Exercise**: Interactive emotion matching with emojis/photos
5. **Lesson Summary**: Achievement display and progress tracking
6. **Profile Screen**: User stats, achievements, and settings

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Screen navigation and routing
- **Expo Vector Icons**: Icon library (Ionicons)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd EmoSense
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally (if not already installed):**
   ```bash
   npm install -g @expo/cli
   ```

## Running the App

### Development Mode

1. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

2. **Choose your platform:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR code with Expo Go app on your phone

### Using Expo Go App

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR code** displayed in the terminal or browser

### Building for Production

1. **Build for iOS:**
   ```bash
   expo build:ios
   ```

2. **Build for Android:**
   ```bash
   expo build:android
   ```

## Project Structure

```
EmoSense/
├── src/
│   ├── constants/
│   │   └── theme.js          # Colors, fonts, and styling constants
│   ├── navigation/
│   │   └── AppNavigator.js   # Navigation configuration
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── LessonsScreen.js
│   │   ├── ActivitiesScreen.js
│   │   ├── MatchingExerciseScreen.js
│   │   ├── LessonSummaryScreen.js
│   │   └── ProfileScreen.js
│   └── components/           # Reusable components (future)
├── assets/
│   └── images/              # App images and icons
├── App.js                   # Main app component
├── app.json                 # Expo configuration
└── package.json
```

## Color Scheme

The app uses a child-friendly color palette:
- **Light Green**: Background color (#E8F5E8)
- **Light Blue**: Buttons and cards (#B8D4F8)
- **Dark Blue**: Text and icons (#2E5BBA)
- **Pink**: Summary screens (#FFB6C1)
- **Yellow**: Accents and highlights (#FFD700)

## Navigation Flow

1. **Login** → Main Tabs
2. **Lessons Tab** → Lesson Map → Matching Exercise → Lesson Summary
3. **Activities Tab** → Activity Selection → Matching Exercise
4. **Profile Tab** → User Stats and Settings

## Customization

### Adding New Lessons

1. Update the `questions` array in `MatchingExerciseScreen.js`
2. Add lesson data with emoji/photos, correct answers, and options
3. Update the lessons array in `LessonsScreen.js`

### Modifying Colors

Edit the `COLORS` object in `src/constants/theme.js` to change the app's color scheme.

### Adding New Activities

1. Create new screen components in `src/screens/`
2. Add navigation routes in `AppNavigator.js`
3. Update the activities array in `ActivitiesScreen.js`

## Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npm start -- --reset-cache
   ```

2. **iOS Simulator not working:**
   - Ensure Xcode is installed and updated
   - Run `xcrun simctl list` to check available simulators

3. **Android Emulator not working:**
   - Ensure Android Studio is installed
   - Check that ANDROID_HOME environment variable is set

4. **Expo Go connection issues:**
   - Ensure phone and computer are on the same network
   - Try using tunnel connection: `expo start --tunnel`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both platforms
5. Submit a pull request

## License

This project is created for educational purposes.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review Expo documentation: https://docs.expo.dev/
3. Check React Navigation documentation: https://reactnavigation.org/
