import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

const images = [
  require('../../assets/splash-icon.png'),
  require('../../assets/icon.png'),
  require('../../assets/adaptive-icon.png'),
  require('../../assets/favicon.png'),
];

const SLIDER_WIDTH = Dimensions.get('window').width;

export default function OnboardingScreen({ onFinish }: { onFinish: () => void }) {
  const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus | null>(null);

  useEffect(() => {
    Notifications.getPermissionsAsync().then(({ status }) => setPermissionStatus(status));
  }, []);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);
  };

  const renderItem = ({ item }: { item: number }) => (
    <Image source={item} style={styles.slideImage} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#e0f0ff" />
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={{ flexGrow: 0 }}
      />
      {permissionStatus !== 'granted' && (
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir Notificações</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.loginButton} onPress={onFinish}>
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f0ff',
  },
  slideImage: {
    width: SLIDER_WIDTH,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3399ff',
    borderRadius: 8,
  },
  loginButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#1976d2',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
