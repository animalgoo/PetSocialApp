import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';

// URL da imagem de fundo. Usar uma URL externa evita ter que adicionar o arquivo ao projeto.
const BACKGROUND_IMAGE_URL = 'https://images.pexels.com/photos/1461013/pexels-photo-1461301.jpeg';

const LoginScreen = ({ navigation } ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você manterá sua lógica de login original.
    // Por enquanto, vamos apenas simular a navegação.
    console.log('Tentando login com:', email, password);
    // Exemplo: navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE_URL }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay escuro para melhorar a legibilidade */}
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Logo da Aplicação */}
            <Image
              source={require('../../assets/logo.png')} // <-- ATENÇÃO: Verifique se este é o caminho correto para o seu logo
              style={styles.logo}
            />

            <Text style={styles.title}>Login</Text>

            {/* Formulário de Entrada */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity onPress={() => console.log('Esqueci a senha clicado')}>
              <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* Botão de Login Principal */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Seção de Cadastro */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => console.log('Cadastre-se clicado')}>
                <Text style={styles.signupLink}> Cadastre-se</Text>
              </TouchableOpacity>
            </View>

            {/* 
              Os botões de login com redes sociais foram removidos da interface,
              conforme solicitado. A lógica pode ser reativada no futuro.
            */}

          </ScrollView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay escuro para contraste
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    width: '100%',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2D9CDB', // Um azul moderno, similar ao modelo
    borderRadius: 10,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  signupLink: {
    color: '#2D9CDB', // Cor do link igual ao botão para consistência
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
