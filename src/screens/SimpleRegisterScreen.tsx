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
  Modal,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { SimpleToothIcon } from '../components/SimpleToothIcon';
import { FloatingTeethBackground } from '../components/FloatingTeethBackground';
import { SimpleInput } from '../components/SimpleInput';
import { AnimatedButton } from '../components/AnimatedButton';

const { width, height } = Dimensions.get('window');

interface SimpleRegisterScreenProps {
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

export const SimpleRegisterScreen: React.FC<SimpleRegisterScreenProps> = ({
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
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const updateFormData = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    
    // Simular registro
    setTimeout(() => {
      setLoading(false);
      onRegister(formData);
    }, 1500);
  };

  const PolicyModal = () => (
    <Modal
      visible={showPolicyModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Política de Privacidade</Text>
          <TouchableOpacity 
            onPress={() => setShowPolicyModal(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <Text style={styles.policyText}>
            <Text style={styles.policyTitle}>1. COLETA DE INFORMAÇÕES{'\n'}</Text>
            Coletamos informações que você nos fornece diretamente, como nome, email, telefone e dados da clínica para prestação de nossos serviços.{'\n\n'}
            
            <Text style={styles.policyTitle}>2. USO DAS INFORMAÇÕES{'\n'}</Text>
            Utilizamos suas informações para fornecer, manter e melhorar nossos serviços de gestão odontológica, incluindo agendamentos e controle de pacientes.{'\n\n'}
            
            <Text style={styles.policyTitle}>3. COMPARTILHAMENTO{'\n'}</Text>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestação do serviço.{'\n\n'}
            
            <Text style={styles.policyTitle}>4. SEGURANÇA{'\n'}</Text>
            Implementamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração ou destruição.{'\n\n'}
            
            <Text style={styles.policyTitle}>5. SEUS DIREITOS{'\n'}</Text>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento entrando em contato conosco.{'\n\n'}
            
            <Text style={styles.policyTitle}>6. CONTATO{'\n'}</Text>
            Para dúvidas sobre esta política, entre em contato: contato@multiplosorriso.com.br{'\n\n'}
            
            <Text style={styles.policyFooter}>Última atualização: Janeiro 2024</Text>
          </Text>
        </ScrollView>
        
        <View style={styles.modalFooter}>
          <AnimatedButton
            title="Entendi"
            onPress={() => setShowPolicyModal(false)}
            style={styles.modalButton}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );

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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header com logo */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <SimpleToothIcon size={45} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Cadastre sua clínica no sistema</Text>
          </View>

          {/* Card de cadastro */}
          <View style={styles.registerCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dados da Clínica</Text>
              <Text style={styles.cardSubtitle}>
                Preencha as informações para criar sua conta
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                <SimpleInput
                  label="Nome completo"
                  icon="person"
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  placeholder="Digite seu nome completo"
                />
                <SimpleInput
                  label="Email"
                  icon="email"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Digite seu email"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dados da Clínica</Text>
                <SimpleInput
                  label="Nome da clínica"
                  icon="business"
                  value={formData.clinicName}
                  onChangeText={(value) => updateFormData('clinicName', value)}
                  placeholder="Digite o nome da clínica"
                />
                <SimpleInput
                  label="Telefone"
                  icon="phone"
                  value={formData.phone}
                  onChangeText={(value) => updateFormData('phone', value)}
                  keyboardType="phone-pad"
                  placeholder="Digite o telefone"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Segurança</Text>
                <SimpleInput
                  label="Senha"
                  icon="lock"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  isPassword
                  placeholder="Digite sua senha"
                />
                <SimpleInput
                  label="Confirmar senha"
                  icon="lock-outline"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  isPassword
                  placeholder="Confirme sua senha"
                />
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  Ao criar uma conta, você concorda com nossos{' '}
                  <TouchableOpacity onPress={() => setShowPolicyModal(true)}>
                    <Text style={styles.termsLink}>Termos de Uso</Text>
                  </TouchableOpacity> e{' '}
                  <TouchableOpacity onPress={() => setShowPolicyModal(true)}>
                    <Text style={styles.termsLink}>Política de Privacidade</Text>
                  </TouchableOpacity>.
                </Text>
              </View>

              <AnimatedButton
                title="Criar Conta"
                onPress={handleRegister}
                loading={loading}
                style={styles.registerButton}
              />

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity 
                style={styles.loginLink}
                onPress={onNavigateToLogin}
              >
                <Text style={styles.loginLinkText}>
                  Já tem uma conta? <Text style={styles.loginLinkBold}>Faça login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2024 Múltiplo Sorriso. Todos os direitos reservados.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <PolicyModal />
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
    paddingTop: 25,
    paddingBottom: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 28,
    paddingTop: 10,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '400',
  },
  registerCard: {
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
    padding: 20,
    paddingBottom: 14,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    padding: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  termsContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#3b82f6',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  registerButton: {
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
    marginBottom: 16,
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
  loginLink: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    color: '#64748b',
    fontSize: 15,
    textAlign: 'center',
  },
  loginLinkBold: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  policyText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  policyTitle: {
    fontWeight: '600',
    color: '#1e293b',
  },
  policyFooter: {
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 10,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  modalButton: {
    backgroundColor: '#3b82f6',
  },
}); 