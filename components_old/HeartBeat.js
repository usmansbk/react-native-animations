import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeartBeat() {
  const animation = useRef(new Animated.Value(0)).current;
  const [isLiked, setLiked] = useState(false);

  const beat = () => {
    setLiked((prev) => !prev);
    Animated.spring(animation, {
      toValue: 2,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={beat}>
        <Animated.View
          style={{
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [1, 0.8, 1],
                }),
              },
            ],
          }}>
          <Icon name={isLiked ? 'heart' : 'hearto'} size={40} color="red" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
