import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Notifications() {
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState('');

  const handlePress = useCallback(() => {
    setNotification(value);
    setValue('');
  }, [value]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
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
});
