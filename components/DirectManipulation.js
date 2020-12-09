import React, {useRef} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  PanResponder,
  TextInput,
} from 'react-native';

class AdhocTouchableOpacity extends React.Component {
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.setOpacityTo(0.5);
    },
    onPanResponderRelease: () => {
      this.setOpacityTo(1);
      this.props?.onPress();
    },
  });

  setOpacityTo(value) {
    this.CHILD_REF.setNativeProps({
      opacity: value,
    });
  }

  render() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={(childRef) => (this.CHILD_REF = childRef)}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default () => {
  const textInput = useRef(null);
  return (
    <View style={styles.container}>
      <TextInput
        ref={textInput}
        style={styles.textInput}
        placeholder="Enter your text"
      />
      <AdhocTouchableOpacity
        onPress={() => textInput.current.setNativeProps({text: ''})}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Clear text</Text>
        </View>
      </AdhocTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    margin: 4,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    width: 250,
    paddingHorizontal: 8,
  },
});
