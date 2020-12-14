import React from 'react';
import {
  PanResponder,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const ZONE_HEIGHT = height * 0.1;

export default function PanResponderTest() {
  const [zone, setZone] = React.useState('Still Touchable');
  const onPress = React.useCallback(
    () => setZone('I got touched with a parent pan responder'),
    [],
  );

  const getDirectionAndColor = ({moveX, moveY, dx, dy}) => {
    const draggedDown = dy > 30;
    const draggedUp = dy < -30;
    const draggedLeft = dx < -30;
    const draggedRight = dx > 30;
    const isRed =
      moveY < ZONE_HEIGHT && moveY > 0 && moveX > 0 && moveX < width;
    const isBlue = moveY > height - ZONE_HEIGHT && moveX > 0 && moveX < width;
    let dragDirection = '';

    if (draggedDown || draggedUp) {
      if (draggedDown) {
        dragDirection += 'dragged down ';
      }
      if (draggedUp) {
        dragDirection += 'dragged up ';
      }
    }

    if (draggedLeft || draggedRight) {
      if (draggedLeft) {
        dragDirection += 'dragged left ';
      }
      if (draggedRight) {
        dragDirection += 'dragged right ';
      }
    }

    if (isRed) {
      return `red ${dragDirection}`;
    }
    if (isBlue) {
      return `blue ${dragDirection}`;
    }
    if (dragDirection) {
      return dragDirection;
    }
  };

  const pandResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gestureState) =>
        !!getDirectionAndColor(gestureState),
      onPanResponderMove: (_evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        setZone(drag);
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...pandResponder.panHandlers}>
      <View style={styles.zone1} />
      <View style={styles.center}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>{zone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.zone2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  zone1: {
    backgroundColor: 'red',
    height: ZONE_HEIGHT,
  },
  zone2: {
    backgroundColor: 'blue',
    height: ZONE_HEIGHT,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
