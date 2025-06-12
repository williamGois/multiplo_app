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

interface RegisterScreenProps {
  onRegister: (userData: RegisterData) => void;
  onNavigateToLogin: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  clinicName: string;
  phone: string;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
  onNavigateToLogin,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    clinicName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterData>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Animações
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const titleOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(100);
  const formOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(1.2);
  const stepProgress = useSharedValue(0);
  const floatingElements = useSharedValue(0);

  useEffect(() => {
    // Sequência de animações de entrada
    logoScale.value = withDelay(200, withSpring(1, { damping: 8 }));
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    
    titleTranslateY.value = withDelay(500, withSpring(0, { damping: 10 }));
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    
    formTranslateY.value = withDelay(800, withSpring(0, { damping: 12 }));
    formOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    
    backgroundScale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) });
    
    // Animação contínua dos elementos flutuantes
    const animateFloating = () => {
      floatingElements.value = withSequence(
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 4000, easing: Easing.inOut(Easing.sin) })
      );
    };
    animateFloating();
    const interval = setInterval(animateFloating, 8000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    stepProgress.value = withSpring(currentStep / 1);
  }, [currentStep]);

  const updateFormData = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (step === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      if (!formData.clinicName.trim()) {
        newErrors.clinicName = 'Nome da clínica é obrigatório';
      }
      if (!formData.password) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateStep(0)) {
      setLoading(true);
      
      // Simular registro
      setTimeout(() => {
        setLoading(false);
        onRegister(formData);
      }, 2000);
    }
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
    const translateY = interpolate(floatingElements.value, [0, 1], [0, -30]);
    const rotate = interpolate(floatingElements.value, [0, 1], [0, 180]);
    const scale = interpolate(floatingElements.value, [0, 1], [1, 1.1]);
    
    return {
      transform: [
        { translateY },
        { rotate: `${rotate}deg` },
        { scale }
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
          <ToothIcon size={25} color="rgba(255,255,255,0.08)" animate={false} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floatingElement2, floatingAnimatedStyle]}>
          <ToothIcon size={30} color="rgba(255,255,255,0.06)" animate={false} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floatingElement3, floatingAnimatedStyle]}>
          <ToothIcon size={20} color="rgba(255,255,255,0.1)" animate={false} />
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo e ícone principal */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.logoBackground}>
              <ToothIcon size={60} color="#FFFFFF" animate={true} />
            </View>
          </Animated.View>

          {/* Título e subtítulo */}
          <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Junte-se à revolução da gestão odontológica
            </Text>
          </Animated.View>

          {/* Formulário de cadastro */}
          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            <BlurView intensity={20} style={styles.formBlur}>
              <View style={styles.formContent}>
                <Text style={styles.formTitle}>Informações da Conta</Text>

                <View style={styles.inputContainer}>
                  <AnimatedInput
                    label="Nome completo"
                    icon="person"
                    value={formData.name}
                    onChangeText={(value) => updateFormData('name', value)}
                    error={errors.name}
                  />
                  <AnimatedInput
                    label="Email"
                    icon="email"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                  />
                  <AnimatedInput
                    label="Nome da clínica"
                    icon="business"
                    value={formData.clinicName}
                    onChangeText={(value) => updateFormData('clinicName', value)}
                    error={errors.clinicName}
                  />
                  <AnimatedInput
                    label="Telefone"
                    icon="phone"
                    value={formData.phone}
                    onChangeText={(value) => updateFormData('phone', value)}
                    keyboardType="phone-pad"
                    error={errors.phone}
                  />
                  <AnimatedInput
                    label="Senha"
                    icon="lock"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
                    isPassword
                    error={errors.password}
                  />
                  <AnimatedInput
                    label="Confirmar senha"
                    icon="lock-outline"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    isPassword
                    error={errors.confirmPassword}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <AnimatedButton
                    title="Criar Conta"
                    onPress={handleRegister}
                    loading={loading}
                    size="large"
                    icon="check"
                    style={styles.registerButton}
                  />
                </View>

                <TouchableOpacity 
                  style={styles.loginLink}
                  onPress={onNavigateToLogin}
                >
                  <Text style={styles.loginLinkText}>
                    Já tem uma conta? Faça login
                  </Text>
                </TouchableOpacity>
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
    top: height * 0.12,
    right: width * 0.08,
  },
  floatingElement2: {
    top: height * 0.35,
    left: width * 0.03,
  },
  floatingElement3: {
    top: height * 0.65,
    right: width * 0.12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  inputContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  registerButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginLink: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textDecorationLine: 'underline',
  },
}); 