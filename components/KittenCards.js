import React from 'react';
import {View, StyleSheet, PanResponder, Animated, Text} from 'react-native';

const images = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Sweet Cat',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/33492/cat-red-cute-mackerel.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Sweeter Cat',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/982299/pexels-photo-982299.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    text: 'Sweetest Cat',
  },
];

const SWIPE_THRESHOLD = 120;

function clamp() {}
export default function KittenCards() {
  const animation = React.useRef(new Animated.ValueXY()).current;
  const nextAnimation = React.useRef(new Animated.Value(0.9)).current;

  const panResponder = React.useRef(
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
      onPanResponderRelease: (evt, {dx, vx, vy}) => {
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
          });
        } else {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const animatedCardStyles = {
    transform: [
      {
        rotate: animation.x.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: ['-30deg', '0deg', '30deg'],
          extrapolate: 'clamp',
        }),
      },
      ...animation.getTranslateTransform(),
    ],
  };

  const animatedImageStyles = {
    opacity: animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        {images
          .slice(0, 2)
          .reverse()
          .map(({image, id, text}, index, items) => {
            const isLastItem = index === items.length - 1;
            const isSecondToLast = index === items.length - 2;

            const panHandlers = isLastItem ? panResponder.panHandlers : {};
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const imageStyle = isLastItem ? animatedImageStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: nextAnimation}]}
              : undefined;

            return (
              <Animated.View
                key={id}
                style={[styles.card, cardStyle, nextStyle]}
                {...panHandlers}>
                <Animated.Image
                  source={{uri: image}}
                  resizeMode="cover"
                  style={[styles.image, imageStyle]}
                />
                <View style={styles.footer}>
                  <Text>{text}</Text>
                </View>
              </Animated.View>
            );
          })}
      </View>
      <View style={styles.buttonBar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  image: {
    width: null,
    height: null,
    flex: 3,
    borderRadius: 2,
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
});
