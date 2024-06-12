import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './routes/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Splash from './components/Splash';
import Toast from 'react-native-toast-message';

const App = () => {
  Splash();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
