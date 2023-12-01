import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const RegistroForm = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  const goInicioPrincipal = () => {
    navigation.navigate('SingIn');
  };

  const handleSignUp = async () => {
    // Realizar la validación de los datos antes de llamar a signUp
  
    // Validar la longitud del nombre
    if (displayName.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El nombre debe tener al menos 10 caracteres',
      });
      return;
    }
  
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith('@uteq.edu.mx')) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Ingrese un correo electrónico válido de la UTEQ',
      });
      return;
    }
  
    // Validar la seguridad de la contraseña (puedes personalizar tus propias reglas aquí)
    if (password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'La contraseña debe tener al menos 8 caracteres',
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
  
      // Limpiar los inputs después del registro exitoso
      setDisplayName('');
      setEmail('');
      setPassword('');
  
      //navigation.replace('SingIn');
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAwareScrollView
        style={styles.mainContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
          <View style={styles.containerSvg}>
            <SvgXml xml={fondoSvg} />
            <Text style={styles.svgText}>Registrarse</Text>
          </View>
          <View style={styles.containerForm}>
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
              style={styles.inputText}
              placeholderTextColor="white"
              placeholder="Nombre"
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
          <View style={[styles.inputContainer, { marginBottom: 18 }]}>
            <View style={styles.iconContainer}>
              <FontAwesome5 icon="envelope" style={styles.icon} />
            </View>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="white"
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.inputContainer, { marginBottom: 18 }]}>
            <View style={styles.iconContainer}>
              <FontAwesome5 icon="envelope" style={styles.icon} />
            </View>
            <TextInput
              style={styles.inputText}
              placeholderTextColor="white"
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button1} onPress={handleSignUp}>
            <Text style={styles.buttonText1}>Registrarme</Text>
          </TouchableOpacity>
          <View style={styles.userActions}>
            <Text style={styles.noAccountText}>Ya tienes una cuenta?</Text>
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={goInicioPrincipal}
            >
              <Text style={styles.createAccountButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
    
    
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
},
scrollContainer: {
  flexGrow: 1,
  justifyContent: 'space-between',
},
containerForm: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
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
containerForm: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 40,
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
userActions: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
noAccountText: {
  fontSize: 16,
  color: '#555',
  marginRight: -15,
},
createAccountButton: {
  paddingHorizontal: 20,
  paddingVertical: 10,
},
createAccountButtonText: {
  color: '#797979',
  fontSize: 16,
  fontWeight: 'bold',
},
});

const fondoSvg = `<svg width="440" height="202" viewBox="0 0 440 202" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H440V202L291 191.044L152 175.295L118 171.422L89.5 167.999L59.5 163.89L48.5 162.178L46.9931 161.883C41.0112 160.713 35.1539 158.978 29.5 156.7V156.7L20.5 152.592L17.149 150.45C14.389 148.686 11.7998 146.668 9.415 144.423L6.81939 141.979C5.61046 140.841 4.53628 139.568 3.61796 138.184V138.184C1.25851 134.63 0 130.459 0 126.192V0Z" fill="#0793F2"/>
</svg>
`;

export default RegistroForm;
