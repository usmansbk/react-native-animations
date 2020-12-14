import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function ColorPicker() {
  const inputRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const [color, setColor] = useState('#000');
  const [inputOpen, setInputOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start(() => setOpen((prev) => !prev));
  };
  const toggleInput = () => {
    const toValue = inputOpen ? 0 : 1;
    Animated.timing(buttonAnimation, {
      toValue,
      useNativeDriver: false,
      duration: 350,
    }).start(() => {
      setInputOpen((prev) => !prev);
      !inputOpen ? inputRef.current.focus() : inputRef.current.blur();
    });
  };

  const colorStyle = {
    backgroundColor: color,
  };

  const scaleXInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0],
  });

  const rowStyle = {
    opacity: animation,
    transform: [
      {
        translateY: translateYInterpolate,
      },
      {
        scaleX: scaleXInterpolate,
      },
      {
        scaleY: animation,
      },
    ],
  };

  const moveInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0],
  });

  const buttonStyle = {
    transform: [
      {
        translateX: moveInterpolate,
      },
      {
        scale: buttonAnimation,
      },
    ],
  };

  const colorRowInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.01],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const colorRowStyles = {
    opacity: colorRowInterpolate,
  };

  const inputOpacityInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const inputStyle = {
    opacity: inputOpacityInterpolate,
  };

  const iconTranslate = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const opacityIconInterpolate = buttonAnimation.interpolate({
    inputRange: [0, 0.2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const iconStyle = {
    opacity: opacityIconInterpolate,
    transform: [
      {
        translateX: iconTranslate,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[rowStyle, styles.rowWrap]}>
        <TouchableWithoutFeedback onPress={toggleInput}>
          <Animated.View style={[styles.colorBall, colorStyle]} />
        </TouchableWithoutFeedback>

        <View style={styles.row}>
          <TouchableOpacity>
            <AnimatedIcon
              name="bold"
              size={30}
              color="#555"
              style={[iconStyle]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="italic"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="align-center"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AnimatedIcon
              name="link"
              size={30}
              color="#555"
              style={iconStyle}
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.colorRowWrap,
              colorRowStyles,
            ]}
            pointerEvents={inputOpen ? 'auto' : 'none'}>
            <AnimatedTextInput
              value={color}
              style={[styles.input, inputStyle]}
              ref={inputRef}
              onChangeText={(newColor) => setColor(newColor)}
            />
            <TouchableWithoutFeedback onPress={toggleInput}>
              <Animated.View style={[styles.okayButton, buttonStyle]}>
                <Text style={styles.okayText}>OK</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </Animated.View>
      <TouchableOpacity onPress={handleToggle} style={[styles.button]}>
        <Text>Toggle Open/Closed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '50%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colorRowWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  okayButton: {
    borderRadius: 20,
    height: '100%',
    width: 40,
    backgroundColor: '#309EEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okayText: {
    color: 'white',
  },
  button: {
    marginTop: 50,
  },
});
