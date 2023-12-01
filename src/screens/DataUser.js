import React from 'react';
import { View, Text, StyleSheet, Button, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../providers/AuthProvider';


const DataUser = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    // Llama a la función de cerrar sesión cuando se presiona el botón
    signOut();
  };

  return (

    <SafeAreaView style={styles.container}>

      <Image style={styles.imagen} source={require('../../assets/uteq.png')} />

      <View style={styles.conten}>
        <Text style={styles.saludo}>¡Hola, {user.displayName}!</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tipo de usuario:</Text>
          <Text style={styles.value}>{user.role}</Text>
        </View>

        <TouchableOpacity
          style={styles.boton}
          onPress={handleSignOut}
        >
          <Text style={styles.textoBoton}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  imagen: {
    height: 110,
    width: 260,
    margin: 40,
    marginBottom: 70
  },
  conten: {
    borderRadius: 15,
    height: 330,
    width: 270,
    backgroundColor: "#ABCCE7",

  },

  infoContainer: {
    flexDirection: 'row',
    marginBottom: 35,
    width: 180,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  saludo: {
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35,
    fontWeight: 'bold',
    fontSize: 16
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
  boton: {
    marginTop: 20,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#004E8B',
    borderRadius: 15,
    padding: 10,
  },
  textoBoton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DataUser;
