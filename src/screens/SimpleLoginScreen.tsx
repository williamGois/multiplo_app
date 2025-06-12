import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { SimpleToothIcon } from '../components/SimpleToothIcon';
import { FloatingTeethBackground } from '../components/FloatingTeethBackground';
import { SimpleInput } from '../components/SimpleInput';
import { AnimatedButton } from '../components/AnimatedButton';

const { width, height } = Dimensions.get('window');

interface SimpleLoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export const SimpleLoginScreen: React.FC<SimpleLoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Valores animados
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-30);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const footerOpacity = useSharedValue(0);

  useEffect(() => {
    // Animações de entrada sequenciais
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });

    cardOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    cardTranslateY.value = withDelay(300, withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }));

    footerOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  const handleLogin = async () => {
    setLoading(true);
    
    // Entrada direta sem validação
    setTimeout(() => {
      setLoading(false);
      onLogin(email || 'admin@clinica.com', password || '123456');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1E40AF" 
        translucent={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Background com gradiente mais suave */}
        <LinearGradient
          colors={['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD']}
          locations={[0, 0.3, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />

        {/* Dentinhos flutuantes de fundo */}
        <FloatingTeethBackground />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header com logo */}
          <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
            <View style={styles.logoContainer}>
              <SimpleToothIcon size={50} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Múltiplo Sorriso</Text>
            <Text style={styles.subtitle}>Sistema de Gestão Odontológica</Text>
          </Animated.View>

          {/* Card de login */}
          <Animated.View style={[styles.loginCard, cardAnimatedStyle]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Acesso ao Sistema</Text>
              <Text style={styles.cardSubtitle}>
                Entre com suas credenciais para continuar
              </Text>
            </View>

            <View style={styles.formContainer}>
              <SimpleInput
                label="Email"
                icon="email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Digite seu email"
              />

              <SimpleInput
                label="Senha"
                icon="lock"
                value={password}
                onChangeText={setPassword}
                isPassword
                placeholder="Digite sua senha"
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              <AnimatedButton
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity 
                style={styles.registerLink}
                onPress={onNavigateToRegister}
              >
                <Text style={styles.registerLinkText}>
                  Não tem uma conta? <Text style={styles.registerLinkBold}>Cadastre-se</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[styles.footer, footerAnimatedStyle]}>
            <Text style={styles.footerText}>
              © 2024 Múltiplo Sorriso. Todos os direitos reservados.
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E40AF',
  },
  keyboardView: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 2,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '400',
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    padding: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 20,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    color: '#64748b',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  registerLink: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  registerLinkText: {
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
  },
  registerLinkBold: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
}); 