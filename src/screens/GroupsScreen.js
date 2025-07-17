import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const GroupsScreen = () => {
  const [activeTab, setActiveTab] = useState('myGroups');
  const [searchText, setSearchText] = useState('');

  const [myGroups] = useState([
    {
      id: 1,
      name: 'Golden Retrievers Brasil',
      description: 'Comunidade de donos de Golden Retrievers',
      members: 15420,
      posts: 234,
      image: 'https://via.placeholder.com/120x120/FF6B6B/FFFFFF?text=🐕',
      isPrivate: false,
      lastActivity: '2h',
    },
    {
      id: 2,
      name: 'Gatos de São Paulo',
      description: 'Grupo para donos de gatos da cidade de SP',
      members: 8932,
      posts: 156,
      image: 'https://via.placeholder.com/120x120/4ECDC4/FFFFFF?text=🐱',
      isPrivate: true,
      lastActivity: '4h',
    },
    {
      id: 3,
      name: 'Pets Resgatados',
      description: 'Adoção responsável e histórias de resgate',
      members: 23567,
      posts: 445,
      image: 'https://via.placeholder.com/120x120/45B7D1/FFFFFF?text=❤️',
      isPrivate: false,
      lastActivity: '1h',
    },
  ]);

  const [suggestedGroups] = useState([
    {
      id: 4,
      name: 'Veterinários Online',
      description: 'Dicas e consultas com profissionais',
      members: 45123,
      posts: 789,
      image: 'https://via.placeholder.com/120x120/96CEB4/FFFFFF?text=🏥',
      isPrivate: false,
      mutualFriends: 12,
    },
    {
      id: 5,
      name: 'Adestradores Certificados',
      description: 'Treinamento e comportamento animal',
      members: 18765,
      posts: 321,
      image: 'https://via.placeholder.com/120x120/FFEAA7/FFFFFF?text=🎾',
      isPrivate: false,
      mutualFriends: 8,
    },
    {
      id: 6,
      name: 'Pets Idosos - Cuidados Especiais',
      description: 'Cuidados para pets na terceira idade',
      members: 9876,
      posts: 234,
      image: 'https://via.placeholder.com/120x120/DDA0DD/FFFFFF?text=👴',
      isPrivate: true,
      mutualFriends: 5,
    },
  ]);

  const GroupCard = ({ group, showJoinButton = false }) => (
    <TouchableOpacity style={styles.groupCard}>
      <Image source={{ uri: group.image }} style={styles.groupImage} />
      <View style={styles.groupInfo}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupName} numberOfLines={1}>{group.name}</Text>
          {group.isPrivate && (
            <Ionicons name="lock-closed" size={14} color={colors.textSecondary} />
          )}
        </View>
        <Text style={styles.groupDescription} numberOfLines={2}>
          {group.description}
        </Text>
        <View style={styles.groupStats}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={14} color={colors.textSecondary} />
            <Text style={styles.statText}>{group.members.toLocaleString()} membros</Text>
          </View>
          {group.posts && (
            <View style={styles.statItem}>
              <Ionicons name="chatbubbles" size={14} color={colors.textSecondary} />
              <Text style={styles.statText}>{group.posts} posts</Text>
            </View>
          )}
        </View>
        {group.mutualFriends && (
          <Text style={styles.mutualFriends}>
            {group.mutualFriends} amigos em comum
          </Text>
        )}
        {group.lastActivity && (
          <Text style={styles.lastActivity}>
            Última atividade: {group.lastActivity}
          </Text>
        )}
        {showJoinButton && (
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>
              {group.isPrivate ? 'Solicitar entrada' : 'Entrar no grupo'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar grupos..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'myGroups' && styles.activeTab]}
          onPress={() => setActiveTab('myGroups')}
        >
          <Text style={[styles.tabText, activeTab === 'myGroups' && styles.activeTabText]}>
            Meus grupos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Descobrir
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'myGroups' ? (
          <View style={styles.content}>
            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="add-circle" size={24} color={colors.primary} />
                <Text style={styles.actionText}>Criar grupo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="search-circle" size={24} color={colors.success} />
                <Text style={styles.actionText}>Encontrar grupos</Text>
              </TouchableOpacity>
            </View>

            {/* My Groups */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Seus grupos ({myGroups.length})</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
              </View>
              {myGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Filter Options */}
            <View style={styles.filterContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Cães</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Gatos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Veterinária</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                  <Text style={styles.filterText}>Adestramento</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* Suggested Groups */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Grupos sugeridos para você</Text>
              {suggestedGroups.map((group) => (
                <GroupCard key={group.id} group={group} showJoinButton={true} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: 8,
    paddingTop: 16,
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
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingLeft: 16,
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  groupCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  groupStats: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  mutualFriends: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lastActivity: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
});

export default GroupsScreen;

