import React, {useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function PhotoGrid() {
  const animation = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.ValueXY()).current;

  const gridImages = useRef({}).current;

  const [activeImage] = useState(null);
  const [activeIndex] = useState(null);

  const handleOpenImage = (index) => {};

  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {images.map((uri, index) => {
            const style = index === activeIndex ? activeIndexStyle : undefined;
            return (
              <TouchableWithoutFeedback key={index} onPress={handleOpenImage}>
                <Animated.Image
                  source={{uri}}
                  ref={(ref) => (gridImages[index] = ref)}
                  resizeMode="cover"
                  style={[styles.gridImage, style]}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: width / 3,
    height: 150,
  },
});

const images = [
  'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80',
  'https://images.unsplash.com/photo-1498579687545-d5a4fffb0a9e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1542648748-bbeaf3cec462?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80',
  'https://images.unsplash.com/photo-1536427824649-fbf2e4a33d40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1582571008577-a556106ed94b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1503431760783-91f2569f6802?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1502899845910-573a1d1c390d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1267&q=80',
  'https://images.unsplash.com/photo-1521904179978-3bb04b1ec20a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c21hbGx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1465768210703-d6986e3c1728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1473244228373-94e7e7fd250f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1491958501121-458097ef59ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
  'https://images.unsplash.com/photo-1450820900803-38abb1b52bbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80',
  'https://images.unsplash.com/photo-1541704328070-20bf4601ae3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fHNtYWxsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1543227183-81311967c5af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1281&q=80',
  'https://images.unsplash.com/photo-1534362604146-14dd4c30a622?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
  'https://images.unsplash.com/photo-1518265612847-134e6599e7e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
  'https://images.unsplash.com/photo-1542359498-13ebad248020?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1473773386757-42bbe7288351?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1289&q=80',
];
