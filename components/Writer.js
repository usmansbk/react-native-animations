import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const WIDTH = width * 0.8;

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

  const toggleTransform = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 550,
      useNativeDriver: false,
    }).start(() => {
      isOpen ? textInputRef.current.blur() : textInputRef.current.focus();
      setOpen((prev) => !prev);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.editor,
            {
              width: animation.interpolate({
                inputRange: [0, 0.5],
                outputRange: [100, WIDTH],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <View style={styles.bar}>
            <Animated.ScrollView contentContainerStyle={styles.scrollView}>
              <Animated.View
                style={[
                  styles.toolbar,
                  {
                    opacity: animation.interpolate({
                      inputRange: [0, 0.5],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}>
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
            </Animated.ScrollView>

            <Animated.View
              pointerEvents={isOpen ? 'none' : 'auto'}
              style={[
                StyleSheet.absoluteFill,
                styles.center,
                {
                  opacity: animation.interpolate({
                    inputRange: [0, 0.5],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ]}>
              <TouchableWithoutFeedback onPress={toggleTransform}>
                <View>
                  <Text style={styles.buttonText}>Write</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
          <Animated.View
            style={[
              styles.textInputContainer,
              {
                height: animation.interpolate({
                  inputRange: [0.7, 1],
                  outputRange: [0, 150],
                  extrapolate: 'clamp',
                }),
              },
            ]}>
            <TextInput
              placeholder="Start writing..."
              multiline
              ref={textInputRef}
              style={styles.textInput}
            />
          </Animated.View>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          styles.center,
          {
            transform: [
              {
                scale: animation,
              },
            ],
          },
        ]}>
        <TouchableWithoutFeedback onPress={toggleTransform}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
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
  editor: {
    width: WIDTH,
  },
  scrollView: {
    flexGrow: 1,
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
  textInputContainer: {
    height: 150,
    elevation: 4,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  textInput: {
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    margin: 20,
    padding: 16,
    backgroundColor: '#2979FF',
  },
});
