import React, {useRef} from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
  box2: {
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
  },
});

export default function Animations() {
  const anim = useRef(new Animated.Value(1)).current;
  const onPress = () =>
    Animated.timing(anim, {
      toValue: anim._value === 2 ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box2]} />
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{scaleY: anim}],
              // height: anim,
            },
          ]}>
          <Text style={styles.text}>Hello World Lorem Ipsum Dolor Amet</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
