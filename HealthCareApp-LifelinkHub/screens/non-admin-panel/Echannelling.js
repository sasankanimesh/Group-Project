import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Linking } from 'react-native';

const HospitalSelection = () => {
  const handleHospitalSelection = (hospital) => {
    let url;
    switch (hospital) {
      case 'asiri':
        url = 'https://asirihealth.com/eservices/consultation-booking';
        break;
      case 'hemas':
        url = 'https://hemashealth.com/#/my-home';
        break;
      case 'apollo':
        url = 'https://www.apollohospitals.com/book-appointment/';
        break;
      case 'nawaloka':
        url = 'https://nawaloka.com/channeling';
        break;
      case 'lanka':
        url = 'https://www.echannelling.com/EChWebAPI/indexWeb?hospitalCode=78590C7E31AC3E8E&tid=6c0fea5123fb5630d7298e92f9ab552adf96465002999c93b786270b90c312dd';
        break;
      case 'kings':
        url = 'https://www.kingshospital.lk/appointment.php';
        break;
      case 'ninewells':
        url = 'https://www.ninewellshospital.lk/appointment-booking/';
        break;
      case 'medihelp':
        url = 'https://medihelphealth.com/#/login';
        break;
      default:
        url = '';
    }
    // Open URL in web browser
    Linking.openURL(url);
  };

  const scheduleAppointment = (hospital) => {
    // Implement logic to schedule appointment
    Alert.alert(
      'Schedule Appointment',
      `Are you sure you want to schedule an appointment at ${hospital} Hospital?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleHospitalSelection(hospital) }
      ],
      { cancelable: false }
    );
  };

  const cancelAppointment = (hospital) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your appointment at ${hospital} Hospital?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => handleHospitalSelection(hospital) }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTopic}>E-Channelling</Text>
      <View style={styles.hospitalRow}>
        <TouchableOpacity onPress={() => handleHospitalSelection('asiri')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/asiri.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Asiri Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHospitalSelection('hemas')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/Hemas.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Hemas Hospital</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hospitalRow}>
        <TouchableOpacity onPress={() => handleHospitalSelection('apollo')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/apollo.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Apollo Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHospitalSelection('nawaloka')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/nawaloka.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Nawaloka Hospital</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hospitalRow}>
        <TouchableOpacity onPress={() => handleHospitalSelection('lanka')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/Lanka.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Lanka Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHospitalSelection('kings')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/kings.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Kings Hospital</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hospitalRow}>
        <TouchableOpacity onPress={() => handleHospitalSelection('ninewells')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/ninewells.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Ninewells Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleHospitalSelection('medihelp')} style={styles.hospitalContainer}>
          <Image source={require('../../assets/images/medihelp.png')} style={styles.hospitalImage} />
          <Text style={styles.hospitalLink}>Medihelp Hospital</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  mainTopic: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red'
  },
  hospitalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  hospitalContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 19,
    padding: 10,
  },
  hospitalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  hospitalName: {
    textAlign: 'center',
  },
});

export default HospitalSelection;


