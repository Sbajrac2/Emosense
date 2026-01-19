import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { TTSProvider } from "./src/contexts/TTSContext";

function SimpleApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EmoSense App Loading...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#2E5BBA',
    fontWeight: 'bold',
  },
});

export default function App() {
  return (
    <TTSProvider>
      <SimpleApp />
    </TTSProvider>
  );
}