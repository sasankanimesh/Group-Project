import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactUs = () => {
  const openEmail = () => {
    Linking.openURL('mailto:info@hospital.com');
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/hospital');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/hospital');
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/hospital');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.text}>123 Hospital Street</Text>
        <Text style={styles.text}>Colombo, Sri Lanka</Text>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.text}>+94 11 1234567</Text>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={[styles.text, styles.email]} onPress={openEmail}>info@hospital.com</Text>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.socialContainer}>
        <Icon name="twitter" size={30} color="#1DA1F2" style={styles.icon} onPress={openTwitter} />
        <Icon name="facebook" size={30} color="#1877F2" style={styles.icon} onPress={openFacebook} />
        <Icon name="instagram" size={30} color="#C13584" style={styles.icon} onPress={openInstagram} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
    textAlign: 'center'
  },
  infoContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  email: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  icon: {
    textAlign: 'center',
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 20,
  },
});

export default ContactUs;
