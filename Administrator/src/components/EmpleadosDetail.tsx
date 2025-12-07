import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CreateEmpleadoDto } from '../interfaces/empleadosInterface';

interface Props {
    empleado: CreateEmpleadoDto;
    navigation?: any;
}



export const EmpleadosDetail = ({ empleado, navigation }: Props) => {
    const goHome = () => {
        if (navigation) {
            navigation.navigate('HomeEmpleados');
        }
    };
    return (
        <ScrollView style={styles.contenedor}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Detalles del Empleado
                </Text>
                <Text style={styles.headerSubtitle}>
                    {empleado.nombre} {empleado.apellido_p}
                </Text>
            </View>
            <View style={styles.seccion}>
                <Text style={styles.tituloSeccion}>Información Personal</Text>
                <View style={styles.datosWrapper}>
                    <View style={styles.fila}>
                        <Text style={styles.etiqueta}>ID Empleado:</Text>
                        <Text style={styles.valor}>{empleado.id_empleado}</Text>
                    </View>
                    <View style={styles.fila}>
                        <Text style={styles.etiqueta}>Nombre Completo:</Text>
                        <Text style={styles.valor}>{empleado.nombre} {empleado.apellido_p || empleado.apellido} {empleado.apellido_m}</Text>
                    </View>
                    <View style={styles.fila}>
                        <Text style={styles.etiqueta}>Área / Puesto:</Text>
                        <Text style={styles.valor}>{empleado.area}</Text>
                    </View>
                    <View style={styles.fila}>
                        <Text style={styles.etiqueta}>Turno:</Text>
                        <Text style={styles.valor}>{empleado.turno}</Text>
                    </View>
                    <View style={[styles.fila, styles.filaLast]}>
                        <Text style={styles.etiqueta}>Salario Diario:</Text>
                        <Text style={styles.valorBold}>
                            ${empleado.salarioDiario}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.seccion}>
                <Text style={styles.tituloSeccion}>Estado</Text>
                <View style={styles.datosWrapper}>
                    <View style={[styles.fila, styles.filaLast]}>
                        <Text style={styles.etiqueta}>Activo:</Text>
                        <Text style={[styles.valorBold, { color: empleado.activo ? '#10B981' : '#EF4444' }]}>
                            {empleado.activo ? 'ACTIVO' : 'INACTIVO'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomSpace}>
                <TouchableOpacity style={styles.btnHome} onPress={goHome}>
                    <Text style={styles.btnHomeText}>← Volver al Directorio</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    header: {
        backgroundColor: '#1D4ED8',
        paddingTop: 40,
        paddingBottom: 25,
        paddingHorizontal: 16,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    seccion: {
        marginBottom: 20,
        marginHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    tituloSeccion: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1D4ED8',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    datosWrapper: {
        paddingTop: 10,
        paddingBottom: 5,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 15,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    filaLast: {
        borderBottomWidth: 0,
        marginBottom: 0,
    },
    etiqueta: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        flex: 1,
    },
    valor: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    valorBold: {
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '700',
        flex: 1,
        textAlign: 'right',
    },
    bottomSpace: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    btnHome: {
        backgroundColor: '#3B82F6',
        borderRadius: 10,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnHomeText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.3,
    },
});
