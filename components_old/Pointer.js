import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

export default function PointerEvents() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = React.useState(true);
  const _pressed = React.useRef(false);

  const handlePress = () => {
    const toValue = _pressed.current ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      useNativeDriver: false,
    }).start();
    _pressed.current = !_pressed.current;
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View
            style={[
              styles.box,
              {
                backgroundColor: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['rgb(255, 99, 71)', 'rgb(99, 71, 255)'],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[StyleSheet.absoluteFill, styles.cover]}
          pointerEvents={toggle ? 'none' : 'auto'}
        />
      </View>

      <TouchableOpacity onPress={handleToggle}>
        <View>
          <Text>Toggle Pointer Events</Text>
        </View>
      </TouchableOpacity>
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
    width: 100,
    height: 100,
  },
  cover: {
    backgroundColor: 'transparent',
  },
});
