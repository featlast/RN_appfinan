import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import {Colors} from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {setIdDelete} from '../redux/feature/modalSlice';

interface PropItemMovements {
  _id: string;
  userId: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  handleOpenModal: () => void;
}

const ItemMovements: React.FC<PropItemMovements> = ({
  amount,
  type,
  createdAt,
  _id,
  handleOpenModal,
}) => {
  const date = dayjs(createdAt).format('DD MMMM YYYY');
  const value = amount.toLocaleString('es-ES');
  const idDelete = useSelector<RootState, string>(state => state.modal.ID);

  const dispatch = useDispatch<AppDispatch>();
  const handleActionOnPress = React.useCallback(() => {
    handleOpenModal();
    dispatch(setIdDelete(_id));
  }, [_id, dispatch]);

  return (
    <View style={styles.containerItem}>
      <Text style={styles.txtTitle}>{date}</Text>
      <Text style={styles.txtTitle}>{type}</Text>
      <Text style={styles.txtTitle}>{value}</Text>
      <TouchableOpacity
        style={styles.touchableIconDelete}
        onPress={handleActionOnPress}>
        <Image
          source={require('../assets/image/delete.png')}
          style={styles.iconDelete}
          tintColor={Colors.orange}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemMovements;

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  txtTitle: {fontWeight: 'bold', flex: 1, textAlign: 'center'},
  touchableIconDelete: {position: 'absolute', right: 12},
  iconDelete: {width: 15, height: 15},
});
