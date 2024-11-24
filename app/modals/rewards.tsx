// ./modals/rewards.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

type Reward = {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
};

const AVAILABLE_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Amazon Gift Card',
    description: '€25 Amazon Gift Card',
    points: 500,
    icon: 'gift',
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    description: 'Exclusive volunteer program t-shirt',
    points: 300,
    icon: 'tshirt',
  },
  {
    id: '3',
    name: 'Professional Course',
    description: 'Access to online learning platform',
    points: 1000,
    icon: 'graduation-cap',
  },
  {
    id: '4',
    name: 'Coffee Voucher',
    description: '€10 Starbucks Gift Card',
    points: 200,
    icon: 'coffee',
  },
  {
    id: '5',
    name: 'Meet The CDO',
    description: 'Get to meet the CDO',
    points: 1500,
    icon: 'user-tie',
  }
];

export default function RewardsScreen() {
  const params = useLocalSearchParams();
  const availablePoints = Number(params.points) || 1560;

  const handleClaimReward = (reward: Reward) => {
    if (availablePoints >= reward.points) {
      Alert.alert(
        'Confirm Reward',
        `Would you like to claim ${reward.name} for ${reward.points} points?`,
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Claim',
            onPress: () => {
              Alert.alert(
                'Success!',
                'Your reward has been claimed. Check your email for details.',
                [{ text: 'OK' }]
              );
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Insufficient Points',
        `You need ${reward.points - availablePoints} more points to claim this reward.`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Points Header */}
      <View style={styles.header}>
        <View style={styles.pointsContainer}>
          <FontAwesome5 name="star" size={24} color="#FFD700" />
          <Text style={styles.pointsText}>{availablePoints} Points Available</Text>
        </View>
      </View>

      <ScrollView style={styles.rewardsList}>
        {AVAILABLE_REWARDS.map((reward) => (
          <View key={reward.id} style={styles.rewardCard}>
            <View style={styles.rewardIconContainer}>
              <FontAwesome5 name={reward.icon} size={28} color="#6B46C1" />
            </View>
            
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <View style={styles.pointsRequired}>
                <FontAwesome5 name="star" size={14} color="#FFD700" />
                <Text style={styles.pointsText2}>{reward.points} points</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.claimButton,
                availablePoints < reward.points && styles.disabledButton
              ]}
              onPress={() => handleClaimReward(reward)}
            >
              <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  pointsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  rewardsList: {
    paddingHorizontal: 16,
  },
  rewardCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  pointsRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pointsText2: {
    color: '#666',
    marginLeft: 6,
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  claimButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
