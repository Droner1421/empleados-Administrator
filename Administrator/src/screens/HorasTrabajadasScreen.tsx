import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useHorasTrabajadas } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'HorasTrabajadasScreen'>;

// Definición de Colores
const PRIMARY_BLUE = '#3B82F6';
const SECONDARY_BLUE = '#1D4ED8';
const BACKGROUND_LIGHT = '#F8F9FB';
const TEXT_DARK = '#1F2937';
const TEXT_GRAY = '#6B7280';
const CARD_BG = '#FFFFFF';
const BORDER_COLOR = '#E5E7EB';
const INPUT_BG = '#F3F4F6';

// Define una interfaz para los datos del hook
interface HorasTrabajadasItem {
    e_nombre: string;
    e_apellido_p: string;
    a_fecha: string;
    a_horasTrabajadas: string;
    a_turno: string;
}

export const HorasTrabajadasScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useHorasTrabajadas();
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
                <Text style={style.headerTitle}>Horas Trabajadas (Detalle)</Text>
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
                        {isLoading ? 'Cargando...' : 'Buscar Reporte'}
                    </Text>
                </TouchableOpacity>
            </View>

            {data && data.length > 0 && (
                <Text style={style.listTitle}>Registros encontrados: {data.length}</Text>
            )}
            
            {!isLoading && (!data || data.length === 0) && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de horas trabajadas en el periodo seleccionado.</Text>
                </View>
            )}
        </>
    );

    const renderItem = ({ item }: { item: HorasTrabajadasItem }) => (
        <View style={style.card}>
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.value}>{item.a_fecha}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Turno:</Text>
                <Text style={style.value}>{item.a_turno}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.labelTotal}>Horas Trabajadas:</Text>
                <Text style={style.valueTotal}>{item.a_horasTrabajadas}</Text>
            </View>
        </View>
    );

    if (isLoading && !data) {
        return (
            <View style={style.containerLoading}>
                <ActivityIndicator size="large" color={PRIMARY_BLUE} />
                <Text style={style.loadingText}>Cargando reporte...</Text>
            </View>
        );
    }

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={(Array.isArray(data) ? data : []) as HorasTrabajadasItem[]}
                keyExtractor={(item, index) => `${item.a_fecha}-${index}`}
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
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: TEXT_GRAY,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        paddingTop: 12,
    },
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
        marginTop: 8,
    },
    label: {
        fontSize: 13,
        color: TEXT_GRAY,
        fontWeight: "600",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: TEXT_DARK,
        flex: 1,
        textAlign: "right",
    },
    labelTotal: {
        fontSize: 15,
        color: SECONDARY_BLUE,
        fontWeight: "700",
        flex: 1,
    },
    valueTotal: {
        fontSize: 18,
        fontWeight: "800",
        color: PRIMARY_BLUE,
        flex: 1,
        textAlign: "right",
    },
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
