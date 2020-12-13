import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height} = Dimensions.get('window');
const MAX_HEIGHT = height * 0.4;
const HEIGHT = height * 0.2;

const IconButton = ({name}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={name} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default function Writer() {
  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.bar]}>
          <View style={styles.toolbar}>
            <IconButton name="format-bold" />
            <IconButton name="format-underline" />
            <IconButton name="format-italic" />
            <IconButton name="format-list-bulleted" />
            <IconButton name="format-list-numbered" />
          </View>

          <View style={styles.toolbar}>
            <IconButton name="insert-link" />
            <IconButton name="insert-photo" />
            <IconButton name="format-bold" />
            <TouchableOpacity style={styles.squareButton}>
              <Icon name="keyboard-arrow-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline
            placeholder="Start writing..."
            style={styles.textInput}
            maxHeight={MAX_HEIGHT}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2979FF',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 4,
  },
  squareButton: {
    backgroundColor: '#2f6acc',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  textInputContainer: {
    minHeight: HEIGHT,
    backgroundColor: 'white',
    padding: 16,
    elevation: 4,
  },
  textInput: {
    fontSize: 16,
  },
});
