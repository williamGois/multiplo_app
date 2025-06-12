import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SimpleToothIconProps {
  size?: number;
  color?: string;
}

export const SimpleToothIcon: React.FC<SimpleToothIconProps> = ({ 
  size = 60, 
  color = '#3B82F6'
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <MaterialIcons 
        name="medical-services" 
        size={size * 0.8} 
        color={color} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 