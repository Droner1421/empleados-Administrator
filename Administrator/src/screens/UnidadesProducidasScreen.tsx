import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { ReportesDrawerParams } from "../navigator/ReportesNavigator";
import { useUnidadesProducidas } from "../hooks/useReportes";

type Props = DrawerScreenProps<ReportesDrawerParams, 'UnidadesProducidasScreen'>;

export const UnidadesProducidasScreen = ({ route, navigation }: Props) => {
    const { empleado } = route.params as { empleado: any };
    const { data, isLoading, loadData } = useUnidadesProducidas();
    const [fechaInicio, setFechaInicio] = useState("2025-01-08");
    const [fechaFin, setFechaFin] = useState("2025-01-08");

    const handleLoadData = () => {
        loadData(empleado.id_empleado, fechaInicio, fechaFin);
    };

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <View style={style.root}>
            {isLoading ? (
                <View style={style.containerLoading}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            ) : (
                <>
                    <ScrollView style={style.content}>
                        <View style={style.filterContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Fecha Inicio"
                                value={fechaInicio}
                                onChangeText={setFechaInicio}
                            />
                            <TextInput
                                style={style.input}
                                placeholder="Fecha Fin"
                                value={fechaFin}
                                onChangeText={setFechaFin}
                            />
                            <TouchableOpacity style={style.btnBuscar} onPress={handleLoadData}>
                                <Text style={style.btnBuscarText}>Buscar</Text>
                            </TouchableOpacity>
                        </View>

                        {data && (
                            <View style={style.dataContainer}>
                                <View style={style.card}>
                                    <View style={style.row}>
                                        <Text style={style.label}>Total de Items:</Text>
                                        <Text style={style.value}>{data.total?.length || 0}</Text>
                                    </View>
                                </View>

                                {data.total && data.total.length > 0 && (
                                    <>
                                        {data.total.map((item, index) => (
                                            <View key={index} style={style.card}>
                                                <View style={style.row}>
                                                    <Text style={style.label}>Producción:</Text>
                                                    <Text style={[style.value, { color: "#27AE60", fontSize: 18 }]}>
                                                        {item.total_producido}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </>
                                )}
                            </View>
                        )}
                    </ScrollView>
                    <View style={{ paddingVertical: 20 }} />
                </>
            )}
        </View>
    );
};

const style = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F8F9FB",
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    filterContainer: {
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    input: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        color: "#1F2937",
        fontSize: 13,
    },
    btnBuscar: {
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        paddingVertical: 11,
        alignItems: "center",
        marginTop: 4,
    },
    btnBuscarText: {
        color: "white",
        fontWeight: "700",
        fontSize: 13,
        letterSpacing: 0.3,
    },
    dataContainer: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "600",
        flex: 1,
    },
    value: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1F2937",
        flex: 1,
        textAlign: "right",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
});
