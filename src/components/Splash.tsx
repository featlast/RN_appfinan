import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
};

export default Splash;
