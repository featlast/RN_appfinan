import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  useAddMovementsMutation,
  useGetBalanceQuery,
  useGetMovementsQuery,
} from '../api/apiFinance';
import {Colors} from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import Header from '../components/Header';
import Button from '../components/Button';
import ItemMovements from '../components/ItemMovements';
import {ListHeader} from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import Footer from '../components/Footer';
import ModalCustom from '../components/ModalCustom';
import {openModal, openModalMovements} from '../redux/feature/modalSlice';
import Toast from 'react-native-toast-message';
import ModalAddMovement from '../components/ModalAddMovement';

const ListsMovements = () => {
  const {
    data: balance,
    isLoading: loadingBalance,
    isError,
    status,
    currentData,
  } = useGetBalanceQuery();

  const {data: movements, isLoading} = useGetMovementsQuery();
  const email = useSelector<RootState, string>(state => state.login.email);
  const imageProfileUser = require('../assets/image/profile.png');
  const logoFooter = require('../assets/image/logo.webp');

  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector<RootState, boolean>(
    state => state.modal.isOpen,
  );
  const isModalOpenMovements = useSelector<RootState, boolean>(
    state => state.modal.isOpenMovements,
  );
  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const handleOpenModalMovements = () => {
    dispatch(openModalMovements());
  };

  console.log('SALDO=>', useGetBalanceQuery());

  //@ts-ignore
  const currentSalty = balance?.toLocaleString('es-ES');

  return (
    <View style={styles.containerScreen}>
      <Header user={email} imageProfileUser={imageProfileUser} />
      {isLoading && <ActivityIndicator size={'large'} color={Colors.orange} />}
      <View style={styles.containerCapital}>
        <Text style={styles.txtCapitalTitle}>Capital Actual</Text>
        <Text style={[styles.txtCapitalTitle, {fontSize: 14}]}>
          $ {currentSalty}
        </Text>
      </View>
      <View style={styles.containerBtn}>
        {movements ? (
          <Text style={styles.txtMovements}>Mis Movimientos</Text>
        ) : (
          <Text style={styles.txtMovements}>No hay Movimientos</Text>
        )}
        <Button title="Añadir" onPress={handleOpenModalMovements} />
      </View>
      {isModalOpen && <ModalCustom />}
      {isModalOpenMovements && <ModalAddMovement />}
      {}
      {movements && (
        <FlatList
          data={movements}
          renderItem={({item}) => (
            <ItemMovements {...item} handleOpenModal={handleOpenModal} />
          )}
          keyExtractor={item => item._id}
          ListHeaderComponent={ListHeader}
          stickyHeaderIndices={[0]}
          ListFooterComponent={ListFooter}
          contentContainerStyle={styles.contentContainerFlatlist}
        />
      )}
      <Footer imageProfileUser={logoFooter} />
    </View>
  );
};

export default ListsMovements;

const styles = StyleSheet.create({
  containerScreen: {flex: 1},
  containerCapital: {alignItems: 'flex-end', paddingRight: 10, paddingTop: 10},
  txtCapitalTitle: {fontWeight: 'bold', fontSize: 17, color: Colors.dark_gray},
  txtMovements: {fontWeight: 'bold', fontSize: 20, color: Colors.dark_gray},
  containerBtn: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerFlatlist: {
    paddingBottom: 70,
  },
});
