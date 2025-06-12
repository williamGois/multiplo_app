import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface AnimatedToothIconProps {
  size?: number;
  color?: string;
  delay?: number;
}

export const AnimatedToothIcon: React.FC<AnimatedToothIconProps> = ({
  size = 24,
  color = '#FFFFFF',
  delay = 0,
}) => {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    const startAnimation = () => {
      // Animação de entrada com queda suave
      translateY.value = withSequence(
        withTiming(-20, { duration: 0 }),
        withTiming(0, {
          duration: 1200,
          easing: Easing.out(Easing.cubic),
        })
      );

      opacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.quad),
      });

      // Rotação sutil
      rotate.value = withSequence(
        withTiming(-5, { duration: 600 }),
        withTiming(5, { duration: 600 }),
        withTiming(0, { duration: 600 })
      );

      // Escala com bounce
      scale.value = withSequence(
        withTiming(1.1, {
          duration: 600,
          easing: Easing.out(Easing.back(1.5)),
        }),
        withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.quad),
        })
      );
    };

    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <MaterialIcons 
          name="medical-services" 
          size={size} 
          color={color} 
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 