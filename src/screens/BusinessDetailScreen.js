import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UIContext } from '../contexts/UIContext';
import { AuthContext } from '../contexts/AuthContext';
import ApiService from '../services/api';

const BusinessDetailScreen = ({ route, navigation }) => {
  const { businessId } = route.params;
  const { colors } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('services');

  useEffect(() => {
    loadBusinessData();
  }, [businessId]);

  const loadBusinessData = async () => {
    try {
      setLoading(true);
      const [businessResponse, servicesResponse] = await Promise.all([
        ApiService.getBusiness(businessId),
        ApiService.getBusinessServices(businessId)
      ]);
      
      setBusiness(businessResponse);
      setServices(servicesResponse.services || []);
    } catch (error) {
      console.error('Erro ao carregar dados do negócio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (business?.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (business?.phone) {
      const phoneNumber = business.phone.replace(/\D/g, '');
      Linking.openURL(`whatsapp://send?phone=55${phoneNumber}`);
    }
  };

  const handleSchedule = (service) => {
    navigation.navigate('Appointment', { 
      businessId: business.id, 
      serviceId: service.id,
      businessName: business.name,
      serviceName: service.name
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Ionicons key={i} name="star-outline" size={16} color="#E4E6EA" />);
    }
    return stars;
  };

  const renderServiceCard = (service) => (
    <View key={service.id} style={[styles.serviceCard, { borderColor: colors.border }]}>
      <View style={styles.serviceInfo}>
        <Text style={[styles.serviceName, { color: colors.textPrimary }]}>
          {service.name}
        </Text>
        <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>
          {service.description}
        </Text>
        
        <View style={styles.serviceDetails}>
          <View style={styles.servicePrice}>
            <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Preço:</Text>
            <Text style={[styles.priceValue, { color: colors.primary }]}>
              R$ {service.price?.toFixed(2) || 'Consultar'}
            </Text>
          </View>
          
          <View style={styles.serviceDuration}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.durationText, { color: colors.textSecondary }]}>
              {service.duration_minutes} min
            </Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.scheduleButton, { backgroundColor: colors.primary }]}
        onPress={() => handleSchedule(service)}
      >
        <Text style={[styles.scheduleButtonText, { color: colors.white }]}>
          Agendar
        </Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 16,
      zIndex: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      padding: 8,
    },
    businessImage: {
      width: '100%',
      height: 250,
      backgroundColor: colors.background,
    },
    businessInfo: {
      backgroundColor: colors.white,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: -20,
    },
    businessHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    businessName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textPrimary,
      flex: 1,
    },
    businessType: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      marginLeft: 12,
    },
    businessTypeText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: '600',
    },
    businessDescription: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    businessStats: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
    },
    stars: {
      flexDirection: 'row',
      marginRight: 8,
    },
    ratingText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    reviewCount: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    businessContact: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    contactText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 8,
      flex: 1,
    },
    actionButtons: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.white,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 6,
    },
    primaryButtonText: {
      color: colors.white,
    },
    secondaryButtonText: {
      color: colors.textPrimary,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
    },
    tabActive: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '500',
    },
    tabTextActive: {
      color: colors.primary,
    },
    tabTextInactive: {
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    serviceCard: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    serviceInfo: {
      flex: 1,
      marginBottom: 12,
    },
    serviceName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    serviceDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    serviceDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    servicePrice: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: 12,
      marginRight: 4,
    },
    priceValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    serviceDuration: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    durationText: {
      fontSize: 12,
      marginLeft: 4,
    },
    scheduleButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    scheduleButtonText: {
      fontSize: 14,
      fontWeight: '600',
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
      color: colors.textSecondary,
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.emptyText}>Carregando informações...</Text>
      </View>
    );
  }

  if (!business) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Ionicons name="business-outline" size={64} color={colors.inactive} />
        <Text style={styles.emptyText}>
          Estabelecimento não encontrado.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Image
            source={{ uri: business.image_url || 'https://via.placeholder.com/400x250' }}
            style={styles.businessImage}
          />
        </View>

        <View style={styles.businessInfo}>
          <View style={styles.businessHeader}>
            <Text style={styles.businessName}>{business.name}</Text>
            <View style={styles.businessType}>
              <Text style={styles.businessTypeText}>
                {business.business_type === 'petshop' ? 'Petshop' :
                 business.business_type === 'clinic' ? 'Clínica' : 'Completo'}
              </Text>
            </View>
          </View>

          <Text style={styles.businessDescription}>
            {business.description}
          </Text>

          <View style={styles.businessStats}>
            <View style={styles.rating}>
              <View style={styles.stars}>
                {renderStars(business.rating)}
              </View>
              <Text style={styles.ratingText}>
                {business.rating}
              </Text>
            </View>
            <Text style={styles.reviewCount}>
              ({business.total_reviews} avaliações)
            </Text>
          </View>

          {business.address && (
            <View style={styles.businessContact}>
              <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.contactText}>
                {business.address}, {business.city} - {business.state}
              </Text>
            </View>
          )}

          {business.phone && (
            <View style={styles.businessContact}>
              <Ionicons name="call-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.contactText}>{business.phone}</Text>
            </View>
          )}

          {business.email && (
            <View style={styles.businessContact}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.contactText}>{business.email}</Text>
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleCall}
            >
              <Ionicons name="call" size={20} color={colors.white} />
              <Text style={[styles.buttonText, styles.primaryButtonText]}>Ligar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'services' && styles.tabActive]}
            onPress={() => setSelectedTab('services')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'services' ? styles.tabTextActive : styles.tabTextInactive
            ]}>
              Serviços
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'info' && styles.tabActive]}
            onPress={() => setSelectedTab('info')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'info' ? styles.tabTextActive : styles.tabTextInactive
            ]}>
              Informações
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {selectedTab === 'services' ? (
            services.length > 0 ? (
              services.map(renderServiceCard)
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="list-outline" size={64} color={colors.inactive} />
                <Text style={styles.emptyText}>
                  Nenhum serviço cadastrado ainda.
                </Text>
              </View>
            )
          ) : (
            <View>
              <Text style={[styles.serviceName, { color: colors.textPrimary }]}>
                Horário de Funcionamento
              </Text>
              <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>
                Segunda a Sábado: 8h às 18h{'\n'}
                Domingo: Fechado
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessDetailScreen;

