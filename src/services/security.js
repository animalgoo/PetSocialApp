// Módulo de segurança para o frontend
import AsyncStorage from '@react-native-async-storage/async-storage';

class SecurityService {
  // Chaves para armazenamento seguro
  static TOKEN_KEY = '@PetSocial:token';
  static REFRESH_TOKEN_KEY = '@PetSocial:refresh_token';
  static USER_KEY = '@PetSocial:user';

  // Armazenamento seguro de tokens
  static async storeTokens(accessToken, refreshToken) {
    try {
      await AsyncStorage.multiSet([
        [this.TOKEN_KEY, accessToken],
        [this.REFRESH_TOKEN_KEY, refreshToken]
      ]);
    } catch (error) {
      console.error('Erro ao armazenar tokens:', error);
    }
  }

  // Recuperar token de acesso
  static async getAccessToken() {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  // Recuperar refresh token
  static async getRefreshToken() {
    try {
      return await AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao recuperar refresh token:', error);
      return null;
    }
  }

  // Limpar tokens (logout)
  static async clearTokens() {
    try {
      await AsyncStorage.multiRemove([
        this.TOKEN_KEY,
        this.REFRESH_TOKEN_KEY,
        this.USER_KEY
      ]);
    } catch (error) {
      console.error('Erro ao limpar tokens:', error);
    }
  }

  // Validação de entrada no frontend
  static validateInput(value, type) {
    if (!value || typeof value !== 'string') {
      return false;
    }

    switch (type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      
      case 'phone':
        const phoneRegex = /^(\+55\s?)?\(?[1-9]{2}\)?\s?9?[0-9]{4}-?[0-9]{4}$/;
        return phoneRegex.test(value);
      
      case 'name':
        return value.length >= 2 && value.length <= 50;
      
      case 'password':
        return this.validatePassword(value);
      
      default:
        return value.length > 0;
    }
  }

  // Validação de senha
  static validatePassword(password) {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
    return true;
  }

  // Sanitização de entrada
  static sanitizeInput(input) {
    if (typeof input !== 'string') {
      return input;
    }
    
    // Remove caracteres perigosos
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim()
      .substring(0, 1000); // Limita tamanho
  }

  // Validação de URL
  static isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // Verificar se token está expirado
  static isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Headers seguros para requisições
  static async getSecureHeaders() {
    const token = await this.getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    if (token && !this.isTokenExpired(token)) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Validação de dados de agendamento
  static validateAppointmentData(data) {
    const errors = {};

    if (!data.business_id || typeof data.business_id !== 'number') {
      errors.business_id = 'Selecione um estabelecimento';
    }

    if (!data.date) {
      errors.date = 'Selecione uma data';
    } else {
      const appointmentDate = new Date(data.date);
      if (appointmentDate <= new Date()) {
        errors.date = 'A data deve ser no futuro';
      }
    }

    if (!data.service || data.service.length < 2) {
      errors.service = 'Selecione um serviço';
    }

    if (!data.pet_name || data.pet_name.length < 1) {
      errors.pet_name = 'Nome do pet é obrigatório';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validação de dados de estabelecimento
  static validateBusinessData(data) {
    const errors = {};

    if (!data.name || data.name.length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!data.email || !this.validateInput(data.email, 'email')) {
      errors.email = 'Email inválido';
    }

    if (!data.phone || !this.validateInput(data.phone, 'phone')) {
      errors.phone = 'Telefone inválido';
    }

    if (!data.address || data.address.length < 10) {
      errors.address = 'Endereço deve ter pelo menos 10 caracteres';
    }

    if (!data.type || !['petshop', 'clinic'].includes(data.type)) {
      errors.type = 'Tipo deve ser petshop ou clínica';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Log de eventos de segurança
  static logSecurityEvent(event, details = {}) {
    const logData = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location?.href || 'mobile-app'
    };

    // Em produção, enviar para serviço de monitoramento
    console.log('Security Event:', logData);
  }

  // Detectar tentativas de XSS
  static detectXSS(input) {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  }

  // Gerar nonce para CSP
  static generateNonce() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

export default SecurityService;

