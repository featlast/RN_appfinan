import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../theme/colors';

export const ListHeader: React.FC = () => (
  <View style={styles.containerList}>
    <Text style={styles.txtTitle}>Fecha</Text>
    <Text style={styles.txtTitle}>Tipo</Text>
    <Text style={styles.txtTitle}>Valor</Text>
  </View>
);

const styles = StyleSheet.create({
  containerList: {
    backgroundColor: Colors.sand,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  txtTitle: {fontWeight: 'bold', color: Colors.white},
});
