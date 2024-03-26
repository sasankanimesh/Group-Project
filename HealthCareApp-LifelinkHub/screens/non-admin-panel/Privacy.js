import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Privacy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <Text style={styles.paragraph}>
        This Privacy Policy describes how your personal information is collected, used, and shared when you use our healthcare app.
      </Text>

      <Text style={styles.subHeading}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We collect personal information that you provide to us when using our app, including but not limited to:{'\n'}
        - Name{'\n'}
        - Email address{'\n'}
        - Phone number{'\n'}
        - Medical history
      </Text>

      <Text style={styles.subHeading}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        We use the information collected to provide and improve our app's services, including but not limited to:{'\n'}
        - Facilitating e-channeling appointments.{'\n'}
        - Providing mental health support{'\n'}
        - Offering emergency services{'\n'}
        - Delivering health resources{'\n'}
        - Sending medication reminders
      </Text>

      <Text style={styles.subHeading}>3. Information Sharing</Text>
      <Text style={styles.paragraph}>
        We may share your personal information with third-party service providers who assist us in operating our app and delivering services to you. We do not sell or rent your personal information to third parties.
      </Text>

      <Text style={styles.subHeading}>4. Data Retention</Text>
      <Text style={styles.paragraph}>
        We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
      </Text>

      <Text style={styles.subHeading}>5. Your Rights</Text>
      <Text style={styles.paragraph}>
        You have the right to access, correct, or delete your personal information. If you have any questions or concerns about our use of your personal information, please contact us using the information provided below.
      </Text>

      <Text style={styles.subHeading}>6. Changes to Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this Privacy Policy periodically for any updates.
      </Text>

      <Text style={styles.contact}>
        For any questions about this Privacy Policy,{'\n'}please contact us at:<Text style={styles.email}>info@healthcareapp.com</Text>
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
    textAlign: 'center',
    color: 'red'
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify'
  },
  contact: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'justify'
  },
  email: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Privacy;
