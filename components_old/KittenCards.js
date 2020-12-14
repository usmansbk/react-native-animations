import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

function clamp(value, a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

const {width} = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

export default function KittenCards() {
  const [items, setItems] = useState([
    {
      image: 'https://images.pexels.com/photos/982865/pexels-photo-982865.jpeg',
      id: 1,
      text: 'Sweet Cat',
    },
    {
      image: 'https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg',
      id: 2,
      text: 'Sweeter Cat',
    },
    {
      image:
        'https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg',
      id: 3,
      text: 'Sweetest Cat',
    },
    {
      image:
        'https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg',
      id: 4,
      text: 'Awww',
    },
  ]);
  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const next = useRef(new Animated.Value(0.9)).current;

  const transitionNext = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(next, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setItems((currentItems) => currentItems.slice(1));
      next.setValue(0.9);
      opacity.setValue(1);
      animation.setValue({x: 0, y: 0});
    });
  };

  const handleNo = () => {
    Animated.timing(animation.x, {
      toValue: -SWIPE_THRESHOLD,
      useNativeDriver: false,
    }).start(transitionNext);
  };
  const handleYes = () => {
    Animated.timing(animation.x, {
      toValue: SWIPE_THRESHOLD,
      useNativeDriver: false,
    }).start(transitionNext);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: animation.x,
            dy: animation.y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (_, {dx, vx, vy}) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(animation, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98,
            useNativeDriver: false,
          }).start(transitionNext);
        } else {
          Animated.spring(animation, {
            toValue: 0,
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const rotate = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const imageOpacity = animation.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const animatedCardStyles = {
    transform: [{rotate}, ...animation.getTranslateTransform()],
    opacity,
  };

  const animatedImagetyles = {
    opacity: imageOpacity,
  };

  const yesOpacity = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const yesScale = animation.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });
  const animatedYupStyles = {
    transform: [{scale: yesScale}, {rotate: '-30deg'}],
    opacity: yesOpacity,
  };

  const noOpacity = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const noScale = animation.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const animatedNopeStyles = {
    transform: [{scale: noScale}, {rotate: '30deg'}],
    opacity: noOpacity,
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {items
          .slice(0, 2)
          .reverse()
          .map(({id, image, text}, index, cards) => {
            const isLastItem = index === cards.length - 1;
            const isSecondToLast = index === cards.length - 2;

            const panHandlers = isLastItem ? panResponder.panHandlers : {};

            const imageStyle = isLastItem ? animatedImagetyles : undefined;
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: next}]}
              : undefined;

            return (
              <Animated.View
                key={id}
                style={[styles.card, cardStyle, nextStyle]}
                {...panHandlers}>
                <Animated.Image
                  source={{uri: image}}
                  style={[styles.image, imageStyle]}
                />
                <View style={styles.lowerText}>
                  <Text>{text}</Text>
                </View>

                {isLastItem && (
                  <>
                    <Animated.View style={[styles.nope, animatedNopeStyles]}>
                      <Text style={styles.nopeText}>Nope!</Text>
                    </Animated.View>
                    <Animated.View style={[styles.yup, animatedYupStyles]}>
                      <Text style={styles.yupText}>Yup!</Text>
                    </Animated.View>
                  </>
                )}
              </Animated.View>
            );
          })}
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity style={styles.button} onPress={handleNo}>
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleYes}>
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 4,
  },
  lowerText: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  image: {
    width: null,
    height: null,
    borderRadius: 2,
    flex: 3,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: '#fff',
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: '#fff',
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
});
