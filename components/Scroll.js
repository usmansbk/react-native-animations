import React from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Animations() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const scroll = React.useRef(null);
  let enabled = React.useRef(true);

  const handleToggle = () => {
    enabled.current = !enabled.current;
    let style = [styles.scroll];
    if (!enabled.current) {
      style.push(styles.hide);
    } else {
      style.push(styles.show);
    }

    scroll.current.setNativeProps({
      scrollEnabled: enabled.current,
      style,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle}>
        <Text>Toggle</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        ref={scroll}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={[
            styles.fakeContent,
            {
              backgroundColor: animation.interpolate({
                inputRange: [0, 3000],
                outputRange: ['rgb(255, 99, 71)', 'rgb(99, 71, 255)'],
              }),
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scroll: {
    flex: 1,
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  fakeContent: {
    height: 3000,
    backgroundColor: 'tomato',
  },
});
