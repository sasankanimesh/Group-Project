import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (!email || !password) {
      // If either email or password is empty, do nothing
      alert('Please fill in all fields');
      return;
    }
    fetch('http://192.168.15.92:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.json();
      })
      .then(data => {
        // Navigate to HomeScreen for regular users
        navigation.replace('Home', { email: email });
      }
      )
      .catch(error => {
        // Login failed, display error message
        setError('Invalid email or password');
      });
  };

  const handleUserSignUp = () => {
    navigation.navigate('Signup');
  };

  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.description}>Your health, our priority - anytime, anywhere.</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUserSignUp}>
        <Text>
          Don't have a user account?
          <Text style={styles.signUpText}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAdminLogin}>
        <Text style={styles.signUpText}>Admin Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const logoWidth = width * 0.5;
const logoHight = width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: logoWidth,
    height: logoHight,
    marginBottom: 30,
  },
  description: {
    marginBottom: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 1,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'red',
  },
  loginButton: {
    backgroundColor: 'red',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpText: {
    fontSize: 14,
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
