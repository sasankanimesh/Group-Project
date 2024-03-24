// AdminPanel.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserManagementScreen from './UserManagementScreen';

const AdminPanel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.sidebarItem}>Dashboard</Text>
        <Text style={styles.sidebarItem}>User Management</Text>
        {/* Add more sidebar items for other features */}
      </View>
      <View style={styles.mainContent}>
        <UserManagementScreen />
        {/* Other feature screens will be displayed here based on sidebar navigation */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  sidebarItem: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
});

export default AdminPanel;
