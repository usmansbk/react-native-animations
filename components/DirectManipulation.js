import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = (props) => {
  const _root = useRef(null);

  const setNativeProps = (nativeProps) => {
    _root.current.setNativeProps(nativeProps);
  };
  return (
    <View style={{marginTop: 50}} ref={_root} {...props}>
      <Text>{props.label}</Text>
    </View>
  );
};

export default () => {
  return (
    <TouchableOpacity>
      <MyButton label="Press me!" />
    </TouchableOpacity>
  );
};
