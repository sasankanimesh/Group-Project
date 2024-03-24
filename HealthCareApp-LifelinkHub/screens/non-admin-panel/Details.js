import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Details = ({ navigation, route }) => {

    const { email } = route.params;
    const { fname } = route.params;
    const { profileImage } = route.params;

    const handlePartners = () => {
        navigation.navigate('Partners');
    };

    const handleAboutus = () => {
        navigation.navigate('AboutUs');
    };

    const handleContactus = () => {
        navigation.navigate('ContactUs');
    };

    const handleFAQ = () => {
        navigation.navigate('FAQ');
    };

    const handleConditions = () => {
        navigation.navigate('Conditions');
    };

    const handlePrivacy = () => {
        navigation.navigate('Privacy');
    };

    return (
        <><ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.row}>
                <Text style={styles.text}>Partners</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handlePartners}>

                    <FontAwesome5 name="hospital" size={21} color="black" />
                </TouchableOpacity>
            </View><View style={styles.horizontalRule} /><View style={styles.row}>
                <Text style={styles.text}>About Us</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handleAboutus}>
                    <AntDesign name="infocirlceo" size={19} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalRule} /><View style={styles.row}>
                <Text style={styles.text}>Contact Us</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handleContactus}>
                    <AntDesign name="contacts" size={21} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalRule} />
            <View style={styles.row}>
                <Text style={styles.text}>FAQ</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handleFAQ}>
                    <AntDesign name="questioncircleo" size={19} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalRule} />
            <View style={styles.row}>
                <Text style={styles.text}>Terms & Conditions</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handleConditions}>
                    <MaterialIcons name="rule" size={21} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalRule} />
            <View style={styles.row}>
                <Text style={styles.text}>Privacy Notice</Text>
                <TouchableOpacity style={styles.eyeIcon} onPress={handlePrivacy}>
                    <MaterialIcons name="privacy-tip" size={20} color="black" />
                </TouchableOpacity>

            </View>


        </ScrollView><View style={styles.horizontalRule} /><View style={styles.container1}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF5733',
    },
    container1: {
        backgroundColor: '#fff',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        paddingHorizontal: 30,
        marginTop: 30
    },
    text: {
        fontSize: 18,
        marginRight: 10,
    },
    horizontalRule: {
        borderBottomWidth: 1,
        borderColor: 'red',
        width: '80%',
        marginBottom: 20,

    },
    eyeIcon: {
        position: 'absolute',
        right: 70,
        bottom: 0,
        top: 5
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
});

export default Details;
