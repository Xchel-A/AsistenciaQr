// Escanear.js
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../utils/firebaseConfig';
import CryptoJS from 'react-native-crypto-js';

export default function Escanear() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        const bytes = CryptoJS.AES.decrypt(data, 'clave-secreta');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        setScannedData({ type, data: decryptedData });
        setModalVisible(true);
    };

    const handleGuardar = async () => {
        setModalVisible(false);

        const db = getFirestore(firebaseConfig);

        try {
            await addDoc(collection(db, 'barcodes'), {
                type: scannedData.type,
                data: JSON.stringify(scannedData.data),
                timestamp: serverTimestamp(),
            });

            Alert.alert(
                'Escaneo Guardado',
                `Tipo: ${scannedData.type}\nDatos: ${JSON.stringify(scannedData.data)}\nEscaneo guardado en Cloud Firestore.`
            );

            setScanned(false);
            setScannedData(null);
        } catch (error) {
            console.error('Error al agregar el documento:', error.message);
            Alert.alert('Error', `Error al escanear: ${error.message}`);
        }
    };

    const handleVolverAEscanear = () => {
        setModalVisible(false);
        setScanned(false);
        setScannedData(null);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Tipo: {scannedData?.type}</Text>
                        <Text>Datos: {JSON.stringify(scannedData?.data)}</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button} onPress={handleGuardar}>
                                <Text style={styles.textStyle}>Guardar</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={handleVolverAEscanear}>
                                <Text style={styles.textStyle}>Volver a Escanear</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
