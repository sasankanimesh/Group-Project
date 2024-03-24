import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from './ColorSchemeContext';

const Settings = ({ navigation, route }) => {
  const { email } = route.params;
  const { fname } = route.params;
  const { profileImage } = route.params;
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleChangePassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <><View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Dark Mode</Text>
        <TouchableOpacity style={styles.eyeIcon} onPress={toggleColorScheme}>
          <MaterialCommunityIcons name={colorScheme === 'dark' ? 'toggle-switch' : 'toggle-switch-off'} size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.row}>
        <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Change Password</Text>
        <TouchableOpacity style={styles.eyeIcon} onPress={handleChangePassword}>

          <MaterialCommunityIcons name="key-change" size={21} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule} />
      <View style={styles.row}>
        <Text style={[styles.text, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Logout</Text>
        <TouchableOpacity style={styles.eyeIcon} onPress={handleLogout}>

          <MaterialCommunityIcons name="logout" size={21} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalRule} />

    </View><View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { email: email, fname: fname, profileImage: profileImage })}>
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings', { email: email, fname: fname, profileImage: profileImage })}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details', { email: email, fname: fname, profileImage: profileImage })}>
          <MaterialIcons name="more-horiz" size={24} color="black" />
        </TouchableOpacity>
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5733',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
    marginTop: 20
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderColor: 'red',
    width: '80%',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 70,
    bottom: 0,
    top: 5
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: 'red'
  },
});

export default Settings;

