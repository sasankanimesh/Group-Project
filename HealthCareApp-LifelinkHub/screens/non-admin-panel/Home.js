import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ route }) => {
  const { fname } = route.params;
  const { lname } = route.params;
  const { email } = route.params;
  const { profileImage } = route.params;

  //console.log('profileImage:', profileImage); 
  const navigation = useNavigation();

  // Placeholder images
  const images = [
    require('../../assets/images/diga 5.jpg'),
    require('../../assets/images/diga 6.jpg'),
    require('../../assets/images/diga 7.webp'),
    require('../../assets/images/diga 8.jpeg'),
  ];
  const [userData, setUserData] = useState({
    firstName: fname,
    lastName: lname,
    userEmail: email,
    userProfileImage: profileImage,
  });

  // Fetch user profile data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.15.92:4000/api/user-profile?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            ...userData,
            firstName: data.first_name,
            lastName: data.last_name,
            profileImage: data.image,
          });
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchData();
  }, [email]);
  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen', { email: email, fname: fname, profileImage: profileImage }) // Navigate to Profile screen
  };
  const navigateToEmergency = () => {
    navigation.navigate('Emergency', { email: email, fname: fname, profileImage: profileImage }); // Navigate to Emergency screen
  };
  const navigateToChatbot = () => {
    navigation.navigate('Chatbot'); // Navigate to Chatbot screen
  };
  const navigateToTDN = () => {
    navigation.navigate('TDN'); // Navigate to Chatbot screen
  };
  const navigateToReminder = () => {
    navigation.navigate('Reminder'); // Navigate to Reminder screen
  };
  const navigateToResources = () => {
    navigation.navigate('Resource'); // Navigate to Resource screen
  };
  const navigateToEChannelling = () => {
    navigation.navigate('Echannelling', { email: email }); // Navigate to E-Channelling screen
  };
  const navigateToEMedicationTracker = () => {
    navigation.navigate('MedicationTracker', { email: email }); // Navigate to MedicationTracker screen
  };

  return (
    <><ScrollView style={styles.container}>
      {/* User's data display */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.userDataContainer}>
        <TouchableOpacity onPress={navigateToProfile}>
          <View style={styles.row}>
            <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/profile.jpg')} style={styles.profileImage} />
            <Text style={styles.emailText}>Hi {fname} {lname}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Image slideshow */}
      <Swiper style={styles.swiper} showsButtons={true}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>

      {/* Page directors */}
      <View style={styles.directorRow}>
        {/* First row */}
        <TouchableOpacity style={styles.directorContainer} onPress={navigateToEChannelling}>
          <Image source={require('../../assets/images/ec.png')} style={styles.directorImage} />
          <Text style={styles.directorText}>E-Channelling</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.directorContainer} onPress={navigateToChatbot}>
          <Image source={require('../../assets/images/Chatbot.jpg')} style={styles.directorImage} />
          <Text style={styles.directorText}>Mind Mate</Text>
        </TouchableOpacity>
      </View>

      {/* Second row */}
      <View style={styles.directorRow}>
        <TouchableOpacity style={styles.directorContainer} onPress={navigateToTDN}>
          <Image source={require('../../assets/images/ttd.jpg')} style={styles.directorImage} />
          <Text style={styles.directorText}>Talk To Doctor Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.directorContainer} onPress={navigateToEmergency}>
          <Image source={require('../../assets/images/Gemini.jpg')} style={styles.directorImage} />
          <Text style={styles.directorText}>Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Third row */}
      <View style={styles.directorRow}>
        <TouchableOpacity style={styles.directorContainer} onPress={navigateToEMedicationTracker}>
          <Image source={require('../../assets/images/Medication Manager.jpg')} style={styles.directorImage} />
          <Text style={styles.directorText}>Medication Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.directorContainer} onPress={navigateToReminder}>
          <Image source={require('../../assets/images/Reminder.jpg')} style={styles.directorImage} />
          <Text style={styles.directorText}>Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Fourth row */}
      <View style={styles.directorRow}>
        <TouchableOpacity style={styles.directorContainer} onPress={navigateToResources}>
          <Image source={require('../../assets/images/r.png')} style={styles.directorImage} />
          <Text style={styles.directorText}>Resources</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { email: email, fname: fname, profileImage: profileImage })}>
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings', { email: email, fname: fname, profileImage: profileImage })}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details', { email: email, fname: fname, profileImage: profileImage })}>
          <MaterialIcons name="more-horiz" size={24} color="black" />
        </TouchableOpacity>
      </View></>
  );
};

const { width } = Dimensions.get('window');
const logoWidth = width * 0.5;
const logoHeight = width * 0.4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  userDataContainer: {
    marginBottom: 10,

  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    height: logoHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  directorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  directorContainer: {
    width: '43%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directorImage: {
    width: '75%',
    height: '75%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  directorText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  swiper: {
    height: logoHeight,
    marginBottom: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 10
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: 'red'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default HomeScreen;

