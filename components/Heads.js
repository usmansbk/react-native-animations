import React, {useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

const source = {uri: 'https://i.pravatar.cc/300'};

export default function ChatHeads() {
  const [heads] = useState([
    {
      image: source,
      animation: new Animated.ValueXY(),
    },
    {
      image: source,
      animation: new Animated.ValueXY(),
    },
    {
      image: source,
      animation: new Animated.ValueXY(),
    },
    {
      image: source,
      animation: new Animated.ValueXY(),
    },
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () =>
        heads.forEach((head) => {
          head.animation.extractOffset();
          head.animation.stopAnimation();
        }),
      onPanResponderMove: (_, {dx, dy}) => {
        heads[0].animation.setValue({x: dx, y: dy});
        heads.slice(1).map(({animation}, index) => {
          return Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: {x: dx, y: dy},
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      {heads
        .slice(0)
        .reverse()
        .map(({image, animation}, index, items) => {
          const pan =
            index === items.length - 1 ? panResponder.panHandlers : {};
          return (
            <Animated.Image
              key={index}
              source={image}
              {...pan}
              style={[
                styles.head,
                {transform: animation.getTranslateTransform()},
              ]}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
