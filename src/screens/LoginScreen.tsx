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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ToothIcon } from '../components/ToothIcon';
import { AnimatedInput } from '../components/AnimatedInput';
import { AnimatedButton } from '../components/AnimatedButton';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Animações
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const titleOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(100);
  const formOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(1.2);
  const floatingElements = useSharedValue(0);

  useEffect(() => {
    // Sequência de animações de entrada
    logoScale.value = withDelay(300, withSpring(1, { damping: 8 }));
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    
    titleTranslateY.value = withDelay(600, withSpring(0, { damping: 10 }));
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    
    formTranslateY.value = withDelay(900, withSpring(0, { damping: 12 }));
    formOpacity.value = withDelay(900, withTiming(1, { duration: 800 }));
    
    backgroundScale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) });
    
    // Animação contínua dos elementos flutuantes
    floatingElements.value = withSequence(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) }),
      withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sin) })
    );
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrors({});

    // Validação simples
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simular login
    setTimeout(() => {
      setLoading(false);
      onLogin(email, password);
    }, 2000);
  };

  // Estilos animados
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: titleOpacity.value,
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formTranslateY.value }],
    opacity: formOpacity.value,
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundScale.value }],
  }));

  const floatingAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingElements.value, [0, 1], [0, -20]);
    const rotate = interpolate(floatingElements.value, [0, 1], [0, 360]);
    
    return {
      transform: [
        { translateY },
        { rotate: `${rotate}deg` }
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Background com gradiente animado */}
        <Animated.View style={[styles.backgroundContainer, backgroundAnimatedStyle]}>
          <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>

        {/* Elementos flutuantes decorativos */}
        <Animated.View style={[styles.floatingElement, styles.floatingElement1, floatingAnimatedStyle]}>
          <ToothIcon size={30} color="rgba(255,255,255,0.1)" animate={false} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floatingElement2, floatingAnimatedStyle]}>
          <ToothIcon size={25} color="rgba(255,255,255,0.08)" animate={false} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floatingElement3, floatingAnimatedStyle]}>
          <ToothIcon size={35} color="rgba(255,255,255,0.06)" animate={false} />
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo e ícone principal */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.logoBackground}>
              <ToothIcon size={80} color="#FFFFFF" animate={true} />
            </View>
          </Animated.View>

          {/* Título e subtítulo */}
          <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
            <Text style={styles.title}>Múltiplo Sorriso</Text>
            <Text style={styles.subtitle}>Gestão Odontológica Inteligente</Text>
          </Animated.View>

          {/* Formulário de login */}
          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            <BlurView intensity={20} style={styles.formBlur}>
              <View style={styles.formContent}>
                <Text style={styles.formTitle}>Bem-vindo de volta!</Text>
                <Text style={styles.formSubtitle}>
                  Faça login para acessar sua clínica
                </Text>

                <View style={styles.inputContainer}>
                  <AnimatedInput
                    label="Email"
                    icon="email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                  />

                  <AnimatedInput
                    label="Senha"
                    icon="lock"
                    value={password}
                    onChangeText={setPassword}
                    isPassword
                    error={errors.password}
                  />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Esqueceu sua senha?
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <AnimatedButton
                    title="Entrar"
                    onPress={handleLogin}
                    loading={loading}
                    size="large"
                    icon="login"
                    style={styles.loginButton}
                  />

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ou</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <AnimatedButton
                    title="Criar conta"
                    onPress={onNavigateToRegister}
                    variant="outline"
                    size="large"
                    icon="person-add"
                    style={styles.registerButton}
                  />
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  keyboardView: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  floatingElement1: {
    top: height * 0.15,
    right: width * 0.1,
  },
  floatingElement2: {
    top: height * 0.3,
    left: width * 0.05,
  },
  floatingElement3: {
    top: height * 0.6,
    right: width * 0.15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins_400Regular',
  },
  formContainer: {
    flex: 1,
  },
  formBlur: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  formContent: {
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins_600SemiBold',
  },
  formSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Poppins_400Regular',
  },
  inputContainer: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    gap: 16,
  },
  loginButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
