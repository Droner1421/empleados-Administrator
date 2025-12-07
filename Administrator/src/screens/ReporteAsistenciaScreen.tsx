import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useReporteAsistencia } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'ReporteAsistenciaScreen'>;



// Interfaz para los detalles del registro de asistencia
interface AsistenciaItem {
    a_id_reg_a: number;
    e_nombre: string;
    e_apellido_p: string;
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
    a_turno: string;
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return dateStr;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
};

export const ReporteAsistenciaScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useReporteAsistencia();
    const [fechaInicio, setFechaInicio] = useState("2025-01-08");
    const [fechaFin, setFechaFin] = useState("2025-01-08");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    if (isLoading && !data) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size="large" color='#3B82F6' />
                <Text style={style.loadingText}>Cargando registros...</Text>
            </View>
        );
    }

    const renderHeader = () => (
        <>
            {/* Encabezado Fijo con Información del Empleado */}
            <View style={style.headerContainer}>
                <Text style={style.headerTitle}>Registros de Asistencia</Text>
                <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
            </View>
            
            {/* Contenedor de Filtros */}
            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Filtro de Fechas</Text>
                <View style={style.inputGroup}>
                    <TextInput
                        style={style.input}
                        placeholder="Fecha de inicio (AAAA-MM-DD)"
                        placeholderTextColor='#6B7280'
                        value={fechaInicio}
                        onChangeText={setFechaInicio}
                        keyboardType="numbers-and-punctuation"
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Fecha de fin (AAAA-MM-DD)"
                        placeholderTextColor='#6B7280'
                        value={fechaFin}
                        onChangeText={setFechaFin}
                        keyboardType="numbers-and-punctuation"
                    />
                </View>
                <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData} disabled={isLoading}>
                    <Text style={style.btnBuscarText}>
                        {isLoading ? 'Cargando...' : 'Buscar Registros'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Resumen de Registros */}
            {data && (
                <View style={style.summaryCard}>
                    <View style={style.summaryRow}>
                        <Text style={style.summaryLabel}>Total Registros Encontrados:</Text>
                        <Text style={style.summaryValue}>{data.total}</Text>
                    </View>
                </View>
            )}

            {/* Mensaje de datos vacíos, solo si no está cargando */}
            {!isLoading && (!data || data.total === 0) && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de asistencia en el periodo seleccionado.</Text>
                </View>
            )}
        </>
    );

    const renderItem = ({ item }: { item: AsistenciaItem }) => (
        <View style={style.card}>
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.value}>{formatDate(item.a_fecha)}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Entrada:</Text>
                <Text style={[style.value, { color: '#3B82F6', fontWeight: '700' }]}>{item.a_horaEntrada}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Salida:</Text>
                <Text style={[style.value, { color: '#EF4444', fontWeight: '700' }]}>{item.a_horaSalida}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.label}>Turno:</Text>
                <Text style={[style.value, { color: '#F59E0B', fontWeight: '700' }]}>{item.a_turno}</Text>
            </View>
        </View>
    );

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={(data?.data || []) as AsistenciaItem[]}
                keyExtractor={(item) => item.a_id_reg_a.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 40 }} />}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F8F9FB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6B7280',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    headerContainer: {
        backgroundColor: '#1D4ED8',
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 16,
        marginHorizontal: -16,
        marginTop: -12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    filterContainer: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    filterTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        color: '#1F2937',
        fontSize: 13,
    },
    btnBuscar: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 8,
    },
    btnBuscarText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.3,
    },
    summaryCard: {
        backgroundColor: '#3B82F6',
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#FFFFFF',
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: "600",
        flex: 1,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: "800",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#1D4ED8',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowLast: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: "600",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: '#1F2937',
        flex: 1,
        textAlign: "right",
    },
    emptyMessage: {
        padding: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
});
