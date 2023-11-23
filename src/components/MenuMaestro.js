import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuMaestro = () => {
  const navigation = useNavigation();

  const handleScanQRPress = () => {
    // Navegar a la pantalla de escaneo de QR
    navigation.navigate('escanear');
  };

  return (
    <View style={styles.container}>
      <Button title="Escanear QR" onPress={handleScanQRPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuMaestro;
