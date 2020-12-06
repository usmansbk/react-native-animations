import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

export default function InterruptedAnimation() {
  const animation = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 300,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start(({finished}) => {
      if (!finished) {
        setTimeout(() => {
          Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        }, 0);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View
          style={[
            styles.box,
            {
              opacity,
              transform: [{translateY: animation}],
            },
          ]}
        />
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
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
});
