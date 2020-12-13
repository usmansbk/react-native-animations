import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Fab() {
  const animation = useRef(new Animated.Value(0)).current;
  const open = useRef(0);

  const toggleOpen = () => {
    Animated.timing(animation, {
      toValue: open.current,
      duration: 200,
      useNativeDriver: false,
    }).start();
    open.current = open.current === 1 ? 0 : 1;
  };

  const reloadInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });
  const orderInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  const reloadStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: reloadInterpolate,
      },
    ],
  };

  const orderStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: orderInterpolate,
      },
    ],
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, bgStyle]} />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, orderStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Order
          </Animated.Text>
          <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, reloadStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            Reload
          </Animated.Text>
          <Icon name="reload" size={20} color="#555" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
          <Animated.Text style={[styles.label, labelStyle]}>Pay</Animated.Text>
          <Text style={styles.payText}>$5.00</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  pay: {
    backgroundColor: '#00b15e',
  },
  payText: {
    color: 'white',
  },
  label: {
    color: 'white',
    position: 'absolute',
    fontSize: 18,
  },
  other: {
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30,
  },
});
