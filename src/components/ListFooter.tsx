import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';

const ListFooter: React.FC = () => (
  <View style={styles.footerContainer}>
    <Text style={styles.footerText}>No hay mas Movimientos</Text>
  </View>
);

export default ListFooter;

const styles = StyleSheet.create({
  footerContainer: {
    padding: 10,
    backgroundColor: Colors.sand,
    width: '95%',
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
});
