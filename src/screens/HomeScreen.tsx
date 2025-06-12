import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { FloatingTeethBackground } from '../components/FloatingTeethBackground';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  onLogout: () => void;
  onNavigate?: (screen: string) => void;
}

interface UserData {
  name: string;
  role: 'paciente' | 'dentista' | 'administrador';
  clinic: string;
  todayAppointments: number;
  totalPatients: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout, onNavigate }) => {
  const [userData] = useState<UserData>({
    name: 'Dr. João Silva',
    role: 'dentista',
    clinic: 'Múltiplo Sorriso',
    todayAppointments: 8,
    totalPatients: 156,
  });

  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    slideAnim.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const handleSettingsPress = () => {
    onNavigate?.('settings');
  };

  const handleAgendaPress = () => {
    onNavigate?.('agenda');
  };

  const handlePatientsPress = () => {
    onNavigate?.('patients');
  };

  const handleTreatmentsPress = () => {
    onNavigate?.('treatments');
  };

  const handleReportsPress = () => {
    onNavigate?.('reports');
  };

  const renderRoleBasedContent = () => {
    switch (userData.role) {
      case 'dentista':
        return (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="account-group" size={32} color="#3B82F6" />
                <Text style={styles.statNumber}>{userData.totalPatients}</Text>
                <Text style={styles.statLabel}>Pacientes</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="calendar-today" size={32} color="#10B981" />
                <Text style={styles.statNumber}>{userData.todayAppointments}</Text>
                <Text style={styles.statLabel}>Consultas Hoje</Text>
              </View>
            </View>

            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleAgendaPress}>
                <View style={[styles.actionButtonContent, styles.agendaButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="calendar-clock" size={24} color="#3B82F6" />
                  </View>
                  <Text style={styles.actionButtonText}>Agenda</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handlePatientsPress}>
                <View style={[styles.actionButtonContent, styles.patientsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="account-multiple" size={24} color="#10B981" />
                  </View>
                  <Text style={styles.actionButtonText}>Pacientes</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleTreatmentsPress}>
                <View style={[styles.actionButtonContent, styles.treatmentsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="tooth" size={24} color="#8B5CF6" />
                  </View>
                  <Text style={styles.actionButtonText}>Procedimentos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleReportsPress}>
                <View style={[styles.actionButtonContent, styles.reportsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="chart-line" size={24} color="#F59E0B" />
                  </View>
                  <Text style={styles.actionButtonText}>Relatórios</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      case 'paciente':
        return (
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAgendaPress}>
              <View style={[styles.actionButtonContent, styles.agendaButton]}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="calendar-check" size={24} color="#3B82F6" />
                </View>
                <Text style={styles.actionButtonText}>Consultas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionButtonContent, styles.patientsButton]}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="file-document" size={24} color="#10B981" />
                </View>
                <Text style={styles.actionButtonText}>Histórico</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'administrador':
        return (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="account-group" size={32} color="#3B82F6" />
                <Text style={styles.statNumber}>{userData.totalPatients}</Text>
                <Text style={styles.statLabel}>Pacientes</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="calendar-today" size={32} color="#10B981" />
                <Text style={styles.statNumber}>{userData.todayAppointments}</Text>
                <Text style={styles.statLabel}>Consultas Hoje</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialCommunityIcons name="doctor" size={32} color="#8B5CF6" />
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Dentistas</Text>
              </View>
            </View>

            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={handleAgendaPress}>
                <View style={[styles.actionButtonContent, styles.agendaButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="calendar-clock" size={24} color="#3B82F6" />
                  </View>
                  <Text style={styles.actionButtonText}>Agenda</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handlePatientsPress}>
                <View style={[styles.actionButtonContent, styles.patientsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="account-multiple" size={24} color="#10B981" />
                  </View>
                  <Text style={styles.actionButtonText}>Pacientes</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={[styles.actionButtonContent, styles.treatmentsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="account-tie" size={24} color="#8B5CF6" />
                  </View>
                  <Text style={styles.actionButtonText}>Equipe</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleReportsPress}>
                <View style={[styles.actionButtonContent, styles.reportsButton]}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="chart-line" size={24} color="#F59E0B" />
                  </View>
                  <Text style={styles.actionButtonText}>Relatórios</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
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
        <FloatingTeethBackground />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.content, animatedStyle]}>
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Text style={styles.welcomeText}>Bem-vindo,</Text>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userRole}>
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} - {userData.clinic}
                </Text>
              </View>
              <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
                <MaterialCommunityIcons name="cog" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {renderRoleBasedContent()}

            <View style={styles.recentActivity}>
              <Text style={styles.sectionTitle}>Atividade Recente</Text>
              <View style={styles.activityCard}>
                <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                <Text style={styles.activityText}>Consulta com Maria Silva finalizada</Text>
                <Text style={styles.activityTime}>há 30 min</Text>
              </View>
              <View style={styles.activityCard}>
                <MaterialCommunityIcons name="calendar-plus" size={20} color="#3B82F6" />
                <Text style={styles.activityText}>Nova consulta agendada para amanhã</Text>
                <Text style={styles.activityTime}>há 1 hora</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    marginLeft: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    width: (width - 52) / 2,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonContent: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  agendaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  patientsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  treatmentsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  reportsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  iconContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  recentActivity: {
    marginTop: 20,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 12,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
}); 