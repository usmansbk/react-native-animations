import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

export default function Notifications() {
  const notificationRef = useRef(null);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState('');

  const handlePress = useCallback(() => {
    setNotification(value);
    setValue('');
  }, [value]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="tomato" />
      <Animated.View ref={notificationRef} style={[styles.notification]}>
        <Text style={styles.notificationText}>{notification}</Text>
      </Animated.View>
      <View>
        <TextInput
          autoFocus
          placeholder="Type your message"
          style={styles.input}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Show Notification</Text>
          </View>
        </TouchableOpacity>
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
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  notification: {
    position: 'absolute',
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: 'tomato',
  },
  notificationText: {
    color: 'white',
  },
});
