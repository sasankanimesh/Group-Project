import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios'; 

const DashboardScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersResponse = await axios.get('http://192.168.15.92:4000/admin/total-users');
      const activitiesResponse = await axios.get('http://192.168.15.92:4000/admin/recent-activities');
      
      setTotalUsers(usersResponse.data.totalUsers);
      setRecentActivities(activitiesResponse.data.recentActivities.map(activity => ({
        ...activity,
        timestamp: convertToLocalTime(activity.timestamp) // Convert timestamp to local time
      })));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setIsLoading(false);
    }
  };

  // Function to convert timestamp to local time
  const convertToLocalTime = (timestamp) => {
    const localTime = new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
    return localTime;
  };

  const renderRecentActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.email}>Email: {item.user_email}</Text>
      <Text style={styles.activityAction}>{item.action}</Text>
      <Text style={styles.activityTimestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View>
          <Text style={styles.totalUsers}>Total Users: {totalUsers}</Text>

          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <FlatList
            data={recentActivities}
            renderItem={renderRecentActivityItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
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
    textAlign: 'center'
  },
  totalUsers: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  activityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activityAction: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityTimestamp: {
    fontSize: 14,
    color: '#666',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;

