import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const backgroundSource = {
  uri: 'https://images.pexels.com/photos/5914065/pexels-photo-5914065.jpeg',
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = (animation) => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
    extrapolate: 'clamp',
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};

export default function Form() {
  const emailRef = useRef(null);

  const email = useRef(new Animated.Value(0)).current;
  const password = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;

  const emailStyle = createAnimationStyle(email);
  const passwordStyle = createAnimationStyle(password);
  const buttonStyle = createAnimationStyle(button);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(email, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(password, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(button, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      emailRef.current.focus();
    });
  }, [button, email, password]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundSource}
        style={[styles.container, styles.imageBackground]}>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={styles.inputs}>
            <Text style={styles.title}>Login</Text>
            <AnimatedTextInput
              ref={emailRef}
              placeholder="Email"
              keyboardType="email-address"
              style={[styles.input, emailStyle]}
            />
            <AnimatedTextInput
              placeholder="Password"
              secureTextEntry
              style={[styles.input, passwordStyle]}
            />
            <TouchableOpacity>
              <Animated.View style={[styles.button, buttonStyle]}>
                <Text style={styles.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputs: {
    padding: 10,
  },
});
