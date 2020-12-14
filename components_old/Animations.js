import React, {useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 75,
    height: 75,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Animations() {
  const animation = useRef(new Animated.ValueXY(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => animation.extractOffset(),
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dy: animation.y,
          },
        ],
        {useNativeDriver: false},
      ),
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                scale: animation.y.interpolate({
                  inputRange: [0, height / 3],
                  outputRange: [0.1, 1],
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Text>Drag</Text>
      </Animated.View>
    </View>
  );
}
