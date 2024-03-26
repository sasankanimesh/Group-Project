import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setError(errors);
    console.log('Error:', errors); // Log validation errors

    // Check if there are validation errors
    if (Object.keys(errors).length === 0) {
      try {
        const emailExistsResponse = await fetch('http://192.168.15.92:4000/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!emailExistsResponse.ok) {
          // Handle server error
          throw new Error('Server error');
        }

        const emailExistsData = await emailExistsResponse.json();

        if (emailExistsData.exists) {
          // Email already exists, display error
          setError({ email: 'Email already exists' });
          return;
        }

        // Prepare user data for signup
        const userData = {
          firstName,
          lastName,
          email,
          password,
        };

        // Make the network request to the server for sending OTP
        const response = await fetch('http://192.168.15.92:4000/api/emailCheckOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Sending only the email for OTP verification
        });

        // Handle server response
        if (response.ok) {
          // Parsing the response is not necessary here since there's no response body
          // Just navigate to the EmailCheck screen
          // Navigating to EmailCheckScreen and passing parameters
          navigation.navigate('EmailCheck', {
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
            password: password 
          });

        } else {
          // Signup failed, display error message
          const responseData = await response.json(); // Parsing the response for error message
          alert(responseData.message || 'Signup failed');
        }
      } catch (error) {
        console.error('Error:', error); // Log unexpected errors
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          {error.firstName && <Text style={styles.errorText}>{error.firstName}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          {error.lastName && <Text style={styles.errorText}>{error.lastName}</Text>}


          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {error.email && <Text style={styles.errorText}>{error.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
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
          {error.password && <Text style={styles.errorText}>{error.password}</Text>}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          {error.confirmPassword && <Text style={styles.errorText}>{error.confirmPassword}</Text>}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <Text>Already have an account?<Text style={styles.loginText}> Login</Text></Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showOptions}
            onRequestClose={() => setShowOptions(false)}
          >
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 2,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: '#fafafa'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: '#fafafa'
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },

  signupButton: {
    backgroundColor: 'red',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginText: {
    fontSize: 14,
    color: 'red',
  },
  errorText: {
    color: 'red',
  },
  dropdownStyle: {
    borderColor: 'gray',
    marginTop: 20,
    backgroundColor: '#fafafa',
  },
  dateIcon: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    zIndex: 1,
  },
});
