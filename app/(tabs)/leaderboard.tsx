import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Animated, Dimensions } from 'react-native';

type Volunteer = {
  id: string;
  name: string;
  hours: number;
  avatar: string;
};

const VOLUNTEERS: Volunteer[] = [
  {
    id: '1',
    name: 'Rawbin',
    hours: 156,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=1',
  },
  {
    id: '2',
    name: 'Waggy Rogers',
    hours: 142,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=2',
  },
  {
    id: '3',
    name: 'Surgil Hawkins',
    hours: 135,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=3',
  },
  {
    id: '4',
    name: 'Fake the dog',
    hours: 128,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=4',
  },
  {
    id: '5',
    name: 'Sinn the Human',
    hours: 120,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=5',
  },
  {
    id: '6',
    name: 'Jake the Cat',
    hours: 115,
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=6',
  }
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const PODIUM_WIDTH = (SCREEN_WIDTH - 80) / 3;
const PODIUM_HEIGHTS = [180, 140, 100]; // Fixed heights for 1st, 2nd, 3rd

export default function LeaderboardScreen() {
  const top3 = VOLUNTEERS.slice(0, 3);
  const rest = VOLUNTEERS.slice(3);

  // Animation values for each podium
  const thirdPlaceAnim = new Animated.Value(0);
  const secondPlaceAnim = new Animated.Value(0);
  const firstPlaceAnim = new Animated.Value(0);

  useEffect(() => {
    // Sequence the animations
    Animated.sequence([
      // Third place appears first
      Animated.timing(thirdPlaceAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Second place appears
      Animated.timing(secondPlaceAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // First place appears last
      Animated.timing(firstPlaceAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return '#FFD700'; // Gold
      case 1:
        return '#C0C0C0'; // Silver
      case 2:
        return '#CD7F32'; // Bronze
      default:
        return '#f0f0f0';
    }
  };

  const renderTop3 = () => (
    <View style={styles.top3Container}>
      <View style={styles.podiumContainer}>
        {/* Second Place */}
        <Animated.View 
          style={[
            styles.podiumWrapper,
            { transform: [{ scale: secondPlaceAnim }] }
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: top3[1].avatar }} style={styles.top3Avatar} />
            <View style={[styles.medalBadge, { backgroundColor: getMedalColor(1) }]}>
              <Text style={styles.medalText}>2</Text>
            </View>
          </View>
          <View style={[styles.podium, { height: PODIUM_HEIGHTS[1], backgroundColor: getMedalColor(1) }]}>
            <Text style={styles.podiumHours}>{top3[1].hours}h</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>{top3[1].name}</Text>
        </Animated.View>

        {/* First Place */}
        <Animated.View 
          style={[
            styles.podiumWrapper,
            { transform: [{ scale: firstPlaceAnim }] }
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: top3[0].avatar }} style={[styles.top3Avatar, styles.firstPlaceAvatar]} />
            <View style={[styles.medalBadge, { backgroundColor: getMedalColor(0) }]}>
              <Text style={styles.medalText}>1</Text>
            </View>
          </View>
          <View style={[styles.podium, { height: PODIUM_HEIGHTS[0], backgroundColor: getMedalColor(0) }]}>
            <Text style={styles.podiumHours}>{top3[0].hours}h</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>{top3[0].name}</Text>
        </Animated.View>

        {/* Third Place */}
        <Animated.View 
          style={[
            styles.podiumWrapper,
            { transform: [{ scale: thirdPlaceAnim }] }
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image source={{ uri: top3[2].avatar }} style={styles.top3Avatar} />
            <View style={[styles.medalBadge, { backgroundColor: getMedalColor(2) }]}>
              <Text style={styles.medalText}>3</Text>
            </View>
          </View>
          <View style={[styles.podium, { height: PODIUM_HEIGHTS[2], backgroundColor: getMedalColor(2) }]}>
            <Text style={styles.podiumHours}>{top3[2].hours}h</Text>
          </View>
          <Text style={styles.podiumName} numberOfLines={1}>{top3[2].name}</Text>
        </Animated.View>
      </View>
    </View>
  );

  const renderListItem = ({ item, index }: { item: Volunteer; index: number }) => {
    return (
      <View style={styles.leaderboardItem}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{index + 4}</Text>
        </View>
        <Image source={{ uri: item.avatar }} style={styles.listAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.hours}>{item.hours} hours</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Volunteers</Text>
        <Text style={styles.headerSubtitle}>This Month</Text>
      </View>
      
      <FlatList
        data={rest}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderTop3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#6B46C1',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  top3Container: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: PODIUM_HEIGHTS[0] + 100, // Extra space for avatars
    paddingBottom: 20,
  },
  podiumWrapper: {
    alignItems: 'center',
    width: PODIUM_WIDTH,
  },
  podium: {
    width: PODIUM_WIDTH * 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
  },
  podiumHours: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  podiumName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    width: PODIUM_WIDTH * 0.9,
    textAlign: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  top3Avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
  },
  firstPlaceAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  medalBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  medalText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  hours: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
