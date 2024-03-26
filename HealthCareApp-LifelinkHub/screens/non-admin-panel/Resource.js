import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';

const HealthEducationScreen = () => {
  const resources = [
    {
      title: 'Healthy Eating',
      description: 'Learn about the importance of a balanced diet and how to make healthy food choices.',
      link: 'https://www.cdc.gov/healthyweight/healthy_eating/index.html',
      image: require('../../assets/images/Healthy_eating.jpeg'),
      videoLink: 'https://youtu.be/3DM3_ocFy0U?si=eWPVdXgqfXaD26NB',
    },
    {
      title: 'Physical Activity',
      description: 'Discover the benefits of regular physical activity and how to incorporate exercise into your routine.',
      link: 'https://www.cdc.gov/physicalactivity/index.html',
      image: require('../../assets/images/Healthy_activity.jpeg'),
      videoLink: 'https://youtu.be/DD7-yuBno1I?si=nxHAAtSiaoLih-XA',
    },

    {
      title: 'Mental Health',
      description: 'Find information on managing stress, anxiety, and depression, and improving overall mental well-being.',
      link: 'https://www.cdc.gov/mentalhealth/index.htm',
      image: require('../../assets/images/MentalHealth.jpg'),
      videoLink: 'https://youtu.be/AOHT-YiOeQA?si=G1R5wNe3gnCQmOPD',
    },
    {
      title: 'Sleep Hygiene',
      description: 'Learn about the importance of good sleep habits and strategies for improving sleep quality.',
      link: 'https://www.sleepfoundation.org/sleep-hygiene',
      image: require('../../assets/images/sleep-hygiene.webp'),
      videoLink: 'https://youtu.be/fk-_SwHhLLc?si=QjNNi37G7tUyh1n9',
    },
    {
      title: 'Emotional Well-being',
      description: 'Learn about strategies for emotional wellness, building resilience, and fostering positive relationships.',
      link: 'https://www.psychologytoday.com/us/basics/emotional-health',
      image: require('../../assets/images/Emotional Well-being.jpg'),
      videoLink: 'https://youtu.be/hXlFxceM4R8?si=tih1IulNSoAx9QG0',
    },
    {
      title: 'Stress Management',
      description: 'Discover techniques for reducing stress and promoting relaxation in daily life.',
      link: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relief/art-20044456',
      image: require('../../assets/images/stress.jpg'),
      videoLink: 'https://youtu.be/15GaKTP0gFE?si=-HI4QikrEwiT7KgE',
    },
    {
      title: 'Preventive Care',
      description: 'Find information on preventive measures such as vaccinations, screenings, and regular check-ups.',
      link: 'https://www.cdc.gov/prevention/index.html',
      image: require('../../assets/images/Preventive Care.jpg'),
      videoLink: 'https://youtu.be/hlagQO3FzY0?si=2STpQDlpqUe5pW3C',
    },

    {
      title: 'Chronic Disease Management',
      description: 'Find resources on managing chronic conditions such as diabetes, heart disease, and asthma.',
      link: 'https://www.cdc.gov/chronicdisease/index.htm',
      image: require('../../assets/images/Chronic Disease Management.png'),
      videoLink: 'https://youtu.be/de2llrEajvU?si=UUibRu-qF4N5PgfI',
    },
  ];

  // Function to handle opening the external link
  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Education Resources</Text>
      {resources.map((resource, index) => (
        <TouchableOpacity key={index} style={styles.resourceContainer} onPress={() => handleLinkPress(resource.link)}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Image source={resource.image} style={styles.resourceImage} />
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          {resource.videoLink && (
            <TouchableOpacity onPress={() => handleLinkPress(resource.videoLink)}>
              <Text style={styles.videoLink}>Watch Video</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  resourceContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'red',
  },
  resourceImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,

  },
  resourceDescription: {
    fontSize: 16,
  },
  videoLink: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default HealthEducationScreen;
