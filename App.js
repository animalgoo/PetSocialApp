import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 1. IMPORTE OS PROVIDERS
import { UIProvider } from './src/contexts/UIContext';
import { AuthProvider } from './src/contexts/AuthContext';

// Importe suas telas...
import LoginScreen from './src/screens/LoginScreen';
// ... (outros imports de telas)
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ChatScreen from './src/screens/ChatScreen';
import PostScreen from './src/screens/PostScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BusinessScreen from './src/screens/BusinessScreen';
import BusinessDetailScreen from './src/screens/BusinessDetailScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import MyAppointmentsScreen from './src/screens/MyAppointmentsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  // 2. REMOVA O UIPROVIDER DAQUI
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Business') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'Grupos') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Chat') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1877F2',
        tabBarInactiveTintColor: '#8A8D91',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E4E6EA',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Business" component={BusinessScreen} />
      <Tab.Screen name="Grupos" component={GroupsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* 3. ADICIONE O UIPROVIDER AQUI, ENVOLVENDO A NAVEGAÇÃO */}
      <UIProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* Agora LoginScreen e todas as outras telas têm acesso ao useUI */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Post" component={PostScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="BusinessDetail" component={BusinessDetailScreen} />
            <Stack.Screen name="Appointment" component={AppointmentScreen} />
            <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UIProvider>
    </AuthProvider>
  );
}


