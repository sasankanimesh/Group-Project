import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking } from 'react-native';

const Partners = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Partner Hospitals</Text>
      {hospitals.map((hospital, index) => (
        <View key={index} style={styles.hospitalContainer}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text><Text style={styles.bold}>Location:</Text> {hospital.location}</Text>
          <Text><Text style={styles.bold}>Specialties:</Text> {hospital.specialties.join(", ")}</Text>
          <Text><Text style={styles.bold}>Contact:</Text> {hospital.contact}</Text>
          <Text onPress={() => Linking.openURL(hospital.website)} style={styles.link}>Website: {hospital.website}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red'
  },
  hospitalContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

const hospitals = [
  {
    name: "Asiri Central Hospital",
    location: "Colombo",
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
    contact: "+94 11 4523300",
    website: "https://www.asirihealth.com/central/",
  },
  {
    name: "Hemas Hospitals",
    location: "Colombo",
    specialties: ["Pediatrics", "Obstetrics and Gynecology", "Dermatology"],
    contact: "+94 11 575 3100",
    website: "https://www.hemashospitals.com/",

  },
  {
    name: "Navaloka Hospital",
    location: "Colombo",
    specialties: ["General Surgery", "Urology", "ENT"],
    contact: "+94 11 242 4131",
  },
];

export default Partners;
