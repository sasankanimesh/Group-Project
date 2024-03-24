import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Condition = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>

      <View style={styles.section}>
        <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By using our healthcare app, you agree to comply with and be bound by the following terms and conditions of use. If you do not agree to these terms, please do not access or use our app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>2. Use of Services</Text>
        <Text style={styles.paragraph}>
          Our app provides healthcare services, including e-channeling, mental health support, emergency services, health resources, and medication reminders. You acknowledge and agree to use these services solely for lawful purposes and in accordance with these terms.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>3. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information when you use our app. By using our app, you consent to the collection and use of your data as described in our Privacy Policy.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>4. Disclaimer of Warranties</Text>
        <Text style={styles.paragraph}>
          Our app is provided on an "as is" and "as available" basis, without any warranties or representations, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or services provided through the app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeading}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our app, including but not limited to damages for loss of profits, data, or other intangible losses.
        </Text>
      </View>
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
  section: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify'
  },
});

export default Condition;
