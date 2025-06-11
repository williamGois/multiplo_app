import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import * as Network from 'expo-network';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [networkInfo, setNetworkInfo] = useState<Network.NetworkState | null>(null);

  React.useEffect(() => {
    const fetchState = async () => {
      const state = await Network.getNetworkStateAsync();
      setNetworkInfo(state);
    };
    fetchState();
  }, []);

  const togglePassword = () => setShowPassword(prev => !prev);

  const formatDate = () => {
    return new Date().toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent />
      <View style={styles.topBar}>
        <Text style={styles.topText}>{formatDate()}</Text>
        <Text style={styles.topText}>{networkInfo?.isConnected ? 'Wi-Fi' : 'Sem conexão'}</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Senha"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePassword} style={styles.eyeIcon}>
            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#1976d2" />
          </TouchableOpacity>
        </View>
        <TextInputMask
          type={'cel-phone'}
          options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
          value={whatsapp}
          onChangeText={setWhatsapp}
          style={styles.input}
          placeholder="Whatsapp"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#e0f0ff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  topText: {
    fontSize: 16,
    color: '#1976d2',
  },
  form: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#3399ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
