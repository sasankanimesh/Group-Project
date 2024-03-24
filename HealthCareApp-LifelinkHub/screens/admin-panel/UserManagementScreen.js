// UserManagementScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const UserManagementScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend or some data source
    const fetchData = async () => {
      try {
        const response = await fetch('http://your-api-endpoint/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      {/* Add more user details as needed */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()} // Assuming user object has an id
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
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default UserManagementScreen;
