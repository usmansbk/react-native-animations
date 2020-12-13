import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const IconButton = ({name, size = 30, squared}) => {
  const SIZE = squared ? size - 10 : size;
  const borderRadius = squared ? 2 : SIZE / 2;
  const backgroundColor = squared ? '#2a6cdb' : 'transparent';
  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        {
          width: SIZE,
          height: SIZE,
          borderRadius,
          backgroundColor,
        },
      ]}>
      <Icon name={name} size={size / 2} color="white" />
    </TouchableOpacity>
  );
};

export default function Writer() {
  const animation = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View style={styles.editor}>
          <View style={styles.bar}>
            <Animated.View style={[styles.toolbar]}>
              <IconButton name="format-bold" />
              <IconButton name="format-underline" />
              <IconButton name="format-italic" />
              <IconButton name="format-list-bulleted" />
              <IconButton name="format-list-numbered" />
              <View style={styles.right}>
                <IconButton name="insert-link" />
                <IconButton name="insert-photo" />
                <IconButton name="keyboard-arrow-down" squared />
              </View>
            </Animated.View>
          </View>
          <Animated.View style={[styles.textInputContainer]}>
            <TextInput
              placeholder="Start writing..."
              multiline
              ref={textInputRef}
              style={styles.textInput}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    height: 50,
    backgroundColor: '#2979FF',
    justifyContent: 'center',
  },
  toolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 4,
  },
  editor: {
    width: width * 0.8,
  },
  textInputContainer: {
    height: 150,
    elevation: 4,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  textInput: {
    fontSize: 20,
  },
});
