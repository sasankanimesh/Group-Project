const MedicationService = {
    getAllMedications: async (email) => {
        console.log(email);
        try {
            const response = await fetch('http://192.168.15.92:4000/api/get-medications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch medications');
            }
            const medications = await response.json();
            return medications;
        } catch (error) {
            console.error('Error fetching medications:', error);
            throw error;
        }
    },

    updateMedication: async (medicationId, newData) => {
        try {
            const response = await fetch(`http://192.168.15.92:4000/api/update-medications/${medicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error('Failed to update medication');
            }
            const updatedMedication = await response.json();
            return updatedMedication;

        } catch (error) {
            console.error('Error updating medication:', error);
            throw error;
        }
    },

    deleteMedication: async (medicationId) => {
        console.log(medicationId);
        try {
            const response = await fetch(`http://192.168.15.92:4000/api/delete-medications/${medicationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete medication');
            }
        } catch (error) {
            console.error('Error deleting medication:', error);
            throw error;
        }
    },
};

export default MedicationService;
