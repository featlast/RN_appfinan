import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ListsMovements from '../screens/ListsMovements';

const Stack = createNativeStackNavigator();

const screenOptions = {headerShown: false};

export function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ListsMovements" component={ListsMovements} />
    </Stack.Navigator>
  );
}
