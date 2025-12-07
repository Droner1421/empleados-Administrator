import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ReportesDrawerParams } from '../navigator/ReportesNavigator';
import { useReporteProduccion } from '../hooks/useReportes';

type Props = DrawerScreenProps<ReportesDrawerParams, 'ReporteProduccionScreen'>;

// Definición de Colores
const PRIMARY_BLUE = '#3B82F6';
const SECONDARY_BLUE = '#1D4ED8';
const SUCCESS_GREEN = '#27AE60'; // Usado para destacar la producción
const BACKGROUND_LIGHT = '#F8F9FB';
const TEXT_DARK = '#1F2937';
const TEXT_GRAY = '#6B7280';
const CARD_BG = '#FFFFFF';
const BORDER_COLOR = '#E5E7EB';
const INPUT_BG = '#F3F4F6';

// Interfaz para el detalle del registro de producción
interface ProduccionItem {
    e_nombre: string;
    e_apellido_p: string;
    p_fecha: string;
    p_unidadesProducidas: number;
    p_turno: string;
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

export const ReporteProduccionScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useReporteProduccion();
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
                <ActivityIndicator size="large" color={PRIMARY_BLUE} />
                <Text style={style.loadingText}>Cargando reporte de producción...</Text>
            </View>
        );
    }

    // Calcular el total de unidades producidas para mostrar un resumen
    const totalUnidades = data?.reduce((sum, item) => sum + item.p_unidadesProducidas, 0) || 0;
    const itemsCount = data?.length || 0;

    const renderHeader = () => (
        <>
            {/* Encabezado Fijo con Información del Empleado */}
            <View style={style.headerContainer}>
                <Text style={style.headerTitle}>Reporte de Producción</Text>
                <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
            </View>

            {/* Contenedor de Filtros */}
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
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tarjeta de Resumen de Producción */}
            <View style={style.summaryCard}>
                <View style={style.summaryRow}>
                    <Text style={style.summaryLabel}>Total Unidades Producidas:</Text>
                    <Text style={style.summaryValue}>{totalUnidades.toLocaleString()}</Text>
                </View>
                <View style={[style.summaryRow, style.summaryRowLast]}>
                    <Text style={style.summaryLabel}>Días Registrados:</Text>
                    <Text style={style.summaryValueSmall}>{itemsCount}</Text>
                </View>
            </View>
            
            {/* Mensaje de datos vacíos */}
            {!isLoading && itemsCount === 0 && (
                <View style={style.emptyMessage}>
                    <Text style={style.emptyText}>No se encontraron registros de producción en el periodo seleccionado.</Text>
                </View>
            )}

            {!isLoading && itemsCount > 0 && (
                <Text style={style.listTitle}>Detalle por Día</Text>
            )}
        </>
    );

    const renderItem = ({ item }: { item: ProduccionItem }) => (
        <View style={style.card}>
            {/* Omitimos Empleado ya que está en el título */}
            <View style={style.row}>
                <Text style={style.label}>Fecha:</Text>
                <Text style={style.value}>{formatDate(item.p_fecha)}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Turno:</Text>
                <Text style={style.value}>{item.p_turno}</Text>
            </View>
            <View style={[style.row, style.rowLast]}>
                <Text style={style.labelTotal}>Unidades Producidas:</Text>
                <Text style={style.valueTotal}>{item.p_unidadesProducidas.toLocaleString()}</Text>
            </View>
        </View>
    );

    return (
        <View style={style.root}>
            <FlatList
                contentContainerStyle={style.listContent}
                data={(data || []) as ProduccionItem[]}
                keyExtractor={(item, index) => `${item.p_fecha}-${index}`}
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
        paddingTop: 12,
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
    // --- Tarjeta de Resumen ---
    summaryCard: {
        backgroundColor: SUCCESS_GREEN,
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: SUCCESS_GREEN,
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
        paddingVertical: 4,
    },
    summaryRowLast: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
        paddingTop: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: "600",
        flex: 1,
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: "800",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    summaryValueSmall: {
        fontSize: 16,
        fontWeight: "700",
        color: '#FFFFFF',
        flex: 1,
        textAlign: "right",
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 10,
        marginTop: 5,
    },
    // --- Tarjetas de Detalle (List Items) ---
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
        borderLeftColor: SUCCESS_GREEN,
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
        marginTop: 4,
    },
    label: {
        fontSize: 13,
        color: TEXT_GRAY,
        fontWeight: "600",
        flex: 1,
    },
    labelTotal: {
        fontSize: 14,
        color: TEXT_DARK,
        fontWeight: "700",
        flex: 1,
    },
    value: {
        fontSize: 14,
        fontWeight: "600",
        color: TEXT_DARK,
        flex: 1,
        textAlign: "right",
    },
    valueTotal: {
        fontSize: 16,
        fontWeight: "800",
        color: SUCCESS_GREEN,
        flex: 1,
        textAlign: "right",
    },
    // --- Mensaje Vacío ---
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
