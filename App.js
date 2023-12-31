// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { AuthProvider, useAuth } from './src/providers/AuthProvider';
import LoginForm from './src/components/LoginForm';
import RegistroForm from './src/components/RegistroForm';
import QRCodeScanner from './src/screens/Escanear';
import QRCodeGenerator from './src/screens/Generar';
import DataUser from './src/screens/DataUser';


const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>

      <MainApp />

    </AuthProvider>
  );
}

function MainApp() {
  const { user, isTeacher } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        user.role === 'alumno' ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Perfil"
              component={DataUser}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require('./assets/usuario.png')}
                    style={{ width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tab.Screen name="QRCodeGenerator" component={QRCodeGenerator} />
          </Tab.Navigator>
        ) : user.role === 'maestro' ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Perfil"
              component={DataUser}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require('./assets/usuario.png')}
                    style={{ width: 28, height: 28 }}
                  />
                ),
              }}
            />
            <Tab.Screen name="EscanearQR"
              component={QRCodeScanner}
              options={{
                tabBarIcon: () => (
                  <Image
                    source={require('./assets/codigo.png')} // Ajusta la ruta según la ubicación de tu icono de usuario
                    style={{ width: 28, height: 28 }} // Ajusta el tamaño según sea necesario
                  />
                ),
              }} />
          </Tab.Navigator>
        ) : null
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="SingIn" component={LoginForm} options={{ headerShown: false }} />
          <AuthStack.Screen name="Registro" component={RegistroForm} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

