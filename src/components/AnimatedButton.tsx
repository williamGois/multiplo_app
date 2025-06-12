import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotateZ = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
    
    // Efeito de rotação sutil
    rotateZ.value = withSpring(2, {}, () => {
      rotateZ.value = withSpring(0);
    });
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      runOnJS(onPress)();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotateZ.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  const getButtonColors = (): [string, string] => {
    switch (variant) {
      case 'primary':
        return ['#3B82F6', '#1D4ED8'];
      case 'secondary':
        return ['#10B981', '#059669'];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return ['#3B82F6', '#1D4ED8'];
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { height: 40, paddingHorizontal: 16 };
      case 'medium':
        return { height: 56, paddingHorizontal: 24 };
      case 'large':
        return { height: 64, paddingHorizontal: 32 };
      default:
        return { height: 56, paddingHorizontal: 24 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const colors = getButtonColors();
  const buttonSize = getButtonSize();
  const textSize = getTextSize();

  if (variant === 'outline') {
    return (
      <AnimatedTouchableOpacity
        style={[
          styles.button,
          styles.outlineButton,
          buttonSize,
          animatedStyle,
          disabled && styles.disabled,
          style,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={textSize + 2}
            color="#3B82F6"
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.text,
            styles.outlineText,
            { fontSize: textSize },
            textStyle,
          ]}
        >
          {loading ? 'Carregando...' : title}
        </Text>
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, disabled && styles.disabled]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={1}
    >
      <AnimatedLinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          styles.gradientButton,
          buttonSize,
          style,
        ]}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={textSize + 2}
            color="#FFFFFF"
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.text,
            styles.gradientText,
            { fontSize: textSize },
            textStyle,
          ]}
        >
          {loading ? 'Carregando...' : title}
        </Text>
      </AnimatedLinearGradient>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gradientButton: {
    // Estilos específicos para botão com gradiente
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  gradientText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#3B82F6',
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.5,
  },
}); 