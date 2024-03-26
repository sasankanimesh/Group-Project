import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AddMedicationScreen = ({ navigation, route }) => {

    const { email } = route.params;

    const [medicationName, setMedicationName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleSaveMedication = () => {
        console.log(email, dosage);
        fetch('http://192.168.15.92:4000/api/add-medication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: medicationName,
                dosage: dosage,
                frequency: frequency,
                email: email
            }),
        })

            .then(response => {
                if (response.ok) {
                    // Medication saved successfully, navigate back to MedicationTrackerScreen
                    navigation.goBack();
                } else {
                    // Handle error appropriately
                    console.error('Failed to save medication');
                }
            })
            .catch(error => {
                console.error('Error saving medication:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Medication</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Medication Name"
                    value={medicationName}
                    onChangeText={setMedicationName}
                />
                <TextInput style={styles.input} placeholder="Dosage" value={dosage}
                    onChangeText={setDosage} />
                <TextInput style={styles.input} placeholder="Frequency" value={frequency}
                    onChangeText={setFrequency} />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveMedication}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    saveButton: {
        marginTop: 10,
        backgroundColor: 'red',
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddMedicationScreen;

