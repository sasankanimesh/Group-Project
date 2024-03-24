import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQ = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Frequently Asked Questions</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>What is e-Channeling?</Text>
        <Text style={styles.answer}>E-Channeling is a service provided by our app that allows users to book appointments with healthcare professionals online. Users can select their preferred doctor, specify the date and time of the appointment, and receive confirmation instantly.</Text>
      </View>
      <View style={styles.horizontalRule} />

      <View style={styles.questionContainer}>
        <Text style={styles.question}>How does the mental health AI-powered chat bot work?</Text>
        <Text style={styles.answer}>Our mental health AI-powered chat bot utilizes artificial intelligence algorithms to engage in conversations with users and provide support for mental health concerns. It offers resources, coping strategies, and guidance based on user input, promoting emotional well-being and offering a confidential platform for seeking help.</Text>
      </View>
      <View style={styles.horizontalRule} />

      <View style={styles.questionContainer}>
        <Text style={styles.question}>What emergency services are available through the app?</Text>
        <Text style={styles.answer}>Our app provides access to emergency services such as ambulance assistance, emergency room navigation, and quick access to emergency contact numbers. Users can swiftly reach out for medical assistance in urgent situations, ensuring prompt care and support.</Text>
      </View>
      <View style={styles.horizontalRule} />

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Can I customize medication reminders?</Text>
        <Text style={styles.answer}>Yes, our app allows users to customize medication reminders according to their prescribed regimen. Users can set reminders for specific medications, dosages, and frequencies, ensuring adherence to their treatment plan and promoting medication compliance.</Text>
      </View>
      <View style={styles.horizontalRule} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red'
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify'
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 20,
  },
});

export default FAQ;
