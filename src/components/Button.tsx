import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../theme/colors';

type ButtonTextProp = ReactNode | string;
interface PropsButton {
  onPress: () => void;
  text: ButtonTextProp;
  disable: boolean;
}

const Button: React.FC<PropsButton> = ({text = 'Button', onPress, disable}) => {
  return (
    <TouchableOpacity
      style={
        !disable
          ? styles.button
          : [styles.button, {backgroundColor: Colors.purple_light}]
      }
      onPress={onPress}
      disabled={disable}>
      <Text style={styles.titleButton}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 100,
    backgroundColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  titleButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
