import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleInput } from '../components/SimpleInput';
import { SimpleButton } from '../components/SimpleButton';

interface ScheduleConfigScreenProps {
  onBack: () => void;
}

interface DayConfig {
  day: string;
  open: string;
  close: string;
  duration: string;
  hasLunch: boolean;
  lunchStart: string;
  lunchEnd: string;
}

export const ScheduleConfigScreen: React.FC<ScheduleConfigScreenProps> = ({ onBack }) => {
  const initialSchedule: DayConfig[] = [
    { day: 'Segunda', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
    { day: 'Terça', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
    { day: 'Quarta', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
    { day: 'Quinta', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
    { day: 'Sexta', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
    { day: 'Sábado', open: '', close: '', duration: '30', hasLunch: false, lunchStart: '', lunchEnd: '' },
  ];

  const [schedule, setSchedule] = useState<DayConfig[]>(initialSchedule);

  const updateDay = (index: number, field: keyof DayConfig, value: string | boolean) => {
    setSchedule(prev => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
  };

  const handleSave = () => {
    console.log(schedule);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      <LinearGradient colors={['#1E40AF', '#3B82F6', '#60A5FA']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configurar Horários</Text>
          <View style={{ width: 48 }} />
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {schedule.map((day, index) => (
            <View key={day.day} style={styles.dayCard}>
              <Text style={styles.dayTitle}>{day.day}</Text>
              <SimpleInput
                label="Horário Inicial"
                value={day.open}
                onChangeText={v => updateDay(index, 'open', v)}
                placeholder="08:00"
              />
              <SimpleInput
                label="Horário Final"
                value={day.close}
                onChangeText={v => updateDay(index, 'close', v)}
                placeholder="17:00"
              />
              <SimpleInput
                label="Tempo padrão (min)"
                value={day.duration}
                onChangeText={v => updateDay(index, 'duration', v)}
                keyboardType="numeric"
                placeholder="30"
              />
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Intervalo de almoço</Text>
                <Switch
                  value={day.hasLunch}
                  onValueChange={v => updateDay(index, 'hasLunch', v)}
                  trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                  thumbColor={day.hasLunch ? '#FFFFFF' : '#F3F4F6'}
                />
              </View>
              {day.hasLunch && (
                <>
                  <SimpleInput
                    label="Início do almoço"
                    value={day.lunchStart}
                    onChangeText={v => updateDay(index, 'lunchStart', v)}
                    placeholder="12:00"
                  />
                  <SimpleInput
                    label="Fim do almoço"
                    value={day.lunchEnd}
                    onChangeText={v => updateDay(index, 'lunchEnd', v)}
                    placeholder="13:00"
                  />
                </>
              )}
            </View>
          ))}
          <SimpleButton title="Salvar" onPress={handleSave} style={styles.saveButton} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E40AF' },
  background: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 12,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  dayCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  switchLabel: { fontSize: 16, color: '#374151' },
  saveButton: { marginTop: 16 },
});

