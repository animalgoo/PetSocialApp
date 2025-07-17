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
  online: '#42B72A',
  unread: '#E41E3F',
};

const ChatScreen = () => {
  const [searchText, setSearchText] = useState('');

  const [conversations] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      lastMessage: 'Rex está se comportando muito bem!',
      time: '2m',
      avatar: 'https://via.placeholder.com/50x50/1877F2/FFFFFF?text=M',
      isOnline: true,
      unreadCount: 2,
      isTyping: false,
    },
    {
      id: 2,
      name: 'João Santos',
      lastMessage: 'Obrigado pelas dicas de adestramento',
      time: '15m',
      avatar: 'https://via.placeholder.com/50x50/42B72A/FFFFFF?text=J',
      isOnline: true,
      unreadCount: 0,
      isTyping: false,
    },
    {
      id: 3,
      name: 'Ana Costa',
      lastMessage: 'Você: Que bom que o Buddy melhorou!',
      time: '1h',
      avatar: 'https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=A',
      isOnline: false,
      unreadCount: 0,
      isTyping: false,
    },
    {
      id: 4,
      name: 'Grupo: Golden Retrievers Brasil',
      lastMessage: 'Carlos: Alguém tem dicas para pelos embaraçados?',
      time: '2h',
      avatar: 'https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=G',
      isOnline: false,
      unreadCount: 5,
      isTyping: false,
      isGroup: true,
    },
    {
      id: 5,
      name: 'Dr. Pedro Veterinário',
      lastMessage: 'Está digitando...',
      time: '3h',
      avatar: 'https://via.placeholder.com/50x50/45B7D1/FFFFFF?text=P',
      isOnline: true,
      unreadCount: 0,
      isTyping: true,
    },
    {
      id: 6,
      name: 'Loja Pet Center',
      lastMessage: 'Sua encomenda foi enviada! 📦',
      time: '1d',
      avatar: 'https://via.placeholder.com/50x50/96CEB4/FFFFFF?text=L',
      isOnline: false,
      unreadCount: 1,
      isTyping: false,
    },
    {
      id: 7,
      name: 'Grupo: Pets Resgatados',
      lastMessage: 'Marina: Encontrei um gatinho na rua...',
      time: '2d',
      avatar: 'https://via.placeholder.com/50x50/FFEAA7/FFFFFF?text=R',
      isOnline: false,
      unreadCount: 0,
      isTyping: false,
      isGroup: true,
    },
  ]);

  const [activeUsers] = useState([
    {
      id: 1,
      name: 'Maria',
      avatar: 'https://via.placeholder.com/40x40/1877F2/FFFFFF?text=M',
    },
    {
      id: 2,
      name: 'João',
      avatar: 'https://via.placeholder.com/40x40/42B72A/FFFFFF?text=J',
    },
    {
      id: 3,
      name: 'Dr. Pedro',
      avatar: 'https://via.placeholder.com/40x40/45B7D1/FFFFFF?text=P',
    },
    {
      id: 4,
      name: 'Carlos',
      avatar: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=C',
    },
    {
      id: 5,
      name: 'Lucia',
      avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=L',
    },
  ]);

  const ConversationItem = ({ conversation }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: conversation.avatar }} style={styles.avatar} />
        {conversation.isOnline && <View style={styles.onlineIndicator} />}
        {conversation.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={[
            styles.conversationName,
            conversation.unreadCount > 0 && styles.unreadName
          ]}>
            {conversation.name}
          </Text>
          <Text style={[
            styles.conversationTime,
            conversation.unreadCount > 0 && styles.unreadTime
          ]}>
            {conversation.time}
          </Text>
        </View>
        
        <View style={styles.messagePreview}>
          <Text style={[
            styles.lastMessage,
            conversation.unreadCount > 0 && styles.unreadMessage,
            conversation.isTyping && styles.typingMessage
          ]} numberOfLines={1}>
            {conversation.lastMessage}
          </Text>
          {conversation.isGroup && (
            <Ionicons 
              name="people" 
              size={14} 
              color={colors.textSecondary} 
              style={styles.groupIcon}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ActiveUserItem = ({ user }) => (
    <TouchableOpacity style={styles.activeUserItem}>
      <View style={styles.activeUserAvatar}>
        <Image source={{ uri: user.avatar }} style={styles.activeUserImage} />
        <View style={styles.activeUserIndicator} />
      </View>
      <Text style={styles.activeUserName} numberOfLines={1}>{user.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar conversas..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="camera" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="create-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Active Users */}
        <View style={styles.activeUsersSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeUsersScroll}>
            <TouchableOpacity style={styles.addStoryButton}>
              <View style={styles.addStoryAvatar}>
                <Ionicons name="add" size={20} color={colors.white} />
              </View>
              <Text style={styles.addStoryText}>Sua história</Text>
            </TouchableOpacity>
            
            {activeUsers.map((user) => (
              <ActiveUserItem key={user.id} user={user} />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="people" size={20} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>Criar grupo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="person-add" size={20} color={colors.success} />
            </View>
            <Text style={styles.quickActionText}>Encontrar amigos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="heart" size={20} color={colors.unread} />
            </View>
            <Text style={styles.quickActionText}>Favoritos</Text>
          </TouchableOpacity>
        </View>

        {/* Conversations List */}
        <View style={styles.conversationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mensagens</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {conversations.map((conversation) => (
            <ConversationItem key={conversation.id} conversation={conversation} />
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
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    marginBottom: 12,
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
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  activeUsersSection: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: colors.background,
  },
  activeUsersScroll: {
    paddingLeft: 16,
  },
  addStoryButton: {
    alignItems: 'center',
    marginRight: 16,
    width: 60,
  },
  addStoryAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  addStoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activeUserItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 60,
  },
  activeUserAvatar: {
    position: 'relative',
    marginBottom: 6,
  },
  activeUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.border,
  },
  activeUserIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  activeUserName: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActionsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 8,
    borderBottomColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  conversationsSection: {
    backgroundColor: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.border,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.unread,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  unreadText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    flex: 1,
  },
  unreadName: {
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  unreadTime: {
    color: colors.primary,
    fontWeight: '600',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  unreadMessage: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  typingMessage: {
    color: colors.primary,
    fontStyle: 'italic',
  },
  groupIcon: {
    marginLeft: 4,
  },
});

export default ChatScreen;

