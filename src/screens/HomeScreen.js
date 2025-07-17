import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { colors, logoUrl } = useUI();
  const { user } = useAuth();
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Maria Silva',
      pet: 'Luna (Golden Retriever)',
      time: '2h',
      content: 'Luna aprendeu um novo truque hoje! 🐕✨',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false
    },
    {
      id: 2,
      user: 'João Santos',
      pet: 'Mimi (Gato Persa)',
      time: '4h',
      content: 'Dia de spa para a Mimi! Ela está adorando 😸',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
      likes: 18,
      comments: 5,
      shares: 2,
      liked: true
    },
    {
      id: 3,
      user: 'Ana Costa',
      pet: 'Rex (Pastor Alemão)',
      time: '6h',
      content: 'Passeio no parque com o Rex. Ele ama correr! 🏃‍♂️🐕',
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400',
      likes: 31,
      comments: 12,
      shares: 7,
      liked: false
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 10,
    },
    logoPlaceholder: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    logoText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      marginLeft: 15,
    },
    createPostContainer: {
      backgroundColor: colors.white,
      margin: 10,
      borderRadius: 10,
      padding: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    createPostRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    userAvatarText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    createPostInput: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.textSecondary,
    },
    createPostActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 10,
    },
    createPostAction: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    createPostActionText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    postCard: {
      backgroundColor: colors.white,
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      paddingBottom: 10,
    },
    postAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    postAvatarText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
    postUserInfo: {
      flex: 1,
    },
    postUserName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    postPetName: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    postTime: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    postContent: {
      paddingHorizontal: 15,
      paddingBottom: 10,
    },
    postText: {
      fontSize: 16,
      color: colors.textPrimary,
      lineHeight: 22,
    },
    postImage: {
      width: '100%',
      height: 250,
      marginTop: 10,
    },
    postActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    postAction: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 15,
    },
    postActionText: {
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
    },
    likedText: {
      color: colors.primary,
    },
    normalText: {
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {logoUrl ? (
            <Image source={{ uri: logoUrl }} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>PS</Text>
            </View>
          )}
          <Text style={styles.headerTitle}>PetSocial</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('SettingsModal')}
          >
            <Ionicons name="settings" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Criar Post */}
        <View style={styles.createPostContainer}>
          <View style={styles.createPostRow}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {user ? user.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.createPostInput}
              onPress={() => navigation.navigate('PostModal')}
            >
              <Text style={styles.createPostInput}>
                Compartilhe algo sobre seu pet!
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createPostActions}>
            <TouchableOpacity style={styles.createPostAction}>
              <Ionicons name="camera" size={20} color="#45BD62" />
              <Text style={styles.createPostActionText}>Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createPostAction}>
              <Ionicons name="videocam" size={20} color="#F02849" />
              <Text style={styles.createPostActionText}>Vídeo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createPostAction}>
              <Ionicons name="location" size={20} color="#F7931E" />
              <Text style={styles.createPostActionText}>Local</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarText}>
                  {post.user.charAt(0)}
                </Text>
              </View>
              <View style={styles.postUserInfo}>
                <Text style={styles.postUserName}>{post.user}</Text>
                <Text style={styles.postPetName}>{post.pet}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>

            <View style={styles.postContent}>
              <Text style={styles.postText}>{post.content}</Text>
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
              )}
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.postAction}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons 
                  name={post.liked ? "heart" : "heart-outline"} 
                  size={20} 
                  color={post.liked ? colors.notification : colors.textSecondary} 
                />
                <Text style={[styles.postActionText, post.liked ? styles.likedText : styles.normalText]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.postActionText, styles.normalText]}>
                  {post.comments}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.postActionText, styles.normalText]}>
                  {post.shares}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

