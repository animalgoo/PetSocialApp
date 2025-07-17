import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUI } from '../contexts/UIContext';
import { API } from '../services/api';

const AppointmentScreen = ({ route, navigation }) => {
  const { businessId, service } = route.params;
  const { colors } = useUI();
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableTimes = async (date) => {
    setLoading(true);
    try {
      const response = await API.get(`/appointments/available-times/${businessId}?date=${date}&service_id=${service.id}`);
      setAvailableTimes(response.data.available_times);
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      Alert.alert('Erro', 'Não foi possível carregar os horários disponíveis.');
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Por favor, selecione uma data e um horário.');
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/appointments/schedule', {
        business_id: businessId,
        service_id: service.id,
        date: selectedDate,
        time: selectedTime,
        // user_id will be added by the backend from the authenticated user
      });
      Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
      navigation.goBack(); // Go back to business detail or my appointments
    } catch (error) {
      console.error('Erro ao agendar:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', error.response ? error.response.data.message : 'Não foi possível agendar o serviço.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Agendar {service.name}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Selecione a data e horário para o serviço.</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: colors.primary }
        }}
        theme={{
          selectedDayBackgroundColor: colors.primary,
          todayTextColor: colors.primary,
          arrowColor: colors.primary,
          monthTextColor: colors.textPrimary,
          textDayHeaderFontWeight: 'bold',
          textDayHeaderFontSize: 14,
        }}
      />

      {selectedDate && (
        <View style={styles.timesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Horários Disponíveis em {selectedDate}</Text>
          {loading ? (
            <Text style={{ color: colors.textSecondary }}>Carregando horários...</Text>
          ) : availableTimes.length > 0 ? (
            <View style={styles.timeGrid}>
              {availableTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeButton,
                    { borderColor: colors.border },
                    selectedTime === time && { backgroundColor: colors.primary, borderColor: colors.primary }
                  ]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={[styles.timeButtonText, selectedTime === time && { color: colors.white }]}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={{ color: colors.textSecondary }}>Nenhum horário disponível para esta data.</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.scheduleButton, { backgroundColor: colors.primary, opacity: (selectedDate && selectedTime) ? 1 : 0.5 }]}
        onPress={handleScheduleAppointment}
        disabled={!selectedDate || !selectedTime || loading}
      >
        <Text style={styles.scheduleButtonText}>Agendar Serviço</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  timesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#F8F8F8',
  },
  timeButtonText: {
    fontSize: 14,
  },
  scheduleButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;


