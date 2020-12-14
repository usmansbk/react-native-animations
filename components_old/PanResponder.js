import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Text,
} from 'react-native';

export default () => {
  const bgContainer = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('container onStartShouldSetPanResponder');
        return true;
      },
      onPanResponderTerminationRequest: () => {
        console.log('container onPanResponderTerminationRequest');
        return true;
      },
      onStartShouldSetPanResponderCapture: () => {
        console.log('container onStartShouldSetPanResponderCapture');
        return true;
      },
    }),
  ).current;
  const box = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('box1 onStartShouldSetPanResponder');
        return true;
      },
      onPanResponderTerminationRequest: () => {
        console.log('box1 onPanResponderTerminationRequest');
        return true;
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...bgContainer.panHandlers}>
      <View style={styles.box1} {...box.panHandlers}>
        <TouchableOpacity style={styles.button}>
          <Text>Inner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
  },
  box1: {
    height: 150,
    width: 150,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: 'green',
  },
});
