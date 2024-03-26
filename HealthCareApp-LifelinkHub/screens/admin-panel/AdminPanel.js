import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import UserManagementScreen from './UserManagementScreen';
import DashboardScreen from './DashboardScreen';

const AdminPanel = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const renderScreen = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'User Management':
        return <UserManagementScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSelectedItem('Dashboard')}>
          <Text style={[styles.topBarItem, selectedItem === 'Dashboard' && styles.selectedItem]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedItem('User Management')}>
          <Text style={[styles.topBarItem, selectedItem === 'User Management' && styles.selectedItem]}>User Management</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 15,
  },
  topBarItem: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedItem: {
    textDecorationLine: 'underline',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
});

export default AdminPanel;
