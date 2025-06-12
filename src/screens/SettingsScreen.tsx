import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
  onOpenScheduleConfig?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onLogout, onOpenScheduleConfig }) => {
  const [userSettings, setUserSettings] = useState({
    name: 'Dr. João Silva',
    email: 'joao.silva@multiplossorriso.com',
    role: 'dentista' as 'paciente' | 'dentista' | 'administrador',
    clinic: 'Múltiplo Sorriso',
    notifications: true,
    darkMode: false,
    biometric: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  const toggleSetting = (key: string) => {
    setUserSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'administrador': return '#EF4444';
      case 'dentista': return '#3B82F6';
      case 'paciente': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'administrador': return 'shield-crown';
      case 'dentista': return 'doctor';
      case 'paciente': return 'account';
      default: return 'account';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1E40AF" 
        translucent={false}
      />
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD']}
        locations={[0, 0.3, 0.6, 1]}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Configurações</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[getRoleColor(userSettings.role), '#FFFFFF']}
                  style={styles.avatar}
                >
                  <MaterialCommunityIcons 
                    name={getRoleIcon(userSettings.role)} 
                    size={40} 
                    color="#FFFFFF" 
                  />
                </LinearGradient>
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(userSettings.role) }]}>
                  <Text style={styles.roleBadgeText}>
                    {userSettings.role.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userSettings.name}</Text>
                <Text style={styles.profileEmail}>{userSettings.email}</Text>
                <Text style={styles.profileClinic}>{userSettings.clinic}</Text>
              </View>
            </View>

            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionItem} disabled>
                <View style={styles.optionLeft}>
                  <View style={styles.optionIcon}>
                    <MaterialCommunityIcons name="bell" size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>Notificações</Text>
                    <Text style={styles.optionSubtitle}>Receber alertas e lembretes</Text>
                  </View>
                </View>
                <Switch
                  value={userSettings.notifications}
                  onValueChange={() => toggleSetting('notifications')}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={userSettings.notifications ? '#FFFFFF' : '#F3F4F6'}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionItem} disabled>
                <View style={styles.optionLeft}>
                  <View style={styles.optionIcon}>
                    <MaterialCommunityIcons name="fingerprint" size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>Autenticação Biométrica</Text>
                    <Text style={styles.optionSubtitle}>Usar impressão digital ou Face ID</Text>
                  </View>
                </View>
                <Switch
                  value={userSettings.biometric}
                  onValueChange={() => toggleSetting('biometric')}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={userSettings.biometric ? '#FFFFFF' : '#F3F4F6'}
                />
              </TouchableOpacity>

              {userSettings.role === 'dentista' && (
                <>
                  <TouchableOpacity style={styles.optionItem} onPress={onOpenScheduleConfig}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="calendar-edit" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Minha Agenda</Text>
                        <Text style={styles.optionSubtitle}>Configurar horários de atendimento</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="tooth" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Procedimentos</Text>
                        <Text style={styles.optionSubtitle}>Gerenciar tipos de tratamento</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                </>
              )}

              {userSettings.role === 'administrador' && (
                <>
                  <TouchableOpacity style={styles.optionItem}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="account-group" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Gerenciar Usuários</Text>
                        <Text style={styles.optionSubtitle}>Adicionar e remover usuários</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="cog" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Configurações da Clínica</Text>
                        <Text style={styles.optionSubtitle}>Horários, cadeiras e configurações gerais</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                </>
              )}

              {userSettings.role === 'paciente' && (
                <>
                  <TouchableOpacity style={styles.optionItem}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="account-edit" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Meus Dados</Text>
                        <Text style={styles.optionSubtitle}>Atualizar informações pessoais</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionItem}>
                    <View style={styles.optionLeft}>
                      <View style={styles.optionIcon}>
                        <MaterialCommunityIcons name="history" size={24} color="#3B82F6" />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Histórico Médico</Text>
                        <Text style={styles.optionSubtitle}>Visualizar consultas anteriores</Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.dangerZone}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
                <Text style={styles.logoutText}>Sair da Conta</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Múltiplo Sorriso v1.0.0</Text>
              <Text style={styles.footerSubtext}>© 2024 Todos os direitos reservados</Text>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E40AF',
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 48,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
    right: '35%',
  },
  roleBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  profileClinic: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  optionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  dangerZone: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
}); 