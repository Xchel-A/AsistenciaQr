import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

const DataUser = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    // Llama a la función de cerrar sesión cuando se presiona el botón
    signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{user.displayName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo de usuario:</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>
      <Button title="Cerrar Sesión" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default DataUser;
