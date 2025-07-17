import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { colors, logoUrl, updateColors, updateLogo } = useUI();
  const { user, logout } = useAuth();
  
  const [newPrimaryColor, setNewPrimaryColor] = useState(colors.primary);
  const [newLogoUrl, setNewLogoUrl] = useState(logoUrl || '');

  const handleUpdateColors = async () => {
    if (!newPrimaryColor.match(/^#[0-9A-F]{6}$/i)) {
      Alert.alert('Erro', 'Por favor, insira uma cor válida no formato #RRGGBB');
      return;
    }

    const newColors = {
      ...colors,
      primary: newPrimaryColor
    };

    const success = await updateColors(newColors);
    
    if (success) {
      Alert.alert('Sucesso', 'Cor primária atualizada com sucesso!');
    } else {
      Alert.alert('Erro', 'Não foi possível atualizar a cor. Tente novamente.');
    }
  };

  const handleUpdateLogo = async () => {
    if (!newLogoUrl.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma URL válida para a logo');
      return;
    }

    const success = await updateLogo(newLogoUrl);
    
    if (success) {
      Alert.alert('Sucesso', 'Logo atualizada com sucesso!');
    } else {
      Alert.alert('Erro', 'Não foi possível atualizar a logo. Tente novamente.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.white,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      backgroundColor: colors.white,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 15,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    userAvatarText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    inputGroup: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.textPrimary,
      backgroundColor: colors.white,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    logoutButton: {
      backgroundColor: colors.notification,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    colorPreview: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10,
      borderWidth: 2,
      borderColor: colors.border,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputFlex: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView style={styles.content}>
        {user && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil</Text>
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalização de UI</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cor Primária</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={newPrimaryColor}
                onChangeText={setNewPrimaryColor}
                placeholder="#1877F2"
                placeholderTextColor={colors.textSecondary}
              />
              <View
                style={[
                  styles.colorPreview,
                  { backgroundColor: newPrimaryColor }
                ]}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleUpdateColors}>
              <Text style={styles.buttonText}>Atualizar Cor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL da Logo</Text>
            <TextInput
              style={styles.input}
              value={newLogoUrl}
              onChangeText={setNewLogoUrl}
              placeholder="https://exemplo.com/logo.png"
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateLogo}>
              <Text style={styles.buttonText}>Atualizar Logo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {user && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={[styles.buttonText, { color: colors.white }]}>
              Sair da Conta
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

