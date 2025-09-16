import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('studentName');
  const [password, setPassword] = useState('********');

  const handleLogin = () => {
    // Navigate to main app
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              {/* This would be replaced with the actual logo image */}
              <View style={styles.logoShape}>
                <View style={styles.logoCenter}>
                <Image source={require('../../assets/images/10.png')} style={styles.logoImage} resizeMode="contain" />               
         </View>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Student Logon</Text>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>User Name</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor={COLORS.grey}
               />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor={COLORS.grey}
                secureTextEntry
               />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  logoContainer: {
    marginBottom: SIZES.margin * 2,
  },
  logoImage: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoShape: {
    // width: 100,
    // height: 100,
    // backgroundColor: COLORS.yellow,
    // borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    // ...SHADOWS.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCenter: {
    // width: 60,
    // height: 60,
    // backgroundColor: COLORS.white,
    // borderRadius: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smileyFace: {
    fontSize: 24,
  },
  title: {
    fontSize: SIZES.xlarge,
    color: COLORS.black,
    marginBottom: SIZES.margin * 2,
    ...FONTS.bold,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
  },
  inputContainer: {
    marginBottom: SIZES.margin,
  },
  inputLabel: {
    fontSize: SIZES.base,
    color: COLORS.black,
    marginBottom: SIZES.margin / 2,
    ...FONTS.medium,
  },
  input: {
    backgroundColor: COLORS.lightBlue,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    fontSize: SIZES.base,
    color: COLORS.black,
    ...FONTS.regular,
  },
  loginButton: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    marginTop: SIZES.margin,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  loginButtonText: {
    fontSize: SIZES.large,
    color: COLORS.darkBlue,
    ...FONTS.bold,
  },
});
