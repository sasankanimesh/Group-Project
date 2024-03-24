import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const doctorsData = [
  { name: 'Dr. Duminda Pathirana', specialty: 'Pediatrician', contact: ' 0772 974 544', qualification: 'MBBS(Col), DCH(Col), MD(Col)' },
  { name: 'Dr. MTD Lakshan', specialty: 'Dissection', contact: ' 076 557 7111', qualification: 'MBBS, MS, DOHNS, FEB ORL-HNS FRCSEd ORL-HNSConsultant ENT and Head and Neck Surgeon' },
  { name: 'Dr. Harindu Wijesinghe  ', specialty: 'Rheumatologist', contact: ' 0777 217 212', qualification: 'MBBS (S.L), MD (Col), MRCP (UK)  ' },
  { name: 'Dr. Maiya Gunasekara  ', specialty: 'Surgeon', contact: ' 0773 207 770', qualification: 'MS, MBBS, FRCS (Eng) FRCS(Ed), FICS,F.MAS, FISCP, FIAGES, FCS Sri Lanka' },
  { name: 'Dr. Anura Bandara  ', specialty: 'Anaesthetics   ', contact: '  0715386224 ', qualification: 'MBBS, FRCA  (UK), MD (Anaestgesiology)  ' },
  { name: 'Dr. Gishan Kalanamith  ', specialty: 'Restorative Dentistry  ', contact: '0718385460  ', qualification: 'MD in restorative dentistry, BDS (Peradeniya), MS Restorative dentistry  (Colombo)' },
  { name: 'Dr. B Sunil S De Silva   ', specialty: 'Nursing and Palliat', qualification: 'PHD in Nursing  (USA), CTHESDC for Probationary Lecturer, MON (Australia) Dip.in Psychological counselling' },
];

const TalkToDoctorNow = () => {
  const handleVoiceCall = (contact) => {
    // Initiate a voice call to the provided contact number
    const phoneNumber = `tel:${contact}`;
    Linking.openURL(phoneNumber)
      .then(() => {
        console.log(`Initiated voice call to ${contact}`);
      })
      .catch((error) => {
        console.error(`Error initiating voice call: ${error}`);
      });
  };

  const renderDoctorRow = (doctor) => {
    return (

      <TouchableOpacity style={styles.doctorRow} onPress={() => handleDoctorPress(doctor)}>

        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorQualification}>{doctor.qualification}</Text>
        </View>
        <TouchableOpacity style={styles.voiceCallButton} onPress={() => handleVoiceCall(doctor.contact)}>
          <MaterialIcons name="call" size={21} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>

    );
  };

  const handleDoctorPress = (doctor) => {
    // Handle the press event for the doctor row
    console.log(`Selected doctor: ${doctor.name}`);
  };

  const renderDoctorsBySpecialty = () => {
    const specialties = [...new Set(doctorsData.map((doctor) => doctor.specialty))];
    return specialties.map((specialty, index) => (
      <View key={index} style={styles.specialtyContainer}>
        <Text style={styles.specialtyTitle}>{specialty}</Text>
        {doctorsData
          .filter((doctor) => doctor.specialty === specialty)
          .map((doctor, index) => (
            <View key={index}>{renderDoctorRow(doctor)}</View>
          ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Talk To Doctor Now</Text>
      {renderDoctorsBySpecialty()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  specialtyContainer: {
    marginBottom: 20,
  },
  specialtyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  doctorRow: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorQualification: {
    fontSize: 12,
    marginTop: 5,
  },
  voiceCallButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
    textAlign: 'center'
  },
});

export default TalkToDoctorNow;

