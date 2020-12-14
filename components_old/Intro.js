import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const image2InputRange = [0, width, width * 2];
const image3InputRange = [width, width * 2, width * 3];

export default function Intro() {
  const animation = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        pagingEnabled
        horizontal
        snapToInterval={width}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <View style={styles.content}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={images.image1}
              style={styles.image1}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image2}
              style={[
                styles.image2,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, width],
                        outputRange: [0, -100],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image3}
              style={[styles.image3]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenText}>
            <Text style={styles.text}>Screen 1</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={images.image1}
              style={styles.image1}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image2}
              style={[
                styles.image2,
                {
                  opacity: animation.interpolate({
                    inputRange: image2InputRange,
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                  }),
                  transform: [
                    {
                      translateY: animation.interpolate({
                        inputRange: image2InputRange,
                        outputRange: [100, 0, -100],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image3}
              style={[styles.image3]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenText}>
            <Text style={styles.text}>Screen 2</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.screenHeader}>
            <Animated.Image
              source={images.image1}
              style={[
                styles.image1,
                {
                  transform: [
                    {
                      scale: animation.interpolate({
                        inputRange: image3InputRange,
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image2}
              style={[
                styles.image2,
                {
                  transform: [
                    {
                      scale: animation.interpolate({
                        inputRange: image3InputRange,
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      rotate: animation.interpolate({
                        inputRange: image3InputRange,
                        outputRange: ['-180deg', '0deg', '180deg'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={images.image3}
              style={[styles.image3]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.screenText}>
            <Text style={styles.text}>Screen 3</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenText: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    width,
    height,
    backgroundColor: '#F89E20',
  },
  image1: {
    width: PixelRatio.getPixelSizeForLayoutSize(75),
    height: PixelRatio.getPixelSizeForLayoutSize(63),
  },
  image2: {
    width: PixelRatio.getPixelSizeForLayoutSize(46),
    height: PixelRatio.getPixelSizeForLayoutSize(28),
    position: 'absolute',
    top: 200,
    left: 60,
  },
  image3: {
    width: PixelRatio.getPixelSizeForLayoutSize(23),
    height: PixelRatio.getPixelSizeForLayoutSize(17),
    position: 'absolute',
    top: 150,
    left: 60,
  },
});

const images = {
  image1: require('./imgs/c1.png'),
  image2: require('./imgs/c2.png'),
  image3: require('./imgs/c3.png'),
};
