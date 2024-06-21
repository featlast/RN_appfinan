import React from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {closeModal} from '../redux/feature/modalSlice';
import useModalAnimation from './useModalAnimation';
import Button from './Button';
import {Colors} from '../theme/colors';
import {useDeleteMovementsMutation} from '../api/apiFinance';
import Toast from 'react-native-toast-message';

const ModalCustom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector<RootState, boolean>(
    state => state.modal.isOpen,
  );
  const idDelete = useSelector<RootState, string>(state => state.modal.ID);
  const scaleValue = useModalAnimation(isModalOpen);
  const [deletePost] = useDeleteMovementsMutation();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const handleDelete = React.useCallback(async () => {
    try {
      await deletePost(idDelete).unwrap();
      dispatch(closeModal());
      Toast.show({
        type: 'success',
        text1: 'Movimiento Borrado',
        text2: 'Correctamente 👍',
      });
    } catch (err) {
      dispatch(closeModal());
      Toast.show({
        type: 'error',
        text1: 'Error Al Eliminar',
        text2: '⚠️',
      });
    }
  }, [deletePost, idDelete]);

  return (
    <Modal
      transparent
      visible={isModalOpen}
      animationType="fade"
      hardwareAccelerated>
      <View style={styles.containerModalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          <View style={styles.containerHeader}>
            <Text style={styles.txtEliminar}>
              ¿Quieres eliminar el movimiento?
            </Text>
            {/* <TouchableOpacity onPress={handleCloseModal}>
              <Text>X</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.containerInputs}>
            <View style={styles.containerButton}>
              <Button
                title="Eliminar"
                onPress={handleDelete}
                style={styles.bgColorBtn}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  containerModalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 20,
  },
  containerHeader: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    position: 'absolute',
    marginTop: -25,
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    color: 'black',
    paddingBottom: 5,
  },
  containerInputs: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1.5,
    width: '99%',
    height: 50,
    marginBottom: 5,
    borderRadius: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  containerButton: {
    width: '99%',
  },
  textClose: {
    color: 'darkgrey',
  },
  txtEliminar: {
    textAlign: 'center',
    color: Colors.dark_gray,
    fontSize: 15,
    fontWeight: 'bold',
  },
  bgColorBtn: {
    backgroundColor: Colors.orange,
  },
});
