import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import constants from './constants';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function App() {
  const name = 'Usman Suleiman';
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 4,
    ],
    extrapolate: 'clamp',
  });
  const headerZIndex = scrollY.interpolate({
    inputRange: [HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            zIndex: headerZIndex, // ios
            elevation: headerZIndex, // android
          },
        ]}>
        <Animated.View
          style={[styles.headerTitle, {bottom: headerTitleBottom}]}>
          <Text style={styles.title}>{name}</Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={styles.content}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={[
            styles.image,
            {
              height: profileImageHeight,
              width: profileImageHeight,
              marginTop: profileImageMarginTop,
            },
          ]}>
          <Image source={{uri: constants.AVATAR}} style={styles.img} />
        </Animated.View>
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.body} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  image: {
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 10,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 10,
  },
  body: {
    height: Dimensions.get('window').height,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    position: 'absolute',
  },
});
