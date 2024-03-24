import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileScreen({ navigation, route }) {

  const { email } = route.params;

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState({});
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [NIC, setNIC] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [openProvince, setOpenProvince] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [userData, setUserData] = useState({
    firstName: firstName,
    lastName: lastName,
    userEmail: email,
    userPN: phoneNumber,
  });

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [itemsProvince, setItemsProvince] = useState([
    { label: 'Western', value: 'western' },
    { label: 'Central', value: 'central' },
    { label: 'Southern', value: 'southern' },
    { label: 'Northern', value: 'northern' },
    { label: 'Eastern', value: 'eastern' },
    { label: 'North Western', value: 'northwestern' },
    { label: 'North Central', value: 'northcentral' },
    { label: 'Uva', value: 'uva' },
    { label: 'Sabaragamuwa', value: 'sabaragamuwa' },
  ]);

  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState(null);
  const [itemsGender, setItemsGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.79.92:4000/api/user-profile?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            ...userData,
            firstName: data.first_name,
            lastName: data.last_name,
            profileImage: image
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

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSignUp = async () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }


    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }

    setError(errors);
    console.log('Error:', errors); // Log validation errors

    // Check if there are validation errors
    if (Object.keys(errors).length === 0) {
      try {
        // Prepare user data object
        const userData = {
          firstName,
          lastName,
          phoneNumber,
          image,
          dateOfBirth,
          NIC,
          postalCode,
          address,
          passportNumber,
          valueGender,
          valueProvince
        };

        // Make the network request to the server
        console.log('Sending request with user data:', userData);

        const response = await fetch('http://192.168.79.92:4000/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userData, email }),
        });

        console.log('Server response:', response);
        if (response.ok) {
          navigation.navigate('Home', { fname: firstName, profileImage: image });
          alert("Successful");
        } else {
          alert("Error.");
        }
      } catch (error) {
        console.error('Error:', error); // Log unexpected errors
      }
    }
  };
  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result);
    }
  };

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImagePicked(result);
    }
  };

  const handleImagePicked = (result) => {
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
    setShowOptions(false); // Hide options after selecting an image
  };


  const renderProfileImage = () => {
    return (
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <Image source={image ? { uri: image } : require('../assets/images/profile.jpg')} style={styles.profileImage} />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.container}>
          <Text style={styles.title}>My Profile</Text>
          {renderProfileImage()}
          <TextInput
            style={styles.input}
            placeholder={userData.firstName}
            value={firstName}
            onChangeText={setFirstName}
          />
          {error.firstName && <Text style={styles.errorText}>{error.firstName}</Text>}
          <TextInput
            style={styles.input}
            placeholder={userData.lastName}
            value={lastName}
            onChangeText={setLastName}
          />
          {error.lastName && <Text style={styles.errorText}>{error.lastName}</Text>}

          <View style={styles.passwordContainer} >
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                testID="datePicker"
                value={dateOfBirth}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={handleDateChange}
              />
            ) : (
              <TouchableOpacity style={styles.dateIcon} onPress={showDatepicker}>
                <Ionicons name="calendar-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
            <TextInput
              style={styles.input} // Adjust paddingLeft to make space for the icon
              placeholder="Date of Birth"
              value={dateOfBirth.toDateString()}
              editable={false}
            />
          </View>
          {showDatePicker && Platform.OS === 'android' && (
            <DateTimePicker
              testID="datePicker"
              value={dateOfBirth}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <DropDownPicker
            open={openGender}
            value={valueGender}
            items={itemsGender}
            setOpen={setOpenGender}
            setValue={setValueGender}
            setItems={setItemsGender}
            placeholder="Select Gender"
            style={styles.dropdownStyle}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <DropDownPicker
            open={openProvince}
            value={valueProvince}
            items={itemsProvince}
            setOpen={setOpenProvince}
            setValue={setValueProvince}
            setItems={setItemsProvince}
            placeholder="Select Province"
            style={styles.dropdownStyle}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <TextInput
            style={styles.input}
            placeholder="NIC"
            value={NIC}
            onChangeText={setNIC}
          />
          <TextInput
            style={styles.input}
            placeholder="Passport Number"
            value={passportNumber}
            onChangeText={setPassportNumber}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={showOptions}
            onRequestClose={() => setShowOptions(false)}
          >
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.option} onPress={pickImageFromCamera}>
                  <FontAwesome name="camera" size={20} color="black" />
                  <Text style={styles.optionText}>Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={pickImageFromLibrary}>
                  <Foundation name="photo" size={24} color="black" />
                  <Text style={styles.optionText}>Pick an image</Text>
                </TouchableOpacity>
                {image && (
                  <TouchableOpacity style={styles.option} onPress={() => setImage(null)}>
                    <FontAwesome name="trash" size={26} color="black" />
                    <Text style={styles.optionText}>Remove photo</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowOptions(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 2,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: '#fafafa'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: '#fafafa'
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },

  signupButton: {
    backgroundColor: 'red',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginText: {
    fontSize: 14,
    color: 'red',
  },
  errorText: {
    color: 'red',
  },
  dropdownStyle: {
    borderColor: 'gray',
    marginTop: 20,
    backgroundColor: '#fafafa',
  },
  dateIcon: {
    position: 'absolute',
    right: 10,
    bottom: 15,
    zIndex: 1,
  },
});