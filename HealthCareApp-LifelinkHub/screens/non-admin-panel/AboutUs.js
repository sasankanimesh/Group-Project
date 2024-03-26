import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.paragraph}>
        Welcome to our healthcare app! We are dedicated to providing comprehensive healthcare solutions to our users, aiming to improve access to medical services and enhance overall well-being.
      </Text>
      <Text style={styles.paragraph}>
        Our app offers a wide range of features tailored to meet the diverse needs of our users. From e-channeling to mental health support, emergency services to medication reminders, we strive to be your trusted companion on your healthcare journey.
      </Text>
      <Text style={styles.subHeading}>Key Features:</Text>
      <Text style={styles.feature}>
        - E-Channeling: Easily book appointments with your preferred doctors and specialists, saving you time and hassle.
      </Text>
      <Text style={styles.feature}>
        - Mental Health AI-Powered Chat Bot: Access confidential support and guidance from our AI-powered chat bot, available 24/7 to assist with mental health concerns and provide valuable resources.
      </Text>
      <Text style={styles.feature}>
        - Emergency Services: Get quick access to emergency services and medical assistance whenever you need it, ensuring peace of mind in critical situations.
      </Text>
      <Text style={styles.feature}>
        - Health Resources: Access a wealth of health resources, including articles, videos, and tools, to empower yourself with knowledge and make informed healthcare decisions.
      </Text>
      <Text style={styles.feature}>
        - Medication Reminder: Never miss a dose again with our medication reminder feature, helping you stay on track with your treatment regimen and maintain optimal health.
      </Text>
      <Text style={styles.paragraph}>
        At our healthcare app, we prioritize user satisfaction and strive for excellence in everything we do. Whether you're seeking medical advice, booking appointments, or managing your health, we're here to support you every step of the way.
      </Text>
      <Text style={styles.paragraph}>
        Thank you for choosing our app as your trusted healthcare partner. Together, let's embark on a journey towards better health and well-being.
      </Text>
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
    color: 'red',
    textAlign: 'center'
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },

  feature: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 10,
    textAlign: 'justify'
  },
});

export default AboutUs;
