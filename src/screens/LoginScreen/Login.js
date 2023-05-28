import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

import {auth} from '../../../Firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       navigation.navigate('Home');
  //     }
  //   });
  // });
    useEffect(() => {
      // Subscribe to the onAuthStateChanged event
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          // User is logged in, navigate to 'Home' screen
          navigation.navigate('Home');
        }
      });

      // Cleanup the subscription when the component unmounts
      return () => {
        // Unsubscribe from the onAuthStateChanged event
        unsubscribe();
      };
    }, []);


  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('loggedIn', 'true');
      navigation.navigate('Home');
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Login</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
          <Text style={[styles.link, {color: '#333'}]}>
            I've forgotten my password
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={loginUser}
          disabled={!email || !password}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  error: {
    marginBottom: 20,
    color: 'red',
  },
  link: {
    color: 'blue',
    marginBottom: 20,
  },
});
