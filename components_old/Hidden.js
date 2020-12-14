import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

export default function HiddenAnimation() {
  const [visible, setVisible] = React.useState(true);
  const animation = React.useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start(({finished}) => {
      setTimeout(() => {
        if (finished) {
          setVisible(false);
        } else {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        }
      }, 0);
    });
  };

  return (
    <View style={styles.container}>
      {visible && (
        <TouchableWithoutFeedback onPress={startAnimation}>
          <Animated.View
            style={[
              styles.box,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [500, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}
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
