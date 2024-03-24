import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // Import useFocusEffect hook
import { useFocusEffect } from '@react-navigation/native';
import MedicationService from './MedicationService';

const MedicationTrackerScreen = ({ navigation, route }) => {

    const { email } = route.params;

    const [medications, setMedications] = useState([]);

    useEffect(() => {
        loadMedications();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadMedications();
        }, [])
    );

    const loadMedications = async () => {
        try {
            const allMedications = await MedicationService.getAllMedications(email);
            console.log("All medications:", allMedications);
            setMedications(allMedications || []);
        } catch (error) {
            console.error("Error loading medications:", error);
        }
    };

    const handleAddMedication = () => {
        navigation.navigate('AddMedication', { email: email });
    };

    const handleUpdateMedication = async (medicationId) => {
        navigation.navigate('UpdateMedication', { medicationId: medicationId });
    };

    const handleDeleteMedication = async (medicationId) => {
        try {
            await MedicationService.deleteMedication(medicationId);
            setMedications(medications.filter(medication => medication.id !== medicationId));
        } catch (error) {
            console.error("Error deleting medication:", error);
        }
    };

    return (
        <ScrollView >

            <View style={styles.container}>
                <Text style={styles.title}>Medication Tracker</Text>
                {medications.map((medication) => (
                    <View key={medication.id} style={styles.medicationContainer}>
                        <Text style={styles.medicationName}>{medication.name}</Text>
                        <Text style={styles.medicationDetail}>Dosage: {medication.dosage}</Text>
                        <Text style={styles.medicationDetail}>Frequency: {medication.frequency}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateMedication(medication.id)}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteMedication(medication.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                ))}
                <TouchableOpacity style={styles.saveButton} onPress={handleAddMedication}>
                    <Text style={styles.saveButtonText}>Add Medication</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red',
        textAlign: 'center',
    },
    medicationContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medicationDetail: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    updateButton: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
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

export default MedicationTrackerScreen;


