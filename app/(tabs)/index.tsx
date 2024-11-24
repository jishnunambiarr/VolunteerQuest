import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type VolunteerCard = {
  id: string;
  title: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
  image: string;
  requirements: string;
  impact: string;
};

const DUMMY_DATA: VolunteerCard[] = [
  {
    id: '1',
    title: 'Food Bank Assistant',
    organization: 'City Food Bank',
    duration: '3 hours',
    location: 'Downtown Center',
    description: 'Help sort and distribute food to families in need. Join our dedicated team in making a difference in the lives of local families facing food insecurity.',
    image: 'https://picsum.photos/seed/food1/800/600',
    requirements: '• Must be 16 or older\n• Able to lift 20 lbs\n• Comfortable standing for long periods',
    impact: 'Your 3 hours help provide meals to over 50 families in need.',
  },
  {
    id: '2',
    title: 'Park Cleanup Drive',
    organization: 'Green Earth',
    duration: '2 hours',
    location: 'Central Park',
    description: 'Join our weekly park cleanup initiative to maintain our beautiful green spaces. Help remove litter, maintain trails, and preserve nature.',
    image: 'https://picsum.photos/seed/park2/800/600',
    requirements: '• All ages welcome\n• Outdoor activity\n• Equipment provided',
    impact: 'Help maintain 5 acres of public park space for community enjoyment.',
  },
  {
    id: '3',
    title: 'Senior Home Companion',
    organization: 'Golden Years Care',
    duration: '4 hours',
    location: 'Sunshine Retirement Home',
    description: 'Spend meaningful time with elderly residents through activities like reading, playing games, or simply engaging in conversation.',
    image: 'https://picsum.photos/seed/senior3/800/600',
    requirements: '• Background check required\n• Good communication skills\n• Patience and empathy',
    impact: 'Provide companionship to seniors and reduce social isolation.',
  }
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

export default function ExploreScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<VolunteerCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCardPress = (card: VolunteerCard) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const renderCard = ({ item }: { item: VolunteerCard }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => handleCardPress(item)}
        style={styles.card}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.organization}>{item.organization}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="clock" size={14} color="#6B46C1" />
              <Text style={styles.details}>{item.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="map-marker-alt" size={14} color="#6B46C1" />
              <Text style={styles.details}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.tapPrompt}>Tap to learn more</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search opportunities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      {/* Horizontal Scrolling Cards */}
      <FlatList
        data={DUMMY_DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20} // Card width + margin
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.cardList}
      />

      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView bounces={false}>
              {selectedCard && (
                <>
                  <Image source={{ uri: selectedCard.image }} style={styles.modalImage} />
                  <View style={styles.modalDetails}>
                    <Text style={styles.modalTitle}>{selectedCard.title}</Text>
                    <Text style={styles.modalOrg}>{selectedCard.organization}</Text>
                    
                    <View style={styles.modalDetailRow}>
                      <FontAwesome5 name="clock" size={16} color="#6B46C1" />
                      <Text style={styles.modalDetailText}>{selectedCard.duration}</Text>
                    </View>
                    
                    <View style={styles.modalDetailRow}>
                      <FontAwesome5 name="map-marker-alt" size={16} color="#6B46C1" />
                      <Text style={styles.modalDetailText}>{selectedCard.location}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.modalDescription}>{selectedCard.description}</Text>

                    <Text style={styles.sectionTitle}>Requirements</Text>
                    <Text style={styles.modalDescription}>{selectedCard.requirements}</Text>

                    <Text style={styles.sectionTitle}>Your Impact</Text>
                    <Text style={styles.modalDescription}>{selectedCard.impact}</Text>

                    <TouchableOpacity 
                      style={styles.applyButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.applyButtonText}>Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome5 name="times" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  cardList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: 480,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  organization: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  details: {
    fontSize: 16,
    color: '#444',
    marginLeft: 6,
  },
  tapPrompt: {
    fontSize: 14,
    color: '#6B46C1',
    marginTop: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalDetails: {
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  modalOrg: {
    fontSize: 20,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalDetailText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 24,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  applyButton: {
    backgroundColor: '#6B46C1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
