import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {TextInputState, addToken} from '../redux/feature/loginSlice';
import {useSignInMutation} from '../api/apiAuth';
import Toast from 'react-native-toast-message';
import {Colors} from '../theme/colors';
import {SignInRequest} from '../types/types';

type RootStackParamList = {
  ListsMovements: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [signIn, {isLoading, isError, error}] = useSignInMutation();

  const {email} = useSelector<RootState, TextInputState>(state => state.login);

  const handleSubmit = async () => {
    try {
      const requestBody: SignInRequest = {email};
      const response: string = await signIn(requestBody).unwrap();
      dispatch(addToken(response));
      Toast.show({
        type: 'success',
        text1: 'Bienvenid@',
        text2: 'Ikualo APP👋',
      });
      navigation.navigate('ListsMovements');
    } catch (err: any) {
      console.log('error al iniciar=>', err);
      Toast.show({
        type: 'error',
        text1: '⚠️ Error al iniciar sesión:',
        text2: `${JSON.stringify(error)} `,
      });
    }
  };
  return (
    <>
      <Image
        source={require('../assets/image/logo.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Input />
        <Button
          text={
            isLoading ? (
              <ActivityIndicator size={'small'} color={Colors.orange} />
            ) : (
              'Ingresar'
            )
          }
          onPress={handleSubmit}
          disable={email.trim() === ''}
        />
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    top: 20,
    alignSelf: 'center',
  },
});
