import React from 'react';
import {Text, View, Animated, Modal, StyleSheet, TextInput} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {closeModalMovements} from '../redux/feature/modalSlice';
import useModalAnimation from './useModalAnimation';
import Button from './Button';
import {Colors} from '../theme/colors';
import {
  useAddMovementsMutation,
  useAddWithdrawMutation,
} from '../api/apiFinance';
import Toast from 'react-native-toast-message';

const ModalAddMovement = () => {
  const [addMovement, {isLoading: loagindMovement}] = useAddMovementsMutation();
  const [addWithdraw] = useAddWithdrawMutation();
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector<RootState, boolean>(
    state => state.modal.isOpenMovements,
  );
  const scaleValue = useModalAnimation(isModalOpen);

  const handleCloseModal = () => {
    dispatch(closeModalMovements());
  };

  const handleChangeText = (text: string) => {
    const textValidate = text.trim();
    if (textValidate !== '' && !isNaN(Number(textValidate))) {
      setValue(text);
    }
  };

  const handleSubmitAmountDeposit = async () => {
    const _amount = Number(value);
    console.log('first', _amount);
    try {
      await addMovement({amount: _amount}).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Valor Agregado',
        text2: 'Ikualo APP👋',
      });
      handleCloseModal();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error Al Agregar Movimiento',
        //@ts-ignore
        text2: `${JSON.stringify(error.data.message)}`,
      });
      handleCloseModal();
    }
  };

  const handleSubmitAmountWidthDraw = async () => {
    const _amount = Number(value);
    console.log('first', _amount);
    try {
      await addWithdraw({amount: _amount}).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Valor Retirado',
        text2: 'Ikualo APP👋',
      });
      handleCloseModal();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Error Al Agregar Movimiento',
        //@ts-ignore
        text2: `${JSON.stringify(error.data.message)}`,
      });
      handleCloseModal();
    }
  };

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
            <Text style={styles.txtEliminar}>Añadir Movimiento</Text>
            <View style={[styles.containerButton, {marginTop: 15}]}>
              <Button
                title="Ingreso"
                onPress={handleSubmitAmountDeposit}
                style={styles.bgColorBtnDeposit}
              />
              <Button
                title="Egreso"
                onPress={handleSubmitAmountWidthDraw}
                style={styles.bgColorBtnWithdraw}
              />
            </View>
            <TextInput
              placeholder="Ingresa Valor"
              keyboardType="number-pad"
              onChangeText={text => handleChangeText(text)}
            />
          </View>
          <View>
            <View style={styles.containerButton}>
              <Button
                title="Cerrar"
                onPress={handleCloseModal}
                style={styles.bgColorBtn}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalAddMovement;

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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    backgroundColor: Colors.blue_light,
  },
  bgColorBtnWithdraw: {
    backgroundColor: Colors.orange,
  },
  bgColorBtnDeposit: {
    backgroundColor: Colors.green,
  },
});
