import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from '@expo/vector-icons';

const LoginForm = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = () => {
    // Navegar a la pantalla de escaneo de QR
    navigation.navigate('Registro');
  };

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={styles.scrollContainer}
    resetScrollToCoords={{ x: 0, y: 0 }}
    scrollEnabled={true} // O quítalo para que sea true por defecto
    style={{ flex: 1, width: '100%' }}
    >
      <View style={styles.containerForm}>
        <View style={styles.containerSvg}>
          {/* Asegúrate de tener la importación correcta de fondoSvg */}
          <SvgXml xml={fondoSvg} />
          <Text style={styles.svgText}>Inicio sesión</Text>
        </View>
        <Image
          source={require("../assets/profile.png")}
          style={styles.imagen}
        />
        <Text style={styles.titulo}>UniversiQR</Text>
        <View style={[styles.inputContainer, { marginBottom: 18 }]}>
          <View style={styles.iconContainer}>
            <FontAwesome5 icon="envelope" style={styles.icon} />
          </View>
          <TextInput
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.inputText}
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 icon="eye" size={24} color="#64B5F6" style={styles.icon} />
          </View>
          <TextInput
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            style={styles.inputText}
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText1}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={handleRegistro}>
          <Text style={styles.buttonText1}>Registro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  containerForm: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
  containerSvg: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  svgText: {
    position: "absolute",
    top: 90,
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textShadowRadius: 3,
  },
  imagen: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 32,
    width: "90%",
  },
  inputText: {
    height: 50,
    backgroundColor: "#9EAEC9",
    borderRadius: 20,
    paddingLeft: 45,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  iconContainer: {
    marginHorizontal: 5
  },
  icon: {
    position: "absolute",
    top: 13,
    left: 15,
    zIndex: 1,
    color: "black",
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#088BED",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 30,
    marginTop: 5,
  },
  button1: {
    width: 160,
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#088BED",
    borderWidth: 2,
    borderColor: "#088BED",
    marginTop: 20,
  },
  buttonText1: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const fondoSvg = `<svg width="440" height="202" viewBox="0 0 440 202" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H440V202L291 191.044L152 175.295L118 171.422L89.5 167.999L59.5 163.89L48.5 162.178L46.9931 161.883C41.0112 160.713 35.1539 158.978 29.5 156.7V156.7L20.5 152.592L17.149 150.45C14.389 148.686 11.7998 146.668 9.415 144.423L6.81939 141.979C5.61046 140.841 4.53628 139.568 3.61796 138.184V138.184C1.25851 134.63 0 130.459 0 126.192V0Z" fill="#0793F2"/>
</svg>
`;

export default LoginForm;
