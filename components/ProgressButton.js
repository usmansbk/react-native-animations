import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function ProgressButton() {
  const animation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    animation.setValue(0);
    opacity.setValue(1);

    Animated.sequence([
      Animated.timing(animation, {
        duration: 1500,
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(71,255,99)', 'rgb(99,71,255)'],
    extrapolate: 'clamp',
  });

  const progressStyle = {
    width: progressInterpolate,
    // bottom: 0,
    // height: progressInterpolate,
    // right: 0,
    top: null,
    bottom: 0,
    height: 5,
    opacity,
    // backgroundColor: colorInterpolate,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.button}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={[styles.progress, progressStyle, styles.opacityBackground]}
            />
          </View>
          <Text style={styles.buttonText}>Get it!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#E6537D',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  opacityBackground: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
});
