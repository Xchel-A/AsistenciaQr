import * as ExpoCrypto from 'expo-crypto'
import CryptoJS from 'react-native-crypto-js'
import { RSA } from 'react-native-rsa-native'

const TIPO_RSA = "RSA"
const TIPO_AES = "AES"

const TipoAlgoritmoCripto = [
    { tipo: "MD5", algoritmo: ExpoCrypto.CryptoDigestAlgorithm.MD5 },
    { tipo: "SHA1", algoritmo: ExpoCrypto.CryptoDigestAlgorithm.SHA1 },
    { tipo: "SHA256", algoritmo: ExpoCrypto.CryptoDigestAlgorithm.SHA256 },
    { tipo: "SHA512", algoritmo: ExpoCrypto.CryptoDigestAlgorithm.SHA512 },
    { tipo: "RSA", algoritmo: TIPO_RSA },
    { tipo: "AES", algoritmo: TIPO_AES }]

function Asincrono() {
    const keyPublic = ""
    const keyPrivate = ""
    RSA.generateKeys(4096).then(keys => {
        keyPublic = keys.public
        keyPrivate = keys.private
        console.log(keys.public)
        console.log(keys.private)
    })

    return {
        encriptar: (data) => RSA.encrypt(data, keyPublic),
        desencriptar: (data) => RSA.decrypt(data, keyPrivate)
    }
}

function Sincrono() {
    const defaultSecret = "tacodecanasta"
    return {
        encriptar: (data) => {
            return CryptoJS.AES.encrypt(data, defaultSecret).toString()
        },
        desencriptar: (dataCifrado) => {
            var bytes = CryptoJS.AES.decrypt(dataCifrado, defaultSecret)
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8)
            return decryptedData
        }
    }
}

function Hash(algoritmo) {
    return {
        encriptar: (data) => ExpoCrypto.digestStringAsync(algoritmo, data)
    }
}

function Crypto(algoritmo) {
    if (algoritmo === TIPO_RSA) {
        return Asincrono(algoritmo)
    } else if (algoritmo === TIPO_AES) {
        return Sincrono(algoritmo)
    } else {
        return Hash(algoritmo)
    }
}

export { Crypto, TipoAlgoritmoCripto }