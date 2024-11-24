import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type VolunteerStats = {
  totalHours: number;
  eventsAttended: number;
  currentStreak: number;
  yearsActive: number;
  points: number;
};

type YearlyHours = {
  year: number;
  hours: number;
};

const DUMMY_STATS: VolunteerStats = {
  totalHours: 156,
  eventsAttended: 23,
  currentStreak: 4,
  yearsActive: 2,
  points: 1560,
};

const YEARLY_HOURS: YearlyHours[] = [
  { year: 2024, hours: 56 },
  { year: 2023, hours: 100 },
];

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function ProfileScreen() {
  const [showStreak, setShowStreak] = useState(true);
  const streakScale = useState(new Animated.Value(0))[0];
  const streakOpacity = useState(new Animated.Value(0))[0];
  const fireScale = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Start the streak animation sequence
    Animated.sequence([
      // First fade in the streak number
      Animated.parallel([
        Animated.timing(streakOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(streakScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Then animate the fire icon
      Animated.spring(fireScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide the streak overlay after animation
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(streakOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(streakScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowStreak(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetCertificate = (year: number) => {
    console.log(`Generating certificate for year ${year}`);
  };

  const renderStreakOverlay = () => {
    if (!showStreak) return null;

    return (
      <Animated.View 
        style={[
          styles.streakOverlay,
          { opacity: streakOpacity }
        ]}
      >
        <Animated.View 
          style={[
            styles.streakContainer,
            { transform: [{ scale: streakScale }] }
          ]}
        >
          <Animated.View
            style={[
              styles.fireIconContainer,
              { transform: [{ scale: fireScale }] }
            ]}
          >
            <FontAwesome5 name="fire" size={40} color="#FF6B6B" />
          </Animated.View>
          <Text style={styles.streakNumber}>{DUMMY_STATS.currentStreak}</Text>
          <Text style={styles.streakLabel}>Week Streak!</Text>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.containerWrapper}>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=1' }}
              style={styles.profileImage}
            />
            <View style={styles.badgeContainer}>
              <FontAwesome5 name="crown" size={20} color="#FFD700" />
            </View>
          </View>
          <Text style={styles.name}>Rawbin</Text>
          <Text style={styles.subtitle}>Volunteer since 2022</Text>
          
          <View style={styles.pointsContainer}>
            <FontAwesome5 name="star" size={20} color="#FFD700" style={styles.pointsIcon} />
            <Text style={styles.pointsText}>{DUMMY_STATS.points} Points Available</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Rewards Button */}
          <TouchableOpacity style={styles.rewardsButton}>
            <FontAwesome5 name="gift" size={16} color="white" style={styles.rewardsIcon} />
            <Text style={styles.rewardsButtonText}>Claim Rewards</Text>
          </TouchableOpacity>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <FontAwesome5 name="clock" size={24} color="#6B46C1" style={styles.statsIcon} />
                <Text style={styles.statsNumber}>{DUMMY_STATS.totalHours}</Text>
                <Text style={styles.statsLabel}>Total Hours</Text>
              </View>
              <View style={styles.statsItem}>
                <FontAwesome5 name="calendar-check" size={24} color="#6B46C1" style={styles.statsIcon} />
                <Text style={styles.statsNumber}>{DUMMY_STATS.eventsAttended}</Text>
                <Text style={styles.statsLabel}>Events</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <FontAwesome5 name="fire" size={24} color="#6B46C1" style={styles.statsIcon} />
                <Text style={styles.statsNumber}>{DUMMY_STATS.currentStreak}</Text>
                <Text style={styles.statsLabel}>Week Streak</Text>
              </View>
              <View style={styles.statsItem}>
                <FontAwesome5 name="medal" size={24} color="#6B46C1" style={styles.statsIcon} />
                <Text style={styles.statsNumber}>{DUMMY_STATS.yearsActive}</Text>
                <Text style={styles.statsLabel}>Years Active</Text>
              </View>
            </View>
          </View>

          {/* Yearly Certificates Section */}
          <View style={styles.certificatesSection}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Yearly Certificates</Text>
                <Text style={styles.sectionSubtitle}>
                  Get certificates for your volunteer work
                </Text>
              </View>
              <FontAwesome5 name="certificate" size={24} color="#6B46C1" />
            </View>
            
            {YEARLY_HOURS.map((yearData) => (
              <View key={yearData.year} style={styles.yearCard}>
                <View style={styles.yearInfo}>
                  <Text style={styles.year}>{yearData.year}</Text>
                  <Text style={styles.yearHours}>{yearData.hours} hours</Text>
                </View>
                <TouchableOpacity
                  style={styles.certificateButton}
                  onPress={() => handleGetCertificate(yearData.year)}
                >
                  <FontAwesome5 name="download" size={16} color="white" style={styles.buttonIcon} />
                  <Text style={styles.certificateButtonText}>Get Certificate</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {renderStreakOverlay()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6B46C1',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  contentContainer: {
    marginTop: -25,
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
  },
  pointsIcon: {
    marginRight: 8,
  },
  pointsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B46C1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 40,
    marginBottom: 16,
  },
  rewardsIcon: {
    marginRight: 8,
  },
  rewardsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsGrid: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statsItem: {
    width: '45%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  statsIcon: {
    marginBottom: 6,
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B46C1',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  certificatesSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  yearCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  yearInfo: {
    flex: 1,
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  yearHours: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  certificateButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 6,
  },
  certificateButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  streakOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  streakContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fireIconContainer: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginTop: 10,
  },
  streakLabel: {
    fontSize: 24,
    color: '#666',
    marginTop: 8,
  },
});
