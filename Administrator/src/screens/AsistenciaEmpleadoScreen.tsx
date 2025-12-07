import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useAsistenciaEmpleado } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'AsistenciaEmpleadoScreen'>;

export const AsistenciaEmpleadoScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useAsistenciaEmpleado();
    
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
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={style.loadingText}>Cargando reporte...</Text>
            </View>
        );
    }

    return (
        <View style={style.root}>
            <View style={style.headerContainer}>
                <Text style={style.headerTitle}>Asistencia de Empleado</Text>
                <Text style={style.headerSubtitle}>{empleado.nombre} {empleado.apellido_p || empleado.apellido}</Text>
            </View>

            <ScrollView contentContainerStyle={style.content} showsVerticalScrollIndicator={false}>
                
                <View style={style.filterContainer}>
                    <Text style={style.filterTitle}>Filtro de Fechas</Text>
                    <View style={style.inputGroup}>
                        <TextInput
                            style={style.input}
                            placeholder="Fecha de inicio (AAAA-MM-DD)"
                            placeholderTextColor="#6B7280"
                            value={fechaInicio}
                            onChangeText={setFechaInicio}
                            keyboardType="numbers-and-punctuation"
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Fecha de fin (AAAA-MM-DD)"
                            placeholderTextColor="#6B7280"
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

                {data ? (
                    <View style={style.dataContainer}>
                        <Text style={style.reportTitle}>Resultados del Periodo</Text>
                        
                        <View style={style.card}>
                            <View style={style.row}>
                                <Text style={style.label}>Periodo:</Text>
                                <Text style={style.value}>{fechaInicio} - {fechaFin}</Text>
                            </View>
                            <View style={[style.row, style.rowTotal]}>
                                <Text style={style.labelTotal}>TOTAL ASISTENCIAS</Text>
                                <Text style={style.valueTotal}>{data.total_asistencias}</Text>
                            </View>
                        </View>
                        
                        {data.detalles && data.detalles.length > 0 && (
                            <View style={style.detailsWrapper}>
                                <Text style={style.detailsTitle}>Detalles por día:</Text>
                                <View style={style.detailRow}>
                                    <Text style={style.detailLabel}>Fecha:</Text>
                                    <Text style={style.detailValue}>Hora Entrada / Salida</Text>
                                </View>
                            </View>
                        )}

                        {data.total_asistencias === 0 && (
                             <View style={style.emptyMessage}>
                                 <Text style={style.emptyText}>No se encontraron asistencias en el periodo seleccionado.</Text>
                             </View>
                        )}

                    </View>
                ) : (
                    <View style={style.emptyMessage}>
                         <Text style={style.emptyText}>Utilice el filtro superior para generar el reporte de asistencia.</Text>
                    </View>
                )}
            </ScrollView>
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
    headerContainer: {
        backgroundColor: '#1D4ED8',
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 16,
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
    content: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 40,
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
    },
    input: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
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
    reportTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 10,
    },
    dataContainer: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#3B82F6',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    rowTotal: {
        paddingVertical: 12,
        borderBottomWidth: 0,
        marginTop: 5,
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
    labelTotal: {
        fontSize: 15,
        color: '#1D4ED8',
        fontWeight: "800",
        flex: 1,
    },
    valueTotal: {
        fontSize: 20,
        fontWeight: "800",
        color: '#3B82F6',
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
    detailsWrapper: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    detailsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingBottom: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 13,
        color: '#1F2937',
    }
});
