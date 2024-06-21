import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';

interface HeaderProps {
  user?: string;
  imageProfileUser: ImageSourcePropType;
}

const Header: React.FC<HeaderProps> = ({user, imageProfileUser}) => {
  return (
    <View style={styles.containerHeader}>
      <Image source={imageProfileUser} style={styles.imageProfile} />
      <Text style={styles.textProfile}>{user}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    height: 80,
    width: '95%',
    backgroundColor: Colors.purple,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  imageProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    top: 10,
  },
  textProfile: {padding: 5, fontWeight: 'semibold', color: 'white'},
});
