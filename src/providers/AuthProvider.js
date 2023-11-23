import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../utils/firebaseConfig';

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de autenticación
const auth = getAuth(app);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Cargar el usuario desde AsyncStorage al iniciar la aplicación
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        //console.error('Error al cargar el usuario desde AsyncStorage:', error.message);
      }
    };

    loadUserFromStorage();
  }, []);

  // Este efecto se ejecutará cada vez que 'user' cambie
  useEffect(() => {
    console.log('Usuario después de iniciar sesión:', user);

    // Guardar el usuario en AsyncStorage cada vez que cambie
    const saveUserToStorage = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error al guardar el usuario en AsyncStorage:', error.message);
      }
    };

    saveUserToStorage();
  }, [user]);

  const signIn = async (email, password) => {
    try {
      // Realizar la autenticación con Firebase
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Validar si el email es de un alumno o maestro
      let updatedUser;
      if (/^\d+$/.test(response.user.email.split('@')[0])) {
        // Si el inicio es numérico, es un alumno
        updatedUser = { ...response.user, role: 'alumno' };
      } else {
        // Si hay letras antes de la arroba, es un maestro
        updatedUser = { ...response.user, role: 'maestro' };
      }

      // Actualizar el estado del usuario
      setUser(updatedUser);
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
      if (error.user) {
        console.error('Error de usuario:', error.user);
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);

      // Eliminar el usuario de AsyncStorage al cerrar sesión
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      // Registrar un nuevo usuario con Firebase
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // Obtener el usuario de la respuesta
      const user = response.user;

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(user, {
        displayName: displayName,
      });

      // Actualizar el estado del usuario
      setUser(user);
      
    } catch (error) {
      
      //console.error('Error de registro:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut: signOutUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
