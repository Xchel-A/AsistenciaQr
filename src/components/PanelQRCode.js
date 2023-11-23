import { StyleSheet, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useContextPanelQRCode } from '../providers/QRCodeProvider'
import Slider from '@react-native-community/slider';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
//import { Dropdown } from 'react-native-element-dropdown';
//import { Crypto, TipoAlgoritmoCripto } from '../utils/Crypto';

export default function PanelQRCode() {
    const [state, dispatch] = useContextPanelQRCode();
    const [selected, setSelected] = useState('#db643a')
    const [text, setText] = useState("MD5")
    const [typeCrypto, setTypeCrypto] = useState("MD5");
    const colorPickerRef = useRef()

   

    const onColorChange = (color) => {
        setSelected(color)
        dispatch({ type: 'UPDATE_COLOR', color: color })
    }

    const onValueChange = (value) => {
        dispatch({ type: 'UPDATE_SIZE', size: value })
    }

   

    return (
        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
            <ColorPicker
                onColorSelected={onColorChange}
                style={{ flex: 1, width: 100 }}
                sliderComponent={Slider}
                hideSliders
                ref={colorPickerRef}
            />
          
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={100}
                maximumValue={400}
                minimumTrackTintColor='black'
                maximumTrackTintColor='grey'
                onValueChange={onValueChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
