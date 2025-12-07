import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ReportesDrawerParams } from '../navigator/ReportesNavigator';
import { useDiasTrabajados } from '../hooks/useReportes';

type Props = DrawerScreenProps<ReportesDrawerParams, 'DiasTrabaladosScreen'>;

// Definición de Colores
const PRIMARY_BLUE = '#3B82F6';
const SECONDARY_BLUE = '#1D4ED8';
const BACKGROUND_LIGHT = '#F8F9FB';
const TEXT_DARK = '#1F2937';
const TEXT_GRAY = '#6B7280';
const CARD_BG = '#FFFFFF';
const BORDER_COLOR = '#E5E7EB';
const INPUT_BG = '#F3F4F6';

// Define una interfaz simple para los datos del hook
interface DiaTrabajado {
    a_fecha: string;
    a_horaEntrada: string;
    a_horaSalida: string;
}

export const DiasTrabaladosScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useDiasTrabajados();
    const [fechaInicio, setFechaInicio] = useState("2025-01-08");
    const [fechaFin, setFechaFin] = useState("2025-01-08");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    const renderHeader = () => (
        <>
            <View style={style.headerContainer}>
                <Text style={style.headerTitle}>Días Trabajados (Detalle)</Text>
                <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
            </View>
            
            <View style={style.filterContainer}>
                <Text style={style.filterTitle}>Filtro de Fechas</Text>
                <View style={style.inputGroup}>
                    <TextInput
                        style={style.input}
                        placeholder="Fecha de inicio (AAAA-MM-DD)"
                        placeholderTextColor={TEXT_GRAY}
                        value={fechaInicio}
                        onChangeText={setFechaInicio}
                        keyboardType="numbers-and-punctuation"
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Fecha de fin (AAAA-MM-DD)"
                        placeholderTextColor={TEXT_GRAY}
                        value={fechaFin}
                        onChangeText={setFechaFin}
                        keyboardType="numbers-and-punctuation"
                    />
                </View>
                <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData} disabled={isLoading}>
                    <Text style={style.btnBuscarText}>
                        {isLoading ? 'Cargando...' : 'Buscar Detalle'}
                    </Text>
                </TouchableOpacity>
            </View>

            {data && data.length > 0 && (
                <Text style={style.listTitle}>Registros encontrados: {data.length}</Text>
            )}
            
            {/* Mensaje de datos vacíos, solo si no está cargando */}
            {!isLoading && (!data || data.length === 0) && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de días trabajados en el periodo seleccionado.</Text>
                </View>
            )}
        </>
    );

    const renderItem = ({ item }: { item: DiaTrabajado }) => (
        <View style={style.card}>
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.valueDate}>{item.a_fecha}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Hora de Entrada:</Text>
                <Text style={style.valueTime}>{item.a_horaEntrada}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.label}>Hora de Salida:</Text>
                <Text style={style.valueTime}>{item.a_horaSalida}</Text>
            </View>
        </View>
    );

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={data || []}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={isLoading ? (
                    <ActivityIndicator style={{ padding: 20 }} size="large" color={PRIMARY_BLUE} />
                ) : null}
            />
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_LIGHT,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    // --- Header ---
    headerContainer: {
        backgroundColor: SECONDARY_BLUE,
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
    // --- Filtros ---
    filterContainer: {
        marginBottom: 20,
        backgroundColor: CARD_BG,
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
        color: TEXT_DARK,
        marginBottom: 10,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        backgroundColor: INPUT_BG,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        color: TEXT_DARK,
        fontSize: 13,
    },
    btnBuscar: {
        backgroundColor: PRIMARY_BLUE,
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
    // --- Lista y Cards ---
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 10,
    },
    card: {
        backgroundColor: CARD_BG,
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: PRIMARY_BLUE,
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
        color: TEXT_GRAY,
        fontWeight: "600",
        flex: 1,
    },
    valueDate: {
        fontSize: 14,
        fontWeight: "700",
        color: SECONDARY_BLUE,
        flex: 1,
        textAlign: "right",
    },
    valueTime: {
        fontSize: 14,
        fontWeight: "600",
        color: TEXT_DARK,
        flex: 1,
        textAlign: "right",
    },
    // --- Mensajes Vacíos ---
    emptyMessage: {
        padding: 30,
        backgroundColor: CARD_BG,
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
        color: TEXT_GRAY,
        textAlign: 'center',
        lineHeight: 22,
    },
});
