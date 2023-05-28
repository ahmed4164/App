import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/LoginScreen/Login';
import Signup from './src/screens/SignupScreen/SignUp';
import Home from './src/screens/HomeScreen/Home';
import ResetPassword from './src/screens/Reset/ResetPassword';

import {auth} from './Firebase/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    try {
      const loggedInValue = await AsyncStorage.getItem('loggedIn');

      if (loggedInValue === 'true') {
         setInitialRoute('Home');
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {loggedIn ? ( */}
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
        {/* ) : ( */}
          {/* <> */}
            <Stack.Screen
              // options={{headerShown: false}}
              name="Login"
              component={Login}
              initialParams={{setLoggedIn}}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Reset" component={ResetPassword} />
          {/* </> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// const styles = StyleSheet.create({})
