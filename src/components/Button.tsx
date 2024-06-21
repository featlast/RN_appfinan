import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, ButtonProps} from 'react-native';
import {Colors} from '../theme/colors';

type ButtonTextProp = ReactNode | string;

export interface ButtonStyle {
  backgroundColor: string;
}
interface PropsButton extends Omit<ButtonProps, 'style'> {
  onPress: () => void;
  title: ButtonTextProp;
  disable?: boolean;
  style?: ButtonStyle;
}

const Button: React.FC<PropsButton> = ({
  title = 'Button',
  onPress,
  disable,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={
        !disable
          ? [styles.button, style]
          : [styles.button, {backgroundColor: Colors.purple_light}]
      }
      onPress={onPress}
      disabled={disable}
      {...rest}>
      <Text style={styles.titleButton}>{title}</Text>
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
