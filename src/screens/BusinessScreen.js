import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UIContext } from '../contexts/UIContext';
import { AuthContext } from '../contexts/AuthContext';
import ApiService from '../services/api';

const BusinessScreen = ({ navigation }) => {
  const { colors } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Todos', icon: 'grid-outline' },
    { id: 'petshop', name: 'Petshops', icon: 'storefront-outline' },
    { id: 'clinic', name: 'Clínicas', icon: 'medical-outline' },
    { id: 'both', name: 'Completos', icon: 'business-outline' }
  ];

  useEffect(() => {
    loadBusinesses();
  }, [selectedFilter, searchText]);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedFilter !== 'all') filters.type = selectedFilter;
      if (searchText) filters.search = searchText;
      
      const response = await ApiService.getBusinesses(filters);
      setBusinesses(response.businesses || []);
    } catch (error) {
      console.error('Erro ao carregar negócios:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={14} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFD700" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Ionicons key={i} name="star-outline" size={14} color="#E4E6EA" />);
    }
    return stars;
  };

  const renderBusinessCard = (business) => (
    <TouchableOpacity
      key={business.id}
      style={[styles.businessCard, { borderColor: colors.border }]}
      onPress={() => navigation.navigate('BusinessDetail', { businessId: business.id })}
    >
      <Image
        source={{ uri: business.image_url || 'https://via.placeholder.com/300x200' }}
        style={styles.businessImage}
      />
      
      <View style={styles.businessInfo}>
        <View style={styles.businessHeader}>
          <Text style={[styles.businessName, { color: colors.textPrimary }]}>
            {business.name}
          </Text>
          <View style={styles.businessType}>
            <Ionicons
              name={business.business_type === 'petshop' ? 'storefront' : 
                    business.business_type === 'clinic' ? 'medical' : 'business'}
              size={16}
              color={colors.primary}
            />
          </View>
        </View>

        <Text style={[styles.businessDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {business.description}
        </Text>

        <View style={styles.businessMeta}>
          <View style={styles.rating}>
            <View style={styles.stars}>
              {renderStars(business.rating)}
            </View>
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {business.rating} ({business.total_reviews} avaliações)
            </Text>
          </View>
        </View>

        <View style={styles.businessFooter}>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {business.city}, {business.state}
            </Text>
          </View>
          
          {business.phone && (
            <TouchableOpacity style={styles.phoneButton}>
              <Ionicons name="call-outline" size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.white,
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.textPrimary,
    },
    filtersContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 12,
      borderRadius: 20,
      borderWidth: 1,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonInactive: {
      backgroundColor: colors.white,
      borderColor: colors.border,
    },
    filterIcon: {
      marginRight: 6,
    },
    filterText: {
      fontSize: 14,
      fontWeight: '500',
    },
    filterTextActive: {
      color: colors.white,
    },
    filterTextInactive: {
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    businessCard: {
      backgroundColor: colors.white,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    businessImage: {
      width: '100%',
      height: 200,
      backgroundColor: colors.background,
    },
    businessInfo: {
      padding: 16,
    },
    businessHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    businessName: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
    },
    businessType: {
      marginLeft: 8,
    },
    businessDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    businessMeta: {
      marginBottom: 12,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stars: {
      flexDirection: 'row',
      marginRight: 8,
    },
    ratingText: {
      fontSize: 12,
    },
    businessFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    location: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    locationText: {
      fontSize: 12,
      marginLeft: 4,
    },
    phoneButton: {
      padding: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Carregando estabelecimentos...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Petshops e Clínicas</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar estabelecimentos..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id ? styles.filterButtonActive : styles.filterButtonInactive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Ionicons
                name={filter.icon}
                size={16}
                color={selectedFilter === filter.id ? colors.white : colors.textSecondary}
                style={styles.filterIcon}
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id ? styles.filterTextActive : styles.filterTextInactive
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {businesses.length > 0 ? (
          businesses.map(renderBusinessCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="business-outline" size={64} color={colors.inactive} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum estabelecimento encontrado.{'\n'}
              Tente ajustar os filtros de busca.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BusinessScreen;

