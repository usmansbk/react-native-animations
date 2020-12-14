import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadeAnim: {
    width: 250,
    height: 50,
    backgroundColor: 'powderblue',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});

const FadInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{...props.style, opacity: fadeAnim}}>
      {props.children}
    </Animated.View>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <FadInView style={styles.fadeAnim}>
        <Text style={styles.text}>Fading in</Text>
      </FadInView>
    </View>
  );
};
