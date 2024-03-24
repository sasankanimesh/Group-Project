import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MedicationService from './MedicationService';

const UpdateMedicationScreen = ({ navigation, route }) => {
    const { medicationId } = route.params;
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleUpdateMedication = async () => {
        try {
            await MedicationService.updateMedication(medicationId, { name, dosage, frequency });
            //Navigate back to the previous screen or perform any other actions
            navigation.goBack();
        } catch (error) {
            console.error('Error updating medication:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Medication</Text>
            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='Name'
                />

                <TextInput
                    style={styles.input}
                    value={dosage}
                    onChangeText={setDosage}
                    placeholder='Dosage'
                />

                <TextInput
                    style={styles.input}
                    value={frequency}
                    onChangeText={setFrequency}
                    placeholder='Frequency'
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateMedication}>
                <Text style={styles.saveButtonText}>Update</Text>
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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red',
        textAlign: 'center'
    },
});

export default UpdateMedicationScreen;
