import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Perform your navigation action here
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const logoWidth = width * 0.5;
const logoHeight = width * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    marginBottom: 30,
  },
});

export default SplashScreen;
