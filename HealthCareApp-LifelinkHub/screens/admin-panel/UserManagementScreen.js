import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.15.92:4000/admin/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://192.168.15.92:4000/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refresh user list after deletion
      fetchData();
      Alert.alert('Success', 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem}>
      <Text style={styles.userInfo}>Name: {item.first_name}</Text>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
      <Text style={styles.userInfo}>Phone Number: {item.phone_number}</Text>
      <Text style={styles.userInfo}>NIC: {item.nic}</Text>
      <Text style={styles.userInfo}>Gender: {item.gender}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
    textAlign: 'center',
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default UserManagementScreen;
