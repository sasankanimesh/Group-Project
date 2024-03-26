import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScrollView } from 'react-native';

export default function MedicationReminder() {
  const [medicationName, setMedicationName] = useState('');
  const [medications, setMedications] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [reminders, setReminders] = useState({});
  const [reminderTime, setReminderTime] = useState(new Date(Date.now() + 60 * 1000)); // Default to one minute from now

  useEffect(() => {
    loadMedications();
    loadReminders();

    // Set up notification listener
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => Notifications.removeNotificationSubscription(notificationListener);
  }, []);

  const handleNotification = (notification) => {
    Alert.alert(notification.request.content.title, notification.request.content.body);
  };

  const loadMedications = async () => {
    try {
      const storedMedications = await AsyncStorage.getItem('medications');
      if (storedMedications !== null) {
        setMedications(JSON.parse(storedMedications));
      }
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      if (storedReminders !== null) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const saveMedications = async (medications) => {
    try {
      await AsyncStorage.setItem('medications', JSON.stringify(medications));
    } catch (error) {
      console.error('Error saving medications:', error);
    }
  };

  const saveReminder = async (medicationId, date) => {
    try {
      const updatedReminders = { ...reminders, [medicationId]: date };
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
      scheduleReminderNotification(medicationId, date);
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const scheduleReminderNotification = async (medicationId, date) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Medication Reminder',
          body: `Time to take your medication.`,
          sound: 'default', // Use default notification sound
          vibrate: [1000, 1000, 1000], // Vibrate for 1 second, pause for 1 second, then vibrate again
        },
        trigger: date,
        identifier: medicationId, // Use medicationId as unique identifier
      });
      Alert.alert('Success', 'Reminder set successfully');
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      Alert.alert('Error', 'Failed to set reminder');
    }
  };


  const addMedication = () => {
    if (medicationName.trim() === '') {
      Alert.alert('Error', 'Please enter a medication name.');
      return;
    }
    const newMedication = {
      id: Date.now().toString(),
      name: medicationName.trim(),
    };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
    setMedicationName('');
  };

  const showDatePicker = (medication) => {
    setSelectedMedication(medication);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    console.log('handleConfirm called'); // Check if handleConfirm is called
    const selectedDate = new Date(date); // Convert to Date object
    await saveReminder(selectedMedication.id, selectedDate);
    hideDatePicker();
  };

  const editReminder = (medicationId) => {
  };

  const deleteReminder = async (medicationId) => {
    try {
      // Remove the medication from the medications list
      const updatedMedications = medications.filter(item => item.id !== medicationId);
      setMedications(updatedMedications);
      await AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));

      // Remove the reminder from the reminders object
      const updatedReminders = { ...reminders };
      delete updatedReminders[medicationId];
      setReminders(updatedReminders);
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

      // Cancel the scheduled notification
      await Notifications.cancelScheduledNotificationAsync(medicationId);

      console.log('Reminder deleted successfully');
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };



  return (

    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={styles.mainTopic}>Medication Reminder</Text>
      <View style={{ width: '80%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add Medication:</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          placeholder="Enter medication name"
          value={medicationName}
          onChangeText={setMedicationName} />
        <Button title="Add Medication" onPress={addMedication} color="red" />
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Medications:</Text>
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10, backgroundColor: 'red', borderRadius: 5, padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white' }}>{item.name}</Text>
                <TouchableOpacity onPress={() => showDatePicker(item)}>
                  <Text style={{ color: 'white', textDecorationLine: 'underline' }}>Set Reminder</Text>
                </TouchableOpacity>
              </View>
              {reminders[item.id] && (
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: 'white' }}>Reminder: {new Date(reminders[item.id]).toLocaleString()}</Text>
                  <Button title="Delete" onPress={() => deleteReminder(item.id)} />
                </View>
              )}
              {reminders[item.id] && <Text>{new Date(reminders[item.id]).toLocaleString()}</Text>}
            </View>
          )} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={reminderTime} />
      </View>
    </View>
  );
}
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
    color: 'red',
    textAlign: 'center'
  },
});


