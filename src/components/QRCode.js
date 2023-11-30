import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import { useContextPanelQRCode } from '../providers/QRCodeProvider';
import { useAuth } from '../providers/AuthProvider';
import CryptoJS from 'react-native-crypto-js';

export default function QRCode() {
  const [state] = useContextPanelQRCode();
  const { user } = useAuth();
  const [qrCodeData, setQRCodeData] = useState(generateQRCodeData());

  useEffect(() => {
    // Actualizar el código QR cada minuto
    const intervalId = setInterval(() => {
      setQRCodeData(generateQRCodeData());
    }, 60000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  function generateQRCodeData() {
    if (!user || !user.email) {
      return null;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    const qrData = {
      email: user.email,
      name: user.name,
      fecha: formattedDate,
      hora: formattedTime,
    };

    const qrJsonText = JSON.stringify(qrData);
    const encryptedQrData = CryptoJS.AES.encrypt(qrJsonText, 'clave-secreta').toString();

    return encryptedQrData;
  }

  if (!user || !user.email) {
    return <Text>Error de usuario</Text>;
  }

  return (
    <>
      <Text>Escanear código QR</Text>
      <SvgQRCode value={qrCodeData} size={state.size} color={state.color} />
    </>
  );
}
