import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RegistroForm = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Realizar la validación de los datos antes de llamar a signUp
    if (!email || !password || !displayName) {
      // Mostrar toast si los campos no están completos
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      await signUp(email, password, displayName);
      // Mostrar toast en caso de éxito
      Toast.show({
        type: 'success',
        text1: 'Registro Exitoso',
        text2: '¡Bienvenido!',
      });

      navigation.replace('SingIn');

    } catch (error) {
      // Mostrar toast en caso de error
      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: error.message,
      });
      console.error('Error en el registro:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleSignUp} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RegistroForm;
