import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function Questionnaire() {
  const [index, setIndex] = useState(0);
  const [questions] = useState([
    'Do you tend to follow directions when given?',
    'Are you comfortable with the idea of standing and doing light physical activity most of the day?',
    'Would you enjoy making sure your customers leave happy?',
    'Are you willing to work nights and weekends (and possibly holidays)?',
  ]);

  const animation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const question = questions[index];
  let nextQuestion;
  if (index + 1 < questions.length) {
    nextQuestion = questions[index + 1];
  }

  const handleAnswer = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIndex((prevIndex) => prevIndex + 1);
      animation.setValue(0);
    });
  };
  const reset = () => {
    animation.setValue(0);
    progress.setValue(0);
    setIndex(0);
  };

  const nextQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
    extrapolate: 'clamp',
  });

  const mainQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
    extrapolate: 'clamp',
  });

  const progressInterpolate = progress.interpolate({
    inputRange: [0, questions.length],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const mainQuestionStyle = {
    transform: [
      {
        translateX: mainQuestionInterpolate,
      },
    ],
  };

  const nextQuestionStyle = {
    transform: [
      {
        translateX: nextQuestionInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={[styles.overlay, StyleSheet.absoluteFill]}>
        <Animated.Text style={[styles.questionText, mainQuestionStyle]}>
          {question}
        </Animated.Text>
        <Animated.Text style={[styles.questionText, nextQuestionStyle]}>
          {nextQuestion}
        </Animated.Text>
      </View>

      <View style={styles.progress}>
        <Animated.View
          style={[
            styles.bar,
            {
              width: progressInterpolate,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        onPress={handleAnswer}
        style={styles.option}
        activeOpacity={0.7}>
        <Text style={styles.optionText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleAnswer}
        style={[styles.option, styles.yes]}
        activeOpacity={0.7}>
        <Text style={styles.optionText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.close} onPress={reset}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E22D4B',
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  yes: {
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  optionText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 50,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
  },
  close: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: 'transparent',
  },
  closeText: {
    fontSize: 30,
    color: 'white',
  },
  progress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
  },
  bar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
