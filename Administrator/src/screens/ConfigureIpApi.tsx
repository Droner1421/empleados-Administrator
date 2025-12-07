import React, { useContext, useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from "react-native";
import { ApiConfigContext } from "../context/ApiConfigContext";

export const ConfigureIpApi = ({ navigation }: any) => {
    const { apiIP, setApiIP } = useContext(ApiConfigContext);
    const [ip, setIp] = useState(apiIP);

    const handleSave = () => {
        if (!ip.trim()) {
            Alert.alert("Error", "Por favor ingresa una IP");
            return;
        }
        setApiIP(ip);
        Alert.alert("Éxito", "IP configurada");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurar URL Base del API</Text>
            <Text style={styles.subtitle}>
                Esta dirección se usará para todas las peticiones a la API.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="ej: http://192.168.1.100:3000"
                value={ip}
                onChangeText={setIp}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar Configuración</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'stretch',
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 30,
        textAlign: 'left',
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
        fontSize: 15,
        color: '#1F2937',
        // Sombra suave para destacar el input
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    button: {
        backgroundColor: '#3B82F6',
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});
