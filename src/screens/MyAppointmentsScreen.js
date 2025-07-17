import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useUI } from '../contexts/UIContext';
import { API } from '../services/api';

const MyAppointmentsScreen = ({ navigation }) => {
  const { colors } = useUI();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    setLoading(true);
    try {
      const response = await API.get('/appointments/my');
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Erro ao buscar meus agendamentos:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível carregar seus agendamentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await API.delete(`/appointments/${appointmentId}`);
              Alert.alert('Sucesso', 'Agendamento cancelado com sucesso!');
              fetchMyAppointments(); // Refresh the list
            } catch (error) {
              console.error('Erro ao cancelar agendamento:', error.response ? error.response.data : error.message);
              Alert.alert('Erro', 'Não foi possível cancelar o agendamento.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={[styles.appointmentCard, { backgroundColor: colors.white, borderColor: colors.border }]}>
      <Text style={[styles.businessName, { color: colors.textPrimary }]}>{item.business_name}</Text>
      <Text style={[styles.serviceName, { color: colors.textSecondary }]}>Serviço: {item.service_name}</Text>
      <Text style={[styles.dateTime, { color: colors.textPrimary }]}>Data: {item.date} às {item.time}</Text>
      <Text style={[styles.status, { color: item.status === 'confirmed' ? colors.success : colors.inactive }]}>Status: {item.status}</Text>
      <TouchableOpacity
        style={[styles.cancelButton, { backgroundColor: colors.primary }]}
        onPress={() => handleCancelAppointment(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Meus Agendamentos</Text>
      {loading ? (
        <Text style={{ color: colors.textSecondary }}>Carregando agendamentos...</Text>
      ) : appointments.length === 0 ? (
        <Text style={{ color: colors.textSecondary }}>Você não possui agendamentos.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  appointmentCard: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 16,
    marginBottom: 3,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAppointmentsScreen;


