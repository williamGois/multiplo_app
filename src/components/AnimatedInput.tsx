import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface AnimatedInputProps extends TextInputProps {
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  isPassword?: boolean;
  error?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  icon,
  isPassword = false,
  error,
  value,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const focusAnimation = useSharedValue(0);
  const labelAnimation = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnimation.value = withSpring(1);
    labelAnimation.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnimation.value = withSpring(0);
    if (!value) {
      labelAnimation.value = withTiming(0, { duration: 200 });
    }
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnimation.value,
      [0, 1],
      [error ? '#EF4444' : '#E5E7EB', error ? '#EF4444' : '#3B82F6']
    );

    return {
      borderColor,
      borderWidth: withTiming(focusAnimation.value === 1 ? 2 : 1),
      shadowOpacity: withTiming(focusAnimation.value * 0.1),
      transform: [
        {
          scale: withSpring(focusAnimation.value === 1 ? 1.02 : 1),
        },
      ],
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            labelAnimation.value === 1 || value ? -12 : 8
          ),
        },
        {
          scale: withTiming(
            labelAnimation.value === 1 || value ? 0.85 : 1
          ),
        },
      ],
      color: interpolateColor(
        focusAnimation.value,
        [0, 1],
        [error ? '#EF4444' : '#6B7280', error ? '#EF4444' : '#3B82F6']
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, containerAnimatedStyle]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={24}
            color={isFocused ? '#3B82F6' : '#6B7280'}
            style={styles.icon}
          />
        )}
        
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.label, labelAnimatedStyle]}>
            {label}
          </Animated.Text>
          
          <TextInput
            ref={inputRef}
            style={[styles.input, { paddingLeft: icon ? 0 : 16 }]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isPassword && !showPassword}
            {...props}
          />
        </View>

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && (
        <Animated.View
          entering={() => 'fadeInUp'}
          style={styles.errorContainer}
        >
          <MaterialIcons name="error-outline" size={16} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    color: '#1F2937',
    paddingTop: 16,
    paddingBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'Poppins_400Regular',
  },
}); 