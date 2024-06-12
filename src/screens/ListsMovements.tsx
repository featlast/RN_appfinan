import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetMovementsQuery} from '../api/apiFinance';
import {getToken} from '../utils/authUtils';
import {Colors} from '../theme/colors';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const ListsMovements = () => {
  const {data, isLoading, error, isSuccess} = useGetMovementsQuery();
  console.log('DATA MOVEMENTS=>', JSON.stringify(data, null, 2));
  const email = useSelector<RootState, string>(state => state.login.email);

  return (
    <View style={{flex: 1}}>
      {isLoading && <ActivityIndicator size={'large'} color={Colors.orange} />}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/image/profile.png')}
          style={{width: 100, height: 100, borderRadius: 50, top: 20}}
        />
        <Text
          style={{
            color: Colors.purple,
            fontSize: 17,
            fontWeight: 'semibold',
            marginTop: 18,
          }}>
          {email}
        </Text>
      </View>
    </View>
  );
};

export default ListsMovements;

const styles = StyleSheet.create({});
