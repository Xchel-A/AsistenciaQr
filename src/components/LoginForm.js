// LoginForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity , Text } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const navigation = useNavigation();

  const handleRegistro = () => {
    // Navegar a la pantalla de escaneo de QR
    navigation.navigate('Registro');
  };
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button style={styles.button} title="Iniciar sesión" onPress={handleLogin} />
      <TouchableOpacity style={styles.link} onPress={handleRegistro}>
        <Text style={styles.linkText}>Registro</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  link: {
    padding: 10,
    marginBottom: 10,
  },
  linkText: {
    color: 'blue', // Puedes cambiar el color a tu preferencia
    textDecorationLine: 'underline',
    fontSize: 16,
  },

});

export default LoginForm;
