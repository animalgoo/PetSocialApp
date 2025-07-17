import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Facebook-inspired color scheme
const colors = {
  primary: '#1877F2',
  background: '#F0F2F5',
  white: '#FFFFFF',
  textPrimary: '#1C1E21',
  textSecondary: '#65676B',
  border: '#E4E6EA',
  success: '#42B72A',
  inactive: '#8A8D91',
  lightBlue: '#E7F3FF',
};

const ProfileScreen = () => {
  const [user] = useState({
    name: 'João Silva',
    bio: 'Amante de animais 🐕🐱 | Veterinário | São Paulo, SP',
    posts: 127,
    followers: 1234,
    following: 567,
    coverPhoto: 'https://via.placeholder.com/400x200/1877F2/FFFFFF?text=Cover',
    profilePhoto: 'https://via.placeholder.com/120x120/42B72A/FFFFFF?text=JS',
  });

  const [pets] = useState([
    {
      id: 1,
      name: 'Rex',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: '3 anos',
      photo: 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=🐕',
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamês',
      age: '2 anos',
      photo: 'https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=🐱',
    },
    {
      id: 3,
      name: 'Buddy',
      species: 'Cão',
      breed: 'Labrador',
      age: '5 anos',
      photo: 'https://via.placeholder.com/80x80/45B7D1/FFFFFF?text=🐕',
    },
  ]);

  const [recentPosts] = useState([
    {
      id: 1,
      content: 'Rex adorou o novo brinquedo! 🐕',
      time: '2h',
      likes: 15,
      comments: 3,
    },
    {
      id: 2,
      content: 'Passeio no parque com Luna e Buddy 🌳',
      time: '1d',
      likes: 28,
      comments: 8,
    },
    {
      id: 3,
      content: 'Dicas de cuidados para pets no inverno ❄️',
      time: '3d',
      likes: 42,
      comments: 15,
    },
  ]);

  const PetCard = ({ pet }) => (
    <TouchableOpacity style={styles.petCard}>
      <Image source={{ uri: pet.photo }} style={styles.petPhoto} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petDetails}>{pet.breed}</Text>
        <Text style={styles.petAge}>{pet.age}</Text>
      </View>
    </TouchableOpacity>
  );

  const PostCard = ({ post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: user.profilePhoto }} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUserName}>{user.name}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postStats}>
        <Text style={styles.statsText}>{post.likes} curtidas</Text>
        <Text style={styles.statsText}>{post.comments} comentários</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
          <TouchableOpacity style={styles.editCoverButton}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePhotoContainer}>
            <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
            <TouchableOpacity style={styles.editPhotoButton}>
              <Ionicons name="camera" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userBio}>{user.bio}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.posts}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.followers}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.following}</Text>
                <Text style={styles.statLabel}>Seguindo</Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Ionicons name="add" size={16} color={colors.white} />
                <Text style={styles.primaryButtonText}>Adicionar história</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="create-outline" size={16} color={colors.textPrimary} />
                <Text style={styles.secondaryButtonText}>Editar perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Pets Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meus Pets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.petsScroll}>
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </ScrollView>
        </View>

        {/* Recent Posts Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Posts Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: 'relative',
    height: 200,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  editCoverButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  profileContainer: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    borderBottomWidth: 8,
    borderBottomColor: colors.background,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.border,
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 75,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userInfoContainer: {
    paddingHorizontal: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 6,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: 6,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginLeft: 6,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    marginBottom: 8,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  petsScroll: {
    paddingLeft: 16,
  },
  petCard: {
    marginRight: 12,
    alignItems: 'center',
    width: 100,
  },
  petPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  petInfo: {
    alignItems: 'center',
  },
  petName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  petDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 1,
  },
  petAge: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  postCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
  },
  postUserInfo: {
    flex: 1,
    marginLeft: 8,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  postTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;

