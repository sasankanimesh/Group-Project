import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Text, Animated, Easing, Alert, Image, Modal, ScrollView, TextInput, Button, View, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const PlaceholderImage = require('../assets/images/Gemini.jpg');

export default function App({ route }) {

  const { email } = route.params;

  const [isTracking, setIsTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [medicalIDVisible, setMedicalIDVisible] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    medications: '',
    emergencyContacts: ''
  });
  const [mapVisible, setMapVisible] = useState(false);
  const [emergencyContactsVisible, setEmergencyContactsVisible] = useState(false);
  const [medicationRemindersVisible, setMedicationRemindersVisible] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [newMedicationReminder, setNewMedicationReminder] = useState({
    medicationName: '',
    reminderTime: ''
  });

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission not granted');
      return;
    }
  };

  const saveMedicalInfo = async () => {
    try {
      const response = await fetch('http://192.168.79.92:4000/api/add-Emedication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, medicalInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to save medical information');
      }

      const data = await response.json();
      console.log('Medical info saved:', data);
      setMedicalIDVisible(false);
      Alert.alert('Medical Info Saved', 'Your medical information has been saved successfully.');
    } catch (error) {
      console.error('Error saving medical info:', error);
      Alert.alert('Error', 'Failed to save medical information. Please try again later.');
    }
  };


  const handleSOSPress = () => {
    console.log("SOS button pressed");
    Alert.alert(
      'SOS Alert',
      'Are you sure you want to send an SOS?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            Linking.openURL('tel:119');
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleEmergencyContacts = () => {
    console.log("Emergency Contacts button pressed");
    setEmergencyContactsVisible(true);
  };

  const handleMedicalID = () => {
    console.log("Medical ID button pressed");
    setMedicalIDVisible(true);
  };

  const handleEmergencyLocationTrack = async () => {
    if (!isTracking) {
      setIsTracking(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission not granted');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapVisible(true);
      Alert.alert('Emergency Location Tracking Started', 'Your location is being tracked for emergency purposes.');
    } else {
      setIsTracking(false);
      Location.stopLocationUpdatesAsync();
      setLocation(null);
      setMapVisible(false);
      Alert.alert('Emergency Location Tracking Stopped', 'Your location tracking has been stopped.');
    }
  };

  const handleMedicationReminders = () => {
    console.log("Medication Reminders button pressed");
    setMedicationRemindersVisible(true);
  };

  const handleSaveMedicationReminder = () => {
    // Implement saving medication reminder logic
    setMedicationReminders([...medicationReminders, newMedicationReminder]); // Add new medication reminder to existing reminders
    setNewMedicationReminder({ // Reset new medication reminder state
      medicationName: '',
      reminderTime: ''
    });
    setMedicationRemindersVisible(false); // Close medication reminders modal
    Alert.alert('Medication Reminder Set', 'Your medication reminder has been set successfully.');
  };

  const handleEditMedicationReminder = (index) => {
    // Implement editing medication reminder logic
    setMedicationRemindersVisible(true);
    // Set the medication reminder to be edited in the state or populate the form fields with existing data
  };

  const scaleValue = useState(new Animated.Value(1))[0];

  const handleSOSAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
    handleSOSPress();
  };

  useEffect(() => {
    pulsateAnimation();
  }, []);

  const pulsateAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const scale = scaleValue.interpolate({
    inputRange: [1, 1.2],
    outputRange: [1, 1.2],
  });

  const emergencyContacts = [
    { name: 'Tap Here To Call Ambulance', phoneNumber: '119' },
    { name: 'Tap Here To Call Police', phoneNumber: '110' },
    // Add more emergency contacts as needed
  ];

  const callEmergencyContact = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Text style={styles.emergencyText}>Emergency</Text>
        <Image source={PlaceholderImage} style={styles.image} />

      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity onPress={handleEmergencyContacts} style={styles.button}>
            <Text style={styles.buttonText}>Emergency Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMedicalID} style={styles.button}>
            <Text style={styles.buttonText}>Medical ID</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonsContainer}>
          <TouchableOpacity onPress={handleEmergencyLocationTrack} style={styles.button}>
            <Text style={styles.buttonText}>{isTracking ? 'Stop Location Track' : 'Emergency Location Track'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMedicationReminders} style={styles.button}>
            <Text style={styles.buttonText}>Medication Reminders</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sosButtonContainer}>
        <TouchableOpacity onPress={handleSOSAnimation} style={[styles.sosButton, { transform: [{ scale }] }]}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={medicalIDVisible}
        onRequestClose={() => setMedicalIDVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.medicalIDContainer}>
            <Text style={styles.medicalIDTitle}>Medical ID Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Blood Type"
              value={medicalInfo.bloodType}
              onChangeText={(text) => setMedicalInfo({ ...medicalInfo, bloodType: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Allergies"
              value={medicalInfo.allergies}
              onChangeText={(text) => setMedicalInfo({ ...medicalInfo, allergies: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Medical Conditions"
              value={medicalInfo.medicalConditions}
              onChangeText={(text) => setMedicalInfo({ ...medicalInfo, medicalConditions: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Medications"
              value={medicalInfo.medications}
              onChangeText={(text) => setMedicalInfo({ ...medicalInfo, medications: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Contacts"
              value={medicalInfo.emergencyContacts}
              onChangeText={(text) => setMedicalInfo({ ...medicalInfo, emergencyContacts: text })}
            />
            <Button title="Save Medical Info" onPress={saveMedicalInfo} />
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mapVisible}
        onRequestClose={() => setMapVisible(false)}
      >
        <View style={styles.modalContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.coords.latitude : 0,
              longitude: location ? location.coords.longitude : 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />}
          </MapView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={emergencyContactsVisible}
        onRequestClose={() => setEmergencyContactsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.emergencyContactsContainer}>
            <Text style={styles.emergencyContactsTitle}>Emergency Contacts</Text>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity key={index} style={styles.contactButton} onPress={() => callEmergencyContact(contact.phoneNumber)}>
                <Text style={styles.contactButtonText}>{contact.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={medicationRemindersVisible}
        onRequestClose={() => setMedicationRemindersVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.medicationRemindersContainer}>
            <Text style={styles.medicationRemindersTitle}>Medication Reminders</Text>
            {/* Display existing medication reminders */}
            {medicationReminders.map((reminder, index) => (
              <View key={index}>
                <Text>{reminder.medicationName}</Text>
                <Text>{reminder.reminderTime}</Text>
                <Button title="Edit Reminder" onPress={() => handleEditMedicationReminder(index)} />
              </View>
            ))}
            {/* Implement UI for setting medication reminder */}
            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={newMedicationReminder.medicationName}
              onChangeText={(text) => setNewMedicationReminder({ ...newMedicationReminder, medicationName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Reminder Time"
              value={newMedicationReminder.reminderTime}
              onChangeText={(text) => setNewMedicationReminder({ ...newMedicationReminder, reminderTime: text })}
            />
            <Button title="Set Medication Reminder" onPress={handleSaveMedicationReminder} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 10,
    position: 'relative',
    zIndex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  emergencyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'center',
    color: 'red', // Adjusted theme color to a shade of red-orange
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    zIndex: 2,
  },
  leftButtonsContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  rightButtonsContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: 150,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sosButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 220,
    zIndex: 2,
  },
  sosButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  medicalIDContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  medicalIDTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  emergencyContactsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  emergencyContactsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  medicationRemindersContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  medicationRemindersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
