import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {TextInputState, changeText} from '../redux/feature/loginSlice';

const Input = ({title = 'Email', icon = '', ...rest}) => {
  const dispatch = useDispatch<AppDispatch>();
  interface InputState {
    value: string;
    focus: boolean;
  }
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<InputState>({
    value: '',
    focus: false,
  });
  const {value, focus} = initialState;

  useEffect(() => {
    handleAnimated();
  }, [focus]);

  const handleAnimated = () => {
    Animated.timing(animation, {
      toValue: focus ? 1 : value === '' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatedValues = {
    animation: useRef(new Animated.Value(0)).current,
  };
  const {animation} = animatedValues;
  const animatedStyles = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -19],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const {email} = useSelector<RootState, TextInputState>(state => state.login);

  const handleChangeText = (text: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
    dispatch(changeText(text));
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        selectionColor={Colors.purple_light}
        autoCapitalize="none"
        value={email}
        onChangeText={text => handleChangeText(text)}
        onFocus={() => setInitialState({...initialState, focus: true})}
        onBlur={() => setInitialState({...initialState, focus: false})}
        keyboardType="email-address"
        {...rest}
      />
      {!isValidEmail && (
        <Text style={styles.emailInvalide}>Email inválido</Text>
      )}
      {icon && (
        <TouchableOpacity>
          <Text>Show</Text>
          <Icon name={icon} size={18} color={'orange'} />
        </TouchableOpacity>
      )}
      <Animated.View
        style={[styles.titleBox, animatedStyles]}
        pointerEvents={'none'}>
        <Animated.Text
          style={[
            styles.title,
            {
              color: focus || value ? Colors.blue_light : Colors.purple_light,
            },
          ]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: 55,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: Colors.purple,
    borderRadius: 8,
    marginBottom: 25,
    flexDirection: 'row',
  },
  input: {
    height: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    color: '#383838',
  },
  titleBox: {
    height: 'auto',
    width: 'auto',
    paddingHorizontal: 2,
    paddingVertical: 0.5,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6F37C6',
  },
  emailInvalide: {
    color: Colors.orange,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: -18,
    right: 0,
  },
});
