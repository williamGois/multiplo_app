import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <View style={styles.container}>
      {showLogin ? (
        <LoginScreen />
      ) : (
        <OnboardingScreen onFinish={() => setShowLogin(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
