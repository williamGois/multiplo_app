import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Configurações para os dentinhos flutuantes
const NUM_TEETH = 12;
const TEETH_POSITIONS = Array.from({ length: NUM_TEETH }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.floor(Math.random() * 12) + 16,
  rotationStart: Math.random() * 360,
  delayMultiplier: Math.random() * 2,
  durationMultiplier: 0.8 + Math.random() * 0.8,
  scaleStart: 0.7 + Math.random() * 0.6,
}));

export const FloatingTeethBackground: React.FC = () => {
  // Valores animados para cada dente
  const floatingTeeth = Array.from({ length: NUM_TEETH }, () => ({
    translate: useSharedValue(0),
    rotate: useSharedValue(0),
    scale: useSharedValue(1),
  }));

  useEffect(() => {
    // Iniciar animações para cada dente
    floatingTeeth.forEach((tooth, index) => {
      const config = TEETH_POSITIONS[index];
      
      // Animação de flutuação para cima e para baixo
      tooth.translate.value = withDelay(
        config.delayMultiplier * 1000,
        withRepeat(
          withTiming(1, { 
            duration: 5000 * config.durationMultiplier,
            easing: Easing.inOut(Easing.sin)
          }),
          -1,
          true
        )
      );
      
      // Animação de rotação
      tooth.rotate.value = withDelay(
        config.delayMultiplier * 500,
        withRepeat(
          withTiming(1, { 
            duration: 12000 * config.durationMultiplier,
            easing: Easing.linear
          }),
          -1,
          false
        )
      );
      
      // Animação de escala (aumentar e diminuir)
      tooth.scale.value = withDelay(
        config.delayMultiplier * 1200,
        withRepeat(
          withTiming(1, { 
            duration: 8000 * config.durationMultiplier,
            easing: Easing.inOut(Easing.quad)
          }),
          -1,
          true
        )
      );
    });
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {TEETH_POSITIONS.map((config, index) => {
        const tooth = floatingTeeth[index];
        
        // Estilo animado para cada dente
        const animatedStyle = useAnimatedStyle(() => {
          const translateY = -20 - tooth.translate.value * 30;
          const rotate = config.rotationStart + tooth.rotate.value * 360;
          const scale = config.scaleStart + tooth.scale.value * 0.2;
          
          return {
            transform: [
              { translateY },
              { rotate: `${rotate}deg` },
              { scale }
            ],
          };
        });
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.tooth,
              {
                left: config.x,
                top: config.y,
              },
              animatedStyle,
            ]}
          >
            <MaterialCommunityIcons
              name="tooth-outline"
              size={config.size}
              color="rgba(255, 255, 255, 0.25)"
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    paddingTop: 70, // Adicionando espaço para não bloquear a StatusBar e a parte superior
  },
  tooth: {
    position: 'absolute',
  },
}); 