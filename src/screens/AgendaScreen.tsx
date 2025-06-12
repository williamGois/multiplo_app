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

const { width } = Dimensions.get('window');

interface AgendaScreenProps {
  onBack: () => void;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  treatment: string;
  dentist: string;
}

interface DayData {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  appointments: Appointment[];
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weekDays, setWeekDays] = useState<DayData[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Maria Silva',
      time: '08:00',
      duration: 60,
      status: 'completed',
      treatment: 'Limpeza',
      dentist: 'Dr. João Silva',
    },
    {
      id: '2',
      patientName: 'Pedro Santos',
      time: '09:30',
      duration: 90,
      status: 'in_progress',
      treatment: 'Canal',
      dentist: 'Dr. João Silva',
    },
    {
      id: '3',
      patientName: 'Ana Costa',
      time: '11:00',
      duration: 45,
      status: 'confirmed',
      treatment: 'Consulta',
      dentist: 'Dr. João Silva',
    },
    {
      id: '4',
      patientName: 'Carlos Lima',
      time: '14:00',
      duration: 120,
      status: 'scheduled',
      treatment: 'Implante',
      dentist: 'Dr. João Silva',
    },
    {
      id: '5',
      patientName: 'Lucia Oliveira',
      time: '16:30',
      duration: 60,
      status: 'scheduled',
      treatment: 'Ortodontia',
      dentist: 'Dr. João Silva',
    },
  ];

  const timeSlots = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setCurrentWeekStart(startOfWeek);
    generateWeekDays(startOfWeek);

    return () => clearInterval(timer);
  }, []);

  const generateWeekDays = (weekStart: Date) => {
    const today = new Date();
    const days: DayData[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      
      days.push({
        date,
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        appointments: date.toDateString() === today.toDateString() ? mockAppointments : [],
      });
    }
    
    setWeekDays(days);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = new Date(currentWeekStart);
    if (direction === 'prev') {
      newWeekStart.setDate(currentWeekStart.getDate() - 7);
    } else {
      newWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
    setCurrentWeekStart(newWeekStart);
    generateWeekDays(newWeekStart);
  };

  const goToToday = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setCurrentWeekStart(startOfWeek);
    generateWeekDays(startOfWeek);
    setSelectedDate(today);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in_progress': return '#3B82F6';
      case 'confirmed': return '#F59E0B';
      case 'scheduled': return '#6B7280';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Finalizado';
      case 'in_progress': return 'Em Andamento';
      case 'confirmed': return 'Confirmado';
      case 'scheduled': return 'Agendado';
      case 'cancelled': return 'Cancelado';
      default: return 'Agendado';
    }
  };

  const getCurrentTimePosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    const startTime = 7 * 60;
    const endTime = 19 * 60;
    
    if (currentTimeInMinutes < startTime || currentTimeInMinutes > endTime) {
      return -1;
    }
    
    const totalMinutes = endTime - startTime;
    const elapsedMinutes = currentTimeInMinutes - startTime;
    const percentage = (elapsedMinutes / totalMinutes) * 100;
    
    return percentage;
  };

  const selectedDayData = weekDays.find(day => 
    day.date.toDateString() === selectedDate.toDateString()
  ) || weekDays.find(day => day.isToday);

  const currentTimePosition = getCurrentTimePosition();

  const formatWeekRange = () => {
    const startDate = weekDays[0]?.date;
    const endDate = weekDays[6]?.date;
    
    if (!startDate || !endDate) return '';
    
    const startMonth = startDate.toLocaleDateString('pt-BR', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('pt-BR', { month: 'short' });
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startDate.getDate()} - ${endDate.getDate()} ${startMonth} ${year}`;
    } else {
      return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth} ${year}`;
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agenda</Text>
          <TouchableOpacity style={styles.addButton}>
            <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.weekNavigation}>
            <TouchableOpacity style={styles.navButton} onPress={() => navigateWeek('prev')}>
              <MaterialCommunityIcons name="chevron-left" size={24} color="#3B82F6" />
            </TouchableOpacity>
            
            <View style={styles.weekInfo}>
              <Text style={styles.weekRange}>{formatWeekRange()}</Text>
              <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
                <Text style={styles.todayButtonText}>Hoje</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.navButton} onPress={() => navigateWeek('next')}>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#3B82F6" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.daysContainer}
            contentContainerStyle={styles.daysContent}
          >
            {weekDays.map((day, index) => {
              const isSelected = selectedDate.toDateString() === day.date.toDateString();
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    day.isToday && styles.todayDayButton,
                    isSelected && styles.selectedDayButton,
                  ]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text style={[
                    styles.dayName,
                    day.isToday && !isSelected && styles.todayDayText,
                    isSelected && styles.selectedDayText,
                  ]}>
                    {day.dayName}
                  </Text>
                  <Text style={[
                    styles.dayNumber,
                    day.isToday && !isSelected && styles.todayDayText,
                    isSelected && styles.selectedDayText,
                  ]}>
                    {day.dayNumber}
                  </Text>
                  {day.appointments.length > 0 && (
                    <View style={styles.appointmentIndicator}>
                      <Text style={styles.appointmentCount}>{day.appointments.length}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.agendaContainer}>
            <View style={styles.timelineContainer}>
              <ScrollView style={styles.timelineScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.timeline}>
                  {currentTimePosition >= 0 && selectedDayData?.isToday && (
                    <View 
                      style={[
                        styles.currentTimeLine,
                        { top: `${currentTimePosition}%` }
                      ]}
                    >
                      <View style={styles.currentTimeIndicator} />
                      <View style={styles.currentTimeLineBar} />
                      <Text style={styles.currentTimeText}>
                        {currentTime.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </View>
                  )}

                  {timeSlots.map((time, index) => {
                    const appointment = selectedDayData?.appointments.find(apt => apt.time === time);
                    
                    return (
                      <View key={index} style={styles.timeSlot}>
                        <View style={styles.timeColumn}>
                          <Text style={styles.timeText}>{time}</Text>
                        </View>
                        
                        <View style={styles.appointmentColumn}>
                          {appointment ? (
                            <TouchableOpacity style={styles.appointmentCard}>
                              <LinearGradient
                                colors={[getStatusColor(appointment.status), '#FFFFFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.appointmentGradient}
                              >
                                <View style={styles.appointmentContent}>
                                  <View style={styles.appointmentHeader}>
                                    <Text style={styles.patientName}>{appointment.patientName}</Text>
                                    <View style={[
                                      styles.statusBadge,
                                      { backgroundColor: getStatusColor(appointment.status) }
                                    ]}>
                                      <Text style={styles.statusText}>
                                        {getStatusText(appointment.status)}
                                      </Text>
                                    </View>
                                  </View>
                                  
                                  <Text style={styles.treatmentText}>{appointment.treatment}</Text>
                                  <Text style={styles.durationText}>
                                    {appointment.duration} min • {appointment.dentist}
                                  </Text>
                                </View>
                              </LinearGradient>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity style={styles.emptySlot}>
                              <MaterialCommunityIcons name="plus" size={16} color="#9CA3AF" />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
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
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  navButton: {
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 8,
  },
  weekInfo: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  weekRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  todayButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  todayButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  daysContainer: {
    maxHeight: 100,
  },
  daysContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    minWidth: 60,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  todayDayButton: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  selectedDayButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  dayName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  todayDayText: {
    color: '#3B82F6',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  appointmentIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  agendaContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineContainer: {
    flex: 1,
    position: 'relative',
  },
  timelineScroll: {
    flex: 1,
  },
  timeline: {
    position: 'relative',
    paddingBottom: 20,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  currentTimeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  currentTimeLineBar: {
    flex: 1,
    height: 2,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  currentTimeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EF4444',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeSlot: {
    flexDirection: 'row',
    minHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  appointmentColumn: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 4,
  },
  appointmentCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentGradient: {
    padding: 16,
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  treatmentText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptySlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    borderStyle: 'dashed',
    minHeight: 60,
  },
});