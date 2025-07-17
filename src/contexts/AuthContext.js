import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authProviders, setAuthProviders] = useState([]);

  // Função para carregar usuário atual
  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getCurrentUser();
      
      if (response && response.success && response.user) {
        setUser(response.user);
        console.log('Usuário logado:', response.user);
      } else {
        setUser(null);
        console.log('Nenhum usuário logado');
      }
    } catch (err) {
      console.error('Erro ao carregar usuário atual:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar provedores de autenticação
  const loadAuthProviders = async () => {
    try {
      const response = await ApiService.getAuthProviders();
      
      if (response && response.success && response.providers) {
        setAuthProviders(response.providers);
        console.log('Provedores de autenticação carregados:', response.providers);
      }
    } catch (err) {
      console.error('Erro ao carregar provedores de autenticação:', err);
    }
  };

  // Função para fazer login social
  const loginWithProvider = (provider) => {
    const loginUrl = ApiService.getLoginUrl(provider);
    
    // Em um ambiente web, abriríamos uma nova janela
    // Em React Native, usaríamos WebBrowser ou similar
    console.log(`Iniciando login com ${provider}:`, loginUrl);
    
    // Para demonstração, vamos simular um usuário logado
    // Em produção, isso seria feito através do fluxo OAuth real
    const mockUser = {
      id: Date.now(),
      name: `Usuário ${provider}`,
      email: `user@${provider}.com`,
      provider: provider,
      picture: null
    };
    
    setUser(mockUser);
    return mockUser;
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      await ApiService.logout();
      setUser(null);
      console.log('Logout realizado com sucesso');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    loadCurrentUser();
    loadAuthProviders();
  }, []);

  const value = {
    user,
    loading,
    authProviders,
    loginWithProvider,
    logout,
    reloadUser: loadCurrentUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

