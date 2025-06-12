import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Patient } from '../types/Patient';

interface PatientCardProps {
  patient: Patient;
  onPress: (patient: Patient) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#4CAF50' : '#FF5722';
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(patient)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.patientInfo}>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.email}>{patient.email}</Text>
        </View>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(patient.status) }]} />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MaterialIcons name="phone" size={16} color="#666" />
          <Text style={styles.detailText}>{patient.phone}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="cake" size={16} color="#666" />
          <Text style={styles.detailText}>
            {calculateAge(patient.birthDate)} anos ({formatDate(patient.birthDate)})
          </Text>
        </View>

        {patient.lastAppointment && (
          <View style={styles.detailRow}>
            <MaterialIcons name="history" size={16} color="#666" />
            <Text style={styles.detailText}>
              Última consulta: {formatDate(patient.lastAppointment)}
            </Text>
          </View>
        )}

        {patient.nextAppointment && (
          <View style={styles.detailRow}>
            <MaterialIcons name="schedule" size={16} color="#2196F3" />
            <Text style={[styles.detailText, { color: '#2196F3' }]}>
              Próxima consulta: {formatDate(patient.nextAppointment)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  details: {
    paddingLeft: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
}); 