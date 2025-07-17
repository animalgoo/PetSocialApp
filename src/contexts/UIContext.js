import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

// Cores padrão (fallback caso o backend não esteja disponível)
const defaultColors = {
  primary: '#1877F2',
  secondary: '#42B72A',
  background: '#F0F2F5',
  white: '#FFFFFF',
  textPrimary: '#1C1E21',
  textSecondary: '#65676B',
  border: '#E4E6EA',
  success: '#42B72A',
  inactive: '#8A8D91',
  notification: '#E41E3F'
};

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI deve ser usado dentro de um UIProvider');
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [colors, setColors] = useState(defaultColors);
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar configurações do backend
  const loadUIConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiService.getUIConfig();
      
      if (response && response.success && response.data) {
        const { colors: backendColors, logo_url } = response.data;
        
        if (backendColors) {
          setColors(backendColors);
        }
        
        if (logo_url) {
          setLogoUrl(logo_url);
        }
        
        console.log('Configurações de UI carregadas do backend:', response.data);
      } else {
        console.warn('Usando configurações padrão - backend não disponível');
      }
    } catch (err) {
      console.error('Erro ao carregar configurações de UI:', err);
      setError(err.message);
      // Manter cores padrão em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar cores
  const updateColors = async (newColors) => {
    try {
      const response = await ApiService.updateColors(newColors);
      
      if (response && response.success) {
        setColors(newColors);
        console.log('Cores atualizadas com sucesso');
        return true;
      } else {
        console.error('Erro ao atualizar cores no backend');
        return false;
      }
    } catch (err) {
      console.error('Erro ao atualizar cores:', err);
      return false;
    }
  };

  // Função para atualizar logo
  const updateLogo = async (newLogoUrl) => {
    try {
      const response = await ApiService.updateLogo(newLogoUrl);
      
      if (response && response.success) {
        setLogoUrl(newLogoUrl);
        console.log('Logo atualizada com sucesso');
        return true;
      } else {
        console.error('Erro ao atualizar logo no backend');
        return false;
      }
    } catch (err) {
      console.error('Erro ao atualizar logo:', err);
      return false;
    }
  };

  // Carregar configurações na inicialização
  useEffect(() => {
    loadUIConfig();
  }, []);

  const value = {
    colors,
    logoUrl,
    loading,
    error,
    updateColors,
    updateLogo,
    reloadConfig: loadUIConfig
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

