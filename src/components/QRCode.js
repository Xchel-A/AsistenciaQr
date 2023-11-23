import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import { useContextPanelQRCode } from '../providers/QRCodeProvider';
import { useAuth } from '../providers/AuthProvider'; // Asegúrate de importar el contexto AuthContext

export default function QRCode() {
  const [state] = useContextPanelQRCode();
  const { user } = useAuth();

  // Verificar si user está definido antes de acceder a sus propiedades
  if (!user || !user.email) {
    return <Text>Error de usuario</Text>; // O manejar de alguna otra manera
  }

  // Obtener la fecha y hora actual
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  // Crear un objeto JSON con los datos
  const qrData = {
    email: user.email,
    fecha: formattedDate,
    hora: formattedTime,
  };

  // Convertir el objeto JSON a una cadena JSON
  const qrJsonText = JSON.stringify(qrData);
  
  return (
    <>
      <Text>Escanear código QR</Text>
      <SvgQRCode value={qrJsonText} size={state.size} color={state.color} />
    </>
  );
}
