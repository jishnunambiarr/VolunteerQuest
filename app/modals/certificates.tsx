// certificates.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type CertificateScreenProps = {
  route: any;
  navigation: any;
};

export default function CertificateScreen({ route, navigation }: CertificateScreenProps) {
  const certificateData = [
    { year: 2024, hours: 56 },
    { year: 2023, hours: 100 }
  ];

  const handleDownload = (year: number) => {
    Alert.alert('Success', `Certificate for ${year} has been downloaded`);
  };

  const handleAddToLinkedIn = (year: number) => {
    Alert.alert('LinkedIn', `Adding ${year} certificate to LinkedIn profile`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Volunteer Certificates</Text>

      {certificateData.map((cert) => (
        <View key={cert.year} style={styles.certificateCard}>
          <View style={styles.certificatePreview}>
            <FontAwesome5 name="certificate" size={50} color="#6B46C1" />
            <Text style={styles.certTitle}>Certificate of Volunteering</Text>
            <Text style={styles.certText}>This certifies that</Text>
            <Text style={styles.certName}>Rawbin</Text>
            <Text style={styles.certText}>has completed</Text>
            <Text style={styles.certHours}>{cert.hours} hours</Text>
            <Text style={styles.certText}>of volunteer service in</Text>
            <Text style={styles.certYear}>{cert.year}</Text>
            <Text style={styles.certDate}>
              Issued on {new Date().toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(cert.year)}
            >
              <FontAwesome5 name="download" size={16} color="white" />
              <Text style={styles.buttonText}>Download Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkedinButton}
              onPress={() => handleAddToLinkedIn(cert.year)}
            >
              <FontAwesome5 name="linkedin" size={16} color="white" />
              <Text style={styles.buttonText}>Add to LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginBottom: 20,
  },
  certificateCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  certificatePreview: {
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  certTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginTop: 16,
    marginBottom: 20,
  },
  certText: {
    fontSize: 16,
    color: '#4B5563',
    marginVertical: 4,
  },
  certName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  certHours: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginVertical: 8,
  },
  certYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  certDate: {
    fontSize: 14,
    color: '#6B5563',
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  downloadButton: {
    backgroundColor: '#6B46C1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  linkedinButton: {
    backgroundColor: '#0077B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
