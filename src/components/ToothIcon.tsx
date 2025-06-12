import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

interface ToothIconProps {
  size?: number;
  color?: string;
  animate?: boolean;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const ToothIcon: React.FC<ToothIconProps> = ({ 
  size = 60, 
  color = '#3B82F6', 
  animate = true 
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (animate) {
      // Animação de pulsação
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Animação de rotação sutil
      rotation.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Animação de brilho
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedSvg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={animatedStyle}
      >
        <Path
          d="M50 10 C35 10, 25 20, 25 35 C25 45, 30 55, 35 65 C40 75, 45 85, 50 90 C55 85, 60 75, 65 65 C70 55, 75 45, 75 35 C75 20, 65 10, 50 10 Z"
          fill={color}
          stroke="#ffffff"
          strokeWidth="2"
        />
        {/* Detalhes do dente */}
        <Path
          d="M45 25 C45 20, 50 20, 55 25 C55 30, 50 30, 45 25 Z"
          fill="#ffffff"
          opacity="0.3"
        />
        <Path
          d="M40 40 C40 35, 45 35, 50 40 C50 45, 45 45, 40 40 Z"
          fill="#ffffff"
          opacity="0.2"
        />
        <Path
          d="M55 40 C55 35, 60 35, 60 40 C60 45, 55 45, 55 40 Z"
          fill="#ffffff"
          opacity="0.2"
        />
      </AnimatedSvg>
    </View>
  );
}; 