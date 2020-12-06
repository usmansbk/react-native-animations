import React, {useRef} from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function Corners() {
  const animation = useRef(new Animated.ValueXY()).current;
  let _dimensions = useRef([]);
  const startAnimation = () => {
    const [_width, _height] = _dimensions.current;
    Animated.sequence([
      Animated.spring(animation.y, {
        toValue: height - _height,
        useNativeDriver: true,
      }),
      Animated.spring(animation.x, {
        toValue: width - _width,
        useNativeDriver: true,
      }),
      Animated.spring(animation.y, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(animation.x, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const saveDimensions = (e) => {
    const _height = e.nativeEvent.layout.height;
    const _width = e.nativeEvent.layout.width;
    _dimensions.current = [_width, _height];
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={startAnimation}
        onLayout={saveDimensions}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: animation.getTranslateTransform(),
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
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
