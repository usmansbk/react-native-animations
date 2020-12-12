import React, {useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const source = {
  uri: 'https://i.pravatar.cc/300',
};

const images = new Array(20).fill(source);

export default function PhotoGrid() {
  const [activeImage] = useState(null);
  const [activeIndex] = useState(null);
  const imageRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.ValueXY()).current;
  const gridImages = useRef({}).current;

  const handleOpenImage = () => {};

  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {images.map((src, index) => {
            const style = index === activeIndex ? activeIndexStyle : undefined;
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleOpenImage(index)}>
                <Animated.Image
                  source={src}
                  style={[styles.gridImage, style]}
                  ref={(ref) => (gridImages[index] = ref)}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={activeImage ? 'auto' : 'none'}>
        <View style={styles.topContent} ref={imageRef}>
          <Animated.Image
            key={activeImage}
            source={activeImage}
            style={[styles.viewImage, activeIndexStyle]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: '33%',
    height: 150,
  },
});
