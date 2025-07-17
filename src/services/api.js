// Serviço para comunicação com o backend - Versão Segura
import SecurityService from './security';

const API_BASE_URL = 'http://localhost:5001/api';

class ApiService {
  // Timeout padrão para requisições
  static REQUEST_TIMEOUT = 10000;

  // Fazer requisição segura
  static async secureRequest(endpoint, options = {}) {
    try {
      const headers = await SecurityService.getSecureHeaders();
      
      const config = {
        method: 'GET',
        headers,
        timeout: this.REQUEST_TIMEOUT,
        ...options,
      };

      // Log da requisição para auditoria
      SecurityService.logSecurityEvent('api_request', {
        endpoint,
        method: config.method
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Verificar se a resposta é válida
      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado, tentar refresh
          await this.refreshToken();
          throw new Error('Token expirado');
        }
        
        if (response.status === 429) {
          throw new Error('Muitas requisições. Tente novamente mais tarde.');
        }

        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Validar resposta
      if (typeof data !== 'object') {
        throw new Error('Resposta inválida do servidor');
      }

      return data;
    } catch (error) {
      SecurityService.logSecurityEvent('api_error', {
        endpoint,
        error: error.message
      });
      throw error;
    }
  }

  // Refresh token
  static async refreshToken() {
    try {
      const refreshToken = await SecurityService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (!response.ok) {
        await SecurityService.clearTokens();
        throw new Error('Falha ao renovar token');
      }

      const data = await response.json();
      await SecurityService.storeTokens(data.access_token, data.refresh_token);
      
      return data;
    } catch (error) {
      await SecurityService.clearTokens();
      throw error;
    }
  }

  // Obter configurações de UI
  static async getUIConfig() {
    return this.secureRequest('/ui-config');
  }

  // Atualizar configurações de UI (apenas admin)
  static async updateUIConfig(config) {
    // Sanitizar dados de entrada
    const sanitizedConfig = {
      primary_color: SecurityService.sanitizeInput(config.primary_color),
      secondary_color: SecurityService.sanitizeInput(config.secondary_color),
      background_color: SecurityService.sanitizeInput(config.background_color),
      text_color: SecurityService.sanitizeInput(config.text_color),
      logo_url: SecurityService.sanitizeInput(config.logo_url)
    };

    return this.secureRequest('/ui-config', {
      method: 'PUT',
      body: JSON.stringify(sanitizedConfig)
    });
  }

  // Obter provedores de autenticação
  static async getAuthProviders() {
    return this.secureRequest('/auth/providers');
  }

  // Login social
  static async socialLogin(provider, code) {
    const sanitizedData = {
      provider: SecurityService.sanitizeInput(provider),
      code: SecurityService.sanitizeInput(code)
    };

    return this.secureRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    });
  }

  // Obter lista de estabelecimentos
  static async getBusinesses(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, SecurityService.sanitizeInput(filters[key]));
      }
    });

    const endpoint = queryParams.toString() ? `/business?${queryParams}` : '/business';
    return this.secureRequest(endpoint);
  }

  // Obter detalhes de um estabelecimento
  static async getBusinessDetails(id) {
    if (!id || typeof id !== 'number') {
      throw new Error('ID do estabelecimento inválido');
    }
    
    return this.secureRequest(`/business/${id}`);
  }

  // Criar estabelecimento
  static async createBusiness(businessData) {
    // Validar dados
    const validation = SecurityService.validateBusinessData(businessData);
    if (!validation.isValid) {
      throw new Error(`Dados inválidos: ${Object.values(validation.errors).join(', ')}`);
    }

    // Sanitizar dados
    const sanitizedData = Object.keys(businessData).reduce((acc, key) => {
      acc[key] = SecurityService.sanitizeInput(businessData[key]);
      return acc;
    }, {});

    return this.secureRequest('/business', {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    });
  }

  // Criar agendamento
  static async createAppointment(appointmentData) {
    // Validar dados
    const validation = SecurityService.validateAppointmentData(appointmentData);
    if (!validation.isValid) {
      throw new Error(`Dados inválidos: ${Object.values(validation.errors).join(', ')}`);
    }

    // Sanitizar dados
    const sanitizedData = {
      business_id: appointmentData.business_id,
      date: appointmentData.date,
      service: SecurityService.sanitizeInput(appointmentData.service),
      pet_name: SecurityService.sanitizeInput(appointmentData.pet_name),
      notes: SecurityService.sanitizeInput(appointmentData.notes || '')
    };

    return this.secureRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    });
  }

  // Obter agendamentos do usuário
  static async getUserAppointments() {
    return this.secureRequest('/appointments/user');
  }

  // Cancelar agendamento
  static async cancelAppointment(appointmentId) {
    if (!appointmentId || typeof appointmentId !== 'number') {
      throw new Error('ID do agendamento inválido');
    }

    return this.secureRequest(`/appointments/${appointmentId}`, {
      method: 'DELETE'
    });
  }

  // Obter horários disponíveis
  static async getAvailableSlots(businessId, date) {
    if (!businessId || typeof businessId !== 'number') {
      throw new Error('ID do estabelecimento inválido');
    }

    if (!date) {
      throw new Error('Data é obrigatória');
    }

    const sanitizedDate = SecurityService.sanitizeInput(date);
    return this.secureRequest(`/appointments/available-slots?business_id=${businessId}&date=${sanitizedDate}`);
  }

  // Upload seguro de arquivo
  static async uploadFile(file, type = 'image') {
    // Validar arquivo
    const allowedTypes = {
      image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      document: ['pdf', 'doc', 'docx']
    };

    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedTypes[type]?.includes(extension)) {
      throw new Error(`Tipo de arquivo não permitido. Permitidos: ${allowedTypes[type]?.join(', ')}`);
    }

    // Verificar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Arquivo muito grande. Máximo 5MB.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const headers = await SecurityService.getSecureHeaders();
    delete headers['Content-Type']; // Deixar o browser definir para FormData

    return this.secureRequest('/upload', {
      method: 'POST',
      headers,
      body: formData
    });
  }

  // Verificar status de saúde da API
  static async healthCheck() {
    return this.secureRequest('/health');
  }
}

export default ApiService;

