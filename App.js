import React from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import constants from './constants';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <ScrollView style={styles.content}>
        <View style={styles.image}>
          <Image source={{uri: constants.AVATAR}} style={styles.img} />
        </View>
        <View>
          <Text style={styles.name}>Usman Suleiman</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'lightskyblue',
  },
  content: {
    flexGrow: 1,
  },
  image: {
    height: PROFILE_IMAGE_MAX_HEIGHT,
    width: PROFILE_IMAGE_MAX_HEIGHT,
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
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
});
