import { StyleSheet, Text, View, TextInput } from "react-native";
import PanelQRCode from "../components/PanelQRCode";
import QRCode from "../components/QRCode";
import { QRCodeProvider } from "../providers/QRCodeProvider";


export default function Generar() {
    return (
        <View style={styles.container}>        
            <QRCodeProvider>
                

                <QRCode />
            </QRCodeProvider> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
