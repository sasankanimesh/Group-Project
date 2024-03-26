import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EmailCheckScreen = ({ navigation, route }) => {
  const [otp, setOTP] = useState('');
  const { email, firstName, lastName, password } = route.params; // Extract email, firstName, and lastName from route params

  const handleCheckOTP = async () => {
    try {
      const response = await fetch('http://192.168.15.92:4000/api/email-check-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, firstName, lastName, password }), // Include firstName and lastName in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // OTP verification successful
        navigation.replace('Home', { name: firstName });
        alert('Signup Successful!')
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error checking OTP:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={setOTP}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.checkButton} onPress={handleCheckOTP}>
        <Text style={styles.buttonText}>Check OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red'
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
  checkButton: {
    backgroundColor: 'red',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EmailCheckScreen;
