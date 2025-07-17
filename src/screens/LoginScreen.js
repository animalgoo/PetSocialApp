import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUI } from '../contexts/UIContext';
import { API } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const { colors } = useUI();

  const handleLogin = (provider) => {
    // Simulate login for now
    console.log(`Login with ${provider}`);
    // In a real app, this would redirect to the OAuth provider
    // and then back to the app with a token.
    // For now, we'll just navigate to the main app.
    navigation.replace('Main');
  };

  const handleGuestLogin = () => {
    navigation.replace('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../../assets/animalgo_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.tagline, { color: colors.textSecondary }]}>AQUI SEU PET QUEM MANDA</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#DB4437' }]} // Google Red
          onPress={() => handleLogin('Google')}
        >
          <Text style={styles.buttonText}>Login com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#4267B2' }]} // Facebook Blue
          onPress={() => handleLogin('Facebook')}
        >
          <Text style={styles.buttonText}>Login com Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: '#E1306C' }]} // Instagram Pink
          onPress={() => handleLogin('Instagram')}
        >
          <Text style={styles.buttonText}>Login com Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.guestButton, { borderColor: colors.primary }]} // Primary color border
          onPress={handleGuestLogin}
        >
          <Text style={[styles.guestButtonText, { color: colors.primary }]}>Continuar como Visitante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  socialButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;


